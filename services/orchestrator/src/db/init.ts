import fs from "fs";
import path from "path";
import { pool } from "./pool";

export async function initDb() {
  console.log("Initializing database schema");

  const schemaPath = path.join(__dirname, "schema.sql");

  if (!fs.existsSync(schemaPath)) {
    throw new Error(`Schema file not found at ${schemaPath}`);
  }

  const sql = fs.readFileSync(schemaPath, "utf8");
// pool is already created and shared

  await pool.query(sql);

  console.log("Database schema initialized");
}
