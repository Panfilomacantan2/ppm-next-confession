import { connectToDB } from "@/lib/mongoose";
import Confession from "@/lib/models/confessions.model";
import { unstable_noStore as noStore } from "next/cache";
import { NextResponse } from "next/server";
import User from "@/lib/models/user.model";
import { currentUser } from "@clerk/nextjs/server";
import Like from "@/lib/models/like.model";

export async function GET() {
  // noStore();

  const clerkUser = await currentUser();
  const userId = clerkUser?.id;

  try {
    await connectToDB();
    let confessions = await Confession.find().sort({ createdAt: -1 }).lean(); // lean() para mas mabilis

    // Idagdag ang isLiked field
    if (userId) {
      const likedConfessions = await Like.find({ userId }).select(
        "confessionId",
      );

      const likedIds = new Set(
        likedConfessions.map((l) => l.confessionId.toString()),
      );

      confessions = confessions.map((conf) => ({
        ...conf,
        isLiked: likedIds.has(conf._id.toString()), // ← dito inilalagay
        likeCount: conf.likeCount || 0,
      }));
    } else {
      confessions = confessions.map((conf) => ({
        ...conf,
        isLiked: false,
        likeCount: conf.likeCount || 0,
      }));
    }

    return NextResponse.json(confessions);
  } catch (error) {
    console.log("Error fetching confession in GET /api/confession:", error);
    return NextResponse.json(
      { error: "Failed to fetch confessions" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  // noStore();
  try {
    await connectToDB();

    //  get all the data from the body
    const { content, user_id, author, feeling, avatar } = await req.json();

    const user = await User.findOne({ clerkId: user_id });

    const createConfession = await Confession.create({
      content,
      author,
      feeling,
      avatar,
      user_id: user._id,
    });

    return NextResponse.json(createConfession);
  } catch (error) {
    console.log("Error fetching confession in GET /api/confession:", error);
    return NextResponse.json(
      { error: "Failed to fetch confessions" },
      { status: 500 },
    );
  }
}
