import pg from "pg";
import pino from "pino";

const { Pool } = pg;

const logger = pino({ name: "db-pool" });

// ---- ENV VALIDATION (FAIL FAST) ----
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

// ---- POOL CREATION ----
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
});

// ---- EVENT LOGGING ----
pool.on("connect", () => {
  logger.info("PostgreSQL pool connected");
});

pool.on("error", (err: Error) => {
  logger.error({ err }, "Unexpected PostgreSQL pool error");
  process.exit(1); // hard crash is correct here
});
