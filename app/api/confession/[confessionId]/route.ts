import { NextRequest, NextResponse } from 'next/server';
import Confession from '@/lib/models/confessions.model';
import { connectToDB } from '@/lib/mongoose';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const confessionId = searchParams.get('confessionId');

        if (!confessionId) {
            return NextResponse.json({ error: 'Confession ID is required' }, { status: 400 });
        }

        await connectToDB();
        const confession = await Confession.findById(confessionId);

        if (!confession) {
            return NextResponse.json({ error: 'Confession not found' }, { status: 404 });
        }

        return NextResponse.json(confession);
    } catch (error) {
        console.error('Failed to fetch confession:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
