CREATE TABLE IF NOT EXISTS workflows (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  version INTEGER NOT NULL,
  definition JSONB NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE (name, version)
);
