import Confession from "@/lib/models/confessions.model";
import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Connect to the database
    await connectToDB();

    // find the user by id and return the confessions
    const hasUser = await User.findOne({ clerkId: user.id });

    if (!hasUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log(hasUser);

    // Find confessions by user ID
    const confessions = await Confession.find({ user_id: hasUser._id });

    if (!confessions) {
      return NextResponse.json(
        { error: "No confessions found for this user" },
        { status: 404 },
      );
    }

    return NextResponse.json(confessions);
  } catch (error) {
    console.error("Failed to fetch confessions:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
