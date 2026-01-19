import { NextResponse } from 'next/server';
import { getStripeSession } from '@/lib/stripe';

export async function POST(req: Request) {
    try {
        const { priceId, userId, userEmail } = await req.json();

        if (!priceId || !userId || !userEmail) {
            return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
        }

        const session = await getStripeSession(priceId, userId, userEmail);

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error('Stripe Checkout Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
