import Confession from '@/lib/models/confessions.model';
import { connectToDB } from '@/lib/mongoose';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { author, content, avatar } = body;

    await connectToDB();
    const confession = await Confession.findById(body._id);

    if (!confession) {
      return NextResponse.json({ error: 'No confession found' }, { status: 404 });
    }

    // Add new comment
    const newComment = {
      author,
      content,
      avatar,
    };

    confession.comments.push(newComment);
    await confession.save();

    // Trigger revalidation for the confession page
    revalidatePath(`/confession/${confession._id}`);

    // Respond with the updated confession data
    return NextResponse.json({
      ...confession.toObject(),
      latestComment: newComment, // To update client-side state immediately
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
