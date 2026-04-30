-- Migration: create chat_docs and chat_messages tables, and match_documents function
-- Run this in your Supabase SQL migration runner

CREATE EXTENSION IF NOT EXISTS vector;

-- Documents table to store chunks and embeddings (adjust vector dim if needed)
CREATE TABLE IF NOT EXISTS chat_docs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  embedding vector(1536) NOT NULL,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

-- Index for similarity search (ivfflat)
CREATE INDEX IF NOT EXISTS chat_docs_embedding_idx ON chat_docs USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- Chat messages table for transcripts
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text,
  worker_id text,
  role text,
  text text,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

-- Helper function to find nearest documents via pgvector
CREATE OR REPLACE FUNCTION match_documents(query_embedding vector, match_count integer)
RETURNS TABLE(id uuid, content text, metadata jsonb, score float) AS $$
  SELECT id, content, metadata, (embedding <=> query_embedding) AS score
  FROM chat_docs
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$ LANGUAGE sql STABLE;
