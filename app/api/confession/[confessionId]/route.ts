import Confession from '@/lib/models/confessions.model';
import { connectToDB } from '@/lib/mongoose';
import { NextResponse } from 'next/server';

export async function GET(request: { params: { confessionId: string } }) {
	const { confessionId } = request.params;

	try {
		await connectToDB();

		// Fetch the confession by ID
		const confession = await Confession.findById({ _id: confessionId });

		if (!confession) {
			return NextResponse.json({ error: 'Confession not found!' }, { status: 404 });
		}

		return NextResponse.json(confession);
	} catch (error) {
		console.error('Failed to fetch confession:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
