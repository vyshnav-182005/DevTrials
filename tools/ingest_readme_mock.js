#!/usr/bin/env node
/* Mock ingestion script: chunks README.md and generates synthetic embeddings locally.
   Uses crypto to hash text into deterministic 1536-dim vectors.
   No network calls required — works offline for testing.
   Usage: node tools/ingest_readme_mock.js
*/

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

require('dotenv').config();

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

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

// Generate a deterministic 1536-dim embedding from text using SHA-256 hashing
function generateMockEmbedding(text) {
  const hash = crypto.createHash('sha256').update(text).digest();
  const embedding = [];
  
  // Use hash bytes to seed pseudo-random numbers for 1536 dimensions
  for (let i = 0; i < 1536; i++) {
    const byteIndex = i % hash.length;
    const byte = hash[byteIndex];
    // Map byte [0, 255] to embedding value [-1, 1]
    embedding.push((byte / 255.0) * 2 - 1);
  }
  return embedding;
}

async function upsertChunks(chunks) {
  for (let i = 0; i < chunks.length; i++) {
    const content = chunks[i];
    console.log(`Generating embedding for chunk ${i + 1}/${chunks.length} (chars=${content.length})`);
    
    const embedding = generateMockEmbedding(content);
    
    // insert into supabase
    const { error } = await supabase.from('chat_docs').upsert({
      content,
      embedding,
      metadata: { source: 'README.md', index: i, mock: true },
    }, { onConflict: ['content'] });
    
    if (error) {
      console.error(`Chunk ${i + 1} upsert error:`, error.message || error);
    } else {
      console.log(`✓ Upserted chunk ${i + 1}`);
    }
  }
}

async function main() {
  console.log('\n=== MOCK CHATBOT INGESTION (Offline) ===');
  console.log('Config check:');
  console.log(`  Embedding: LOCAL MOCK (deterministic hash-based)`);
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
  console.log('\n✓ Mock ingestion complete\n');
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
