# Orchestrator Lite

A cloud-native distributed workflow and job orchestration platform inspired by Temporal, Airflow, and AWS Step Functions.

Orchestrator Lite executes DAG-based workflows with durable state, distributed workers, retries, heartbeats, and failure recovery — designed to mirror real internal systems used at large-scale technology companies.

## Key Features
- DAG-based workflows with versioning
- Distributed task execution with leasing & heartbeats
- Retry policies with exponential backoff
- Failure recovery and dead-letter handling
- Durable state backed by PostgreSQL
- Redis-backed task queues
- Production-oriented architecture and clean abstractions

## Tech Stack
- Node.js (TypeScript)
- PostgreSQL
- Redis
- Docker & Docker Compose
- OpenTelemetry (tracing & metrics)
