import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = (process.env.OPENROUTER_API_URL || 'https://api.openrouter.ai').replace(/\/v1\s*$/, '');
const OPENROUTER_CHAT_MODEL = process.env.OPENROUTER_CHAT_MODEL || 'openai/gpt-oss-20b';
const EMBEDDING_MODEL = process.env.EMBEDDING_MODEL || 'text-embedding-3-small';
const GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-flash';

type ChatDoc = {
  id?: string;
  content: string;
  metadata?: Record<string, unknown> | null;
  score?: number;
};

type Faq = {
  question: string;
  answer: string;
  category: string;
  language: string;
};

type InsurancePlan = {
  name: string;
  weekly_premium: number | string;
  weekly_max_payout: number | string;
  coverage_percentage: number | string;
  claim_wait_minutes: number | string;
  includes_platform_outage?: boolean;
  description?: string | null;
};

type QueryResult<T = unknown> = {
  data?: T | null;
  error?: { message: string } | null;
  status?: number;
};

type SupabaseTableQuery = {
  select(columns?: string): SupabaseTableQuery;
  order(column: string, options?: Record<string, unknown>): Promise<QueryResult>;
  eq(column: string, value: unknown): SupabaseTableQuery;
  in(column: string, values: unknown[]): Promise<QueryResult>;
  insert(values: Record<string, unknown>[]): Promise<QueryResult>;
};

type SupabaseClientLike = {
  from(table: string): SupabaseTableQuery;
  rpc(name: string, args: Record<string, unknown>): Promise<QueryResult>;
};

function asText(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function buildStaticPolicyAnswer(message: string, plans: InsurancePlan[], faqs: Faq[]) {
  const lower = message.toLowerCase();
  const matchingFaq = faqs.find((faq) => {
    const haystack = `${faq.question} ${faq.category}`.toLowerCase();
    return haystack.split(/\W+/).filter(Boolean).some((word) => word.length > 4 && lower.includes(word));
  });

  if (matchingFaq) {
    return `${matchingFaq.answer}\n\nThis is general SwiftShield policy guidance. Please check your dashboard for your exact active plan and claim status.`;
  }

  const planLines = plans
    .map((plan) => {
      const outage = plan.includes_platform_outage ? ', platform outage included' : '';
      return `${titleCase(plan.name)}: Rs ${plan.weekly_premium}/week, up to Rs ${plan.weekly_max_payout}/week, ${plan.coverage_percentage}% coverage, ${plan.claim_wait_minutes} min wait${outage}`;
    })
    .join('\n');

  if (lower.includes('claim') || lower.includes('reject') || lower.includes('approved')) {
    return [
      'SwiftShield claims are checked against your active plan, disruption type, GPS zone, platform activity, duplicate claims, and weekly payout cap.',
      'A claim may be rejected if you were not active during the disruption, your GPS zone does not match, fraud checks fail, or a similar claim was already filed within the cooling period.',
      plans.length ? `\nCurrent plan summary:\n${planLines}` : '',
    ].filter(Boolean).join('\n\n');
  }

  if (lower.includes('payout') || lower.includes('cap') || lower.includes('premium') || lower.includes('price')) {
    return plans.length
      ? `Here are the current SwiftShield plans:\n${planLines}\n\nYour final payout depends on the verified disruption duration, your plan, your weekly cap, and claim checks.`
      : 'SwiftShield payouts depend on your selected plan, verified disruption duration, and weekly cap. Please check the Plans page or dashboard for exact pricing.';
  }

  if (lower.includes('cover') || lower.includes('trigger') || lower.includes('rain') || lower.includes('heat') || lower.includes('flood')) {
    return 'SwiftShield covers income loss from external disruptions such as heavy rainfall, extreme heat, flash floods or waterlogging, severe cold or dense fog, curfews or civil unrest, and platform outages when included in the selected plan. It does not cover health issues, accidents, vehicle damage, or personal negligence.';
  }

  return [
    'I can help with SwiftShield insurance plans, covered triggers, premiums, weekly payout caps, claim rules, and why a claim may be approved or rejected.',
    plans.length ? `\nCurrent plan summary:\n${planLines}` : '',
    '\nPlease ask your question with the plan name or claim detail, and I will narrow it down.',
  ].filter(Boolean).join('\n');
}

function titleCase(value: string) {
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : value;
}

async function fetchJson(url: string, init: RequestInit, timeoutMs = 15000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

async function getRelevantDocs(message: string, supabase: SupabaseClientLike): Promise<ChatDoc[]> {
  if (!OPENROUTER_API_KEY) {
    return [];
  }

  try {
    console.log('[CHAT] Computing embedding for optional RAG lookup');
    const embRes = await fetchJson(`${OPENROUTER_API_URL}/v1/embeddings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({ model: EMBEDDING_MODEL, input: message }),
    }, 10000);

    if (!embRes.ok) {
      console.warn('[CHAT] Embedding lookup skipped:', embRes.status, await embRes.text());
      return [];
    }

    const embJson = await embRes.json();
    const queryEmbedding = embJson.data?.[0]?.embedding;
    if (!Array.isArray(queryEmbedding) || queryEmbedding.length === 0) {
      console.warn('[CHAT] Embedding lookup skipped: invalid embedding response');
      return [];
    }

    const topK = Number(process.env.RAG_TOP_K || 4);
    const docsRes = await supabase.rpc('match_documents', {
      query_embedding: queryEmbedding,
      match_count: topK,
    });

    if (docsRes.error) {
      console.warn('[CHAT] Document lookup skipped:', docsRes.error.message);
      return [];
    }

    return (docsRes.data || []) as ChatDoc[];
  } catch (error) {
    console.warn('[CHAT] Document lookup skipped:', error instanceof Error ? error.message : error);
    return [];
  }
}

async function loadSupportData(supabase: SupabaseClientLike, language: string) {
  const [plansRes, faqsRes] = await Promise.all([
    supabase.from('insurance_plans').select('*').order('weekly_premium', { ascending: true }),
    supabase
      .from('chat_faqs')
      .select('question, answer, category, language')
      .eq('is_active', true)
      .in('language', [language, 'en']),
  ]);

  if (plansRes.error) {
    console.warn('[CHAT] Could not load insurance plans:', plansRes.error.message);
  }
  if (faqsRes.error) {
    console.warn('[CHAT] Could not load chat FAQs:', faqsRes.error.message);
  }

  return {
    plans: (plansRes.data || []) as InsurancePlan[],
    faqs: (faqsRes.data || []) as Faq[],
  };
}

function buildPrompt(message: string, plans: InsurancePlan[], faqs: Faq[], docs: ChatDoc[]) {
  const planContext = plans.length
    ? plans.map((plan) => JSON.stringify(plan)).join('\n')
    : 'No plan rows were available from the database.';
  const faqContext = faqs.length
    ? faqs.map((faq) => `Q: ${faq.question}\nA: ${faq.answer}`).join('\n\n')
    : 'No FAQ rows were available from the database.';
  const docContext = docs.length
    ? docs.map((doc, index) => `[Source ${index + 1}] ${doc.content.slice(0, 700).replace(/\s+/g, ' ')}`).join('\n\n')
    : 'No vector policy documents were available.';

  return [
    'You are SwiftShield Support, an insurance plan assistant for delivery workers.',
    'Answer only questions about SwiftShield plans, coverage, claims, payouts, premiums, policy rules, and account guidance.',
    'Use the provided SwiftShield data. Be concise, practical, and clear. Do not invent legal guarantees.',
    'If exact user-specific claim status is needed, tell the user to check the dashboard or contact support.',
    '',
    `Insurance plans:\n${planContext}`,
    '',
    `FAQs:\n${faqContext}`,
    '',
    `Retrieved policy context:\n${docContext}`,
    '',
    `User question: ${message}`,
  ].join('\n');
}

async function generateWithGemini(prompt: string) {
  if (!GEMINI_API_KEY) {
    return null;
  }

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
  const result = await model.generateContent(prompt);
  return result.response.text().trim();
}

async function generateWithOpenRouter(prompt: string) {
  if (!OPENROUTER_API_KEY) {
    return null;
  }

  const chatResp = await fetchJson(`${OPENROUTER_API_URL}/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: OPENROUTER_CHAT_MODEL,
      messages: [
        {
          role: 'system',
          content: process.env.CHATBOT_SYSTEM_PROMPT || 'You are SwiftShield support assistant. Answer policy questions concisely.',
        },
        { role: 'user', content: prompt },
      ],
      max_tokens: 512,
      temperature: 0.1,
    }),
  }, 15000);

  if (!chatResp.ok) {
    throw new Error(`OpenRouter chat failed: ${chatResp.status} ${await chatResp.text()}`);
  }

  const chatJson = await chatResp.json();
  return asText(chatJson.choices?.[0]?.message?.content);
}

async function insertMessage(supabase: SupabaseClientLike, payload: Record<string, unknown>) {
  const { error } = await supabase.from('chat_messages').insert([payload]);
  if (error) {
    console.warn('[CHAT] Could not persist message:', error.message);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = asText(body?.message);
    const workerId = asText(body?.worker_id);
    const sessionId = asText(body?.session_id) || `session_${Date.now()}`;
    const language = asText(body?.language) || 'en';

    if (!message || !workerId) {
      return NextResponse.json({ error: 'Missing message or worker_id' }, { status: 400 });
    }

    const supabase = createAdminClient() as unknown as SupabaseClientLike;
    const [{ plans, faqs }, docs] = await Promise.all([
      loadSupportData(supabase, language),
      getRelevantDocs(message, supabase),
    ]);

    await insertMessage(supabase, {
      session_id: sessionId,
      worker_id: workerId,
      role: 'user',
      text: message,
    });

    const prompt = buildPrompt(message, plans, faqs, docs);
    let modelReply = '';
    let provider = 'local';

    try {
      modelReply = (await generateWithGemini(prompt)) || '';
      if (modelReply) {
        provider = 'gemini';
      }
    } catch (error) {
      console.warn('[CHAT] Gemini unavailable:', error instanceof Error ? error.message : error);
    }

    if (!modelReply) {
      try {
        modelReply = (await generateWithOpenRouter(prompt)) || '';
        if (modelReply) {
          provider = 'openrouter';
        }
      } catch (error) {
        console.warn('[CHAT] OpenRouter unavailable:', error instanceof Error ? error.message : error);
      }
    }

    if (!modelReply) {
      modelReply = buildStaticPolicyAnswer(message, plans, faqs);
    }

    await insertMessage(supabase, {
      session_id: sessionId,
      worker_id: workerId,
      role: 'assistant',
      text: modelReply,
      metadata: { provider, retrieved_docs: docs.length },
    });

    console.log(`[CHAT] Response generated with ${provider}`);
    return NextResponse.json({ response: modelReply, sources: docs, provider });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal error';
    console.error('Chat API error:', message);
    return NextResponse.json(
      {
        response: 'Sorry, I could not process that chat request right now. Please try again in a moment.',
        error: message,
      },
      { status: 200 }
    );
  }
}
