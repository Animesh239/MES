import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

export function createDBConnection() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL environment variable is not set. Please check your .env file."
    );
  }

  const sql = neon(connectionString);
  const db = drizzle({ client: sql });
  return db;
}

// Export a singleton instance for convenience
export const DB_Connection = createDBConnection();
