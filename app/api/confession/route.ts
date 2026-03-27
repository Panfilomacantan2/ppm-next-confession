import { connectToDB } from "@/lib/mongoose";
import Confession from "@/lib/models/confessions.model";
import { unstable_noStore as noStore } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  // noStore();
  try {
    await connectToDB();
    const confession = await Confession.find();

    return NextResponse.json(confession);
  } catch (error) {
    console.log("Error fetching confession in GET /api/confession:", error);
    return NextResponse.json(
      { error: "Failed to fetch confessions" },
      { status: 500 }
    );
  }
}
