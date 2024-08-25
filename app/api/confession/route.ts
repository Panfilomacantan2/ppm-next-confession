import Confession from '@/lib/models/confessions.model';
import { connectToDB } from '@/lib/mongoose';
import { unstable_noStore as noStore} from 'next/cache';
import { NextResponse } from 'next/server';




export async function GET() {
	noStore()
	try {
		await connectToDB();
		const confession = await Confession.find();

		if (!confession) {
			throw new Error('Confession not found!');
		}

		return NextResponse.json(confession);
	} catch (error) {
		console.log(error);
	}
}



