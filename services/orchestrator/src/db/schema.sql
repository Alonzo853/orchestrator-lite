CREATE TABLE IF NOT EXISTS workflows (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  version INTEGER NOT NULL,
  definition JSONB NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE (name, version)
);

CREATE TABLE IF NOT EXISTS workflow_runs (
  id UUID PRIMARY KEY,
  workflow_id UUID NOT NULL REFERENCES workflows(id),
  status TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  finished_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS task_runs (
  id UUID PRIMARY KEY,
  workflow_run_id UUID NOT NULL REFERENCES workflow_runs(id),
  task_id TEXT NOT NULL,
  status TEXT NOT NULL,
  attempt INTEGER NOT NULL DEFAULT 1,
  next_retry_at TIMESTAMP,
  last_heartbeat_at TIMESTAMP,
  worker_id TEXT,
  output JSONB,
  error TEXT,
  started_at TIMESTAMP,
  finished_at TIMESTAMP
);
