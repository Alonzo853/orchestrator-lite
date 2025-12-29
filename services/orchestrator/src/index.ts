import express from "express";
import pino from "pino";

const logger = pino();
const app = express();

app.use(express.json());

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Orchestrator listening on port ${PORT}`);
});
