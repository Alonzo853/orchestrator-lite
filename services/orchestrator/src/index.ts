import "dotenv/config";
import express from "express";
import pino from "pino";
import { initDb } from "./db/init";

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("UNHANDLED REJECTION", reason);
  process.exit(1);
});
console.log("DATABASE_URL =", process.env.DATABASE_URL);





const logger = pino();
const app = express();

app.use(express.json());

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3000;

async function start() {
  await initDb();
  app.listen(PORT, () => {
    logger.info(`Orchestrator listening on port ${PORT}`);
  });
}

start().catch((err) => {
  logger.error(err, "Failed to start orchestrator");
  process.exit(1);
});
