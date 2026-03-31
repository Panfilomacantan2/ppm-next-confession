import { connectToDB } from "@/lib/mongoose";
import Confession from "@/lib/models/confessions.model";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { confessionId: string; id: string } },
) {
  try {
      // get the id from params
    const confessionId = params.confessionId;
    const commentId = params.id;

    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDB();

    // Find the confession by id
    const confession = await Confession.findById({ _id: confessionId });

    if (!confession) {
      throw new Error("Confession not found");
    }
    // Find the comment by id and remove it
    confession.comments = confession.comments.filter(
      (comment: { _id: { toString: () => string } }) => comment._id.toString() !== commentId,
    );

    // Save the updated confession
    await confession.save();

    return NextResponse.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.log("Error fetching confession in GET /api/confession:", error);
    return NextResponse.json(
      { error: "Failed to fetch confessions" },
      { status: 500 },
    );
  }
}
