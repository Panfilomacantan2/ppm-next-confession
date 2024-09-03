import Confession from "@/lib/models/confessions.model";
import { connectToDB } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { confessionId, userId } = await request.json();

    if (!confessionId || !userId) {
      throw new Error("Invalid request: confessionId and userId are required.");
    }

    await connectToDB();

    // Find the confession by ID
    const confession = await Confession.findById(confessionId);

    if (!confession) {
      throw new Error(`Confession with ID ${confessionId} not found!`);
    }

    // Check if the userId is already in the likes array
    if (confession.likes.includes(userId)) {
      // If the user has already liked the confession, unlike it
      confession.likes = confession.likes.filter((id: string) => id !== userId);
      console.log("Confession unliked successfully:", confession);
    } else {
      // If the user has not liked the confession yet, like it
      confession.likes.push(userId);
      console.log("Confession liked successfully:", confession);
    }

    // Save the updated confession
    await confession.save();

    return NextResponse.json(confession);
  } catch (error) {
    console.error("Error liking/unliking confession:", error);

    // Return a proper error response
    return NextResponse.json(
      { error: "Failed to like/unlike confession." },
      { status: 500 }
    );
  }
}
