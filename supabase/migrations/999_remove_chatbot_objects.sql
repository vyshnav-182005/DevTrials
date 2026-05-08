-- Migration to remove chatbot-related DB objects
BEGIN;

-- Drop RPC function if exists
DROP FUNCTION IF EXISTS match_documents(float8[], int);

-- Drop documents table if exists
DROP TABLE IF EXISTS documents;

-- Drop vector extension if exists
DROP EXTENSION IF EXISTS vector;

COMMIT;
