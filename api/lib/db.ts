import { MongoClient, Db } from "mongodb";
import fs from "fs";
import path from "path";

// Manually parse .env.local in local dev if environment variables are not injected by the CLI host
try {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    envContent.split("\n").forEach((line) => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let val = match[2] || "";
        if (val.startsWith('"') && val.endsWith('"')) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    });
  }
} catch (err) {
  console.error("Failed to load .env.local manually in DB helper:", err);
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

function getMongoUri(): string {
  const uri =
    process.env.uk_portfolio_MONGODB_URI ||
    process.env.MONGODB_URI ||
    process.env.MONGO_URI;

  if (!uri) {
    throw new Error("Missing MongoDB connection string. Define uk_portfolio_MONGODB_URI or MONGODB_URI in Vercel environment variables.");
  }

  return uri;
}

function getMongoDbName(): string {
  return process.env.uk_portfolio_MONGODB_DB || process.env.MONGODB_DB || "portfolio";
}

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(getMongoUri(), {
    serverSelectionTimeoutMS: 5000,
  });
  await client.connect();
  const db = client.db(getMongoDbName());

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
