#!/usr/bin/env node
/* Ingest README.md into Supabase vector table `chat_docs` using OpenRouter embeddings.
   Usage: set env vars OPENROUTER_API_KEY, OPENROUTER_API_URL (optional), SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
   Run: node tools/ingest_readme.js
*/

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

require('dotenv').config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
// Remove trailing /v1 to avoid double /v1/embeddings
const OPENROUTER_API_URL = (process.env.OPENROUTER_API_URL || 'https://api.openrouter.ai/v1').replace(/\/v1\s*$/, '');
const EMBEDDING_MODEL = process.env.EMBEDDING_MODEL || 'text-embedding-3-small';
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!OPENROUTER_API_KEY) {
  console.error('Missing OPENROUTER_API_KEY in env');
  process.exit(1);
}
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

function chunkText(text, chunkSize = 1200, overlap = 200) {
  const chunks = [];
  let i = 0;
  while (i < text.length) {
    const chunk = text.slice(i, i + chunkSize).trim();
    if (chunk.length) chunks.push(chunk);
    i += chunkSize - overlap;
  }
  return chunks;
}

async function embed(text) {
  try {
    const url = `${OPENROUTER_API_URL}/v1/embeddings`;
    const res = await fetch(url, {
      method: 'POST',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({ model: EMBEDDING_MODEL, input: text }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error(`API returned status ${res.status}`);
      throw new Error(`Embedding failed: ${res.status} ${body.slice(0, 200)}`);
    }
    const data = await res.json();
    if (!data.data || !data.data[0]) {
      console.error('Unexpected response shape:', JSON.stringify(data).slice(0, 300));
      throw new Error('No embedding in response');
    }
    return data.data[0].embedding;
  } catch (err) {
    console.error(`embed() error for text length ${text.length}:`, err.message);
    throw err;
  }
}

async function upsertChunks(chunks) {
  for (let i = 0; i < chunks.length; i++) {
    const content = chunks[i];
    console.log(`Embedding chunk ${i + 1}/${chunks.length} (chars=${content.length})`);
    const embedding = await embed(content);
    // insert into supabase
    const { error } = await supabase.from('chat_docs').upsert({
      content,
      embedding,
      metadata: { source: 'README.md', index: i },
    }, { onConflict: ['content'] });
    if (error) {
      console.error('Supabase upsert error:', error.message || error);
    } else {
      console.log('Upserted chunk', i + 1);
    }
  }
}

async function main() {
  console.log('\n=== CHATBOT INGESTION ===');
  console.log('Config check:');
  console.log(`  OPENROUTER_API_URL: ${OPENROUTER_API_URL}/v1`);
  console.log(`  EMBEDDING_MODEL: ${EMBEDDING_MODEL}`);
  console.log(`  OPENROUTER_API_KEY: ${OPENROUTER_API_KEY ? '✓ set' : '✗ MISSING'}`);
  console.log(`  SUPABASE_URL: ${SUPABASE_URL ? '✓ set' : '✗ MISSING'}`);
  console.log(`  SUPABASE_SERVICE_ROLE_KEY: ${SUPABASE_SERVICE_ROLE_KEY ? '✓ set' : '✗ MISSING'}\n`);

  const readmePath = path.resolve(process.cwd(), 'README.md');
  if (!fs.existsSync(readmePath)) {
    console.error('README.md not found at', readmePath);
    process.exit(1);
  }
  const text = fs.readFileSync(readmePath, 'utf-8');
  const chunks = chunkText(text, 1200, 200);
  console.log(`Chunks to ingest: ${chunks.length}\n`);
  await upsertChunks(chunks);
  console.log('\n✓ Ingestion complete\n');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
