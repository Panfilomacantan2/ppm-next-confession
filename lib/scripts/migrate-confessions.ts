import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env.local") });

import mongoose from "mongoose";
import Confession from "../models/confessions.model";

async function migrateConfessions() {
  try {
    await mongoose.connect(process.env.MONGODB_URL!);

    console.log("Starting migration...");

    const result = await Confession.updateMany(
      {},
      { $unset: { likeCount: "", likedBy: "" } },
    );

    console.log(
      `Migration completed! Updated ${result.modifiedCount} confessions.`,
    );
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await mongoose.disconnect();
  }
}

migrateConfessions();
