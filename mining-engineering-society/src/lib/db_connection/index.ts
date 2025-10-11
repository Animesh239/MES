import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

export function createDBConnection() {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle({ client: sql });
  return db;
}

// Export a singleton instance for convenience
export const DB_Connection = createDBConnection();
