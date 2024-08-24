import { NextRequest, NextResponse } from 'next/server';
import Confession from '@/lib/models/confessions.model';
import { connectToDB } from '@/lib/mongoose';
import { revalidatePath } from 'next/cache';

export async function PATCH(request: Request, { params }: { params: { updateId: string } }) {
	try {
		const updatedId = params.updateId;
		const body = await request.json();

		console.log(updatedId);

		if (!updatedId) {
			return NextResponse.json({ error: 'Confession ID is required' }, { status: 400 });
		}

		await connectToDB();
		const confession = await Confession.findById(updatedId);

		if (!confession) {
			return NextResponse.json({ error: 'Confession not found' }, { status: 404 });
		}

		// Update confession
		confession.content = body.content;
		confession.author = body.author;
		confession.avatar = body.avatar;
		await confession.save();

		// Respond with the updated confession data immediately
		return NextResponse.json(confession);
	} catch (error) {
		console.error('Failed to fetch confession:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
