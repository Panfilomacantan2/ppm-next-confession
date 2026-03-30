import Confession from "@/lib/models/confessions.model";
import Like from "@/lib/models/like.model";
import { connectToDB } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { confessionId, userId } = await request.json();

    console.log({
      confessionId,
      userId,
    });

    if (!confessionId || !userId) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    await connectToDB();

    const confession = await Confession.findById(confessionId);

    if (!confession) {
      return NextResponse.json(
        { error: "Confession not found" },
        { status: 404 },
      );
    }

    const existingLike = await Like.exists({
      userId,
      confessionId,
    });

    if (existingLike) {
      // UNLIKE
      await Like.deleteOne({ userId, confessionId });

      await Confession.findByIdAndUpdate(confessionId, {
        $inc: { likeCount: -1 }, // Bawasan ng 1
      });
    } else {
      // LIKE
      await Like.create({ userId, confessionId });

      await Confession.findByIdAndUpdate(confessionId, {
        $inc: { likeCount: 1 }, // Dagdag ng 1
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to like/unlike confession." },
      { status: 500 },
    );
  }
}
