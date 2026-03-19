import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function sqliteFilePathFromDatabaseUrl(url: string | undefined) {
  if (!url) return "dev.db";
  if (url.startsWith("file:")) {
    const path = url.slice("file:".length);
    return path.startsWith("./") ? path.slice(2) : path;
  }
  return url;
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    adapter: new PrismaBetterSqlite3({
      url: sqliteFilePathFromDatabaseUrl(process.env.DATABASE_URL),
    }),
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

