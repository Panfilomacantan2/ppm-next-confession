import Confession from '@/lib/models/confessions.model';
import { connectToDB } from '@/lib/mongoose';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
	try {
		// Parse the URL to extract the query parameters
		const { searchParams } = new URL(request.url);
		const id = searchParams.get('id');

		if (!id) {
			return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
		}

		// Connect to the database
		await connectToDB();

		// Find confessions by user ID
		const confessions = await Confession.find({ user_id: id });

		if (!confessions) {
			return NextResponse.json({ error: 'No confessions found for this user' }, { status: 404 });
		}

		return NextResponse.json(confessions);
	} catch (error) {
		console.error('Failed to fetch confessions:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
