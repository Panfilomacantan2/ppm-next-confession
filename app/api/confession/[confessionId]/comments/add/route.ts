import Confession from '@/lib/models/confessions.model';
import { connectToDB } from '@/lib/mongoose';
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

		return NextResponse.json(confession);
	} catch (e: any) {
		return NextResponse.json({ error: e.message }, { status: 500 });
	}
}
