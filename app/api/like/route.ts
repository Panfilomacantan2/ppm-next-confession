import Confession from '@/lib/models/confessions.model';
import { connectToDB } from '@/lib/mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const { id } = await request.json();

		await connectToDB();

		// Find the confession by ID
		const confession = await Confession.findById(id);

		if (!id) {
			throw new Error('Confession not found!');
		}

		// Increment the like count
		confession.likes += 1;

		// Save the updated confession
		await confession.save();

		return NextResponse.json(confession);
	} catch (error) {
		console.error('Error liking confession:', error);

		// Re-throw the error with a clear message
		throw new Error('Failed to like confession ...');
	}
}
