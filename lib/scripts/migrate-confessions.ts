// scripts/fix-clerkId.ts
import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env.local") });

import mongoose from "mongoose";
import Confession from "../models/confessions.model";

async function fixConfessions() {
  try {
    await mongoose.connect(process.env.MONGODB_URL!);
    console.log("✅ Connected to MongoDB");
    console.log("Starting migration: Add likeCount to ALL...");

    await Confession.updateMany({}, [
      {
        $set: {
          likeCount: {
            $ifNull: ["$likeCount", 0],
          },
        },
      },
    ]);

    const totalConfessions = await Confession.countDocuments();

    console.log("\n📊 Migration Summary:");
    console.log(`   Total confessions: ${totalConfessions}`);
  } catch (error) {
    console.error("❌ Migration failed:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

fixConfessions();
