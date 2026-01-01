export const env = {
  postgres: {
    host: process.env.DB_HOST ?? "localhost",
    port: Number(process.env.DB_PORT ?? 5432),
    user: process.env.DB_USER ?? "orchestrator",
    password: process.env.DB_PASSWORD ?? "orchestrator",
    database: process.env.DB_NAME ?? "orchestrator",
  },
};
