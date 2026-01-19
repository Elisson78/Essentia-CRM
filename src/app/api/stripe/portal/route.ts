import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { query } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const { userId } = await req.json();

        // Buscar stripe_customer_id do usuário
        const userRes = await query('SELECT stripe_customer_id FROM users WHERE id = $1', [userId]);
        if (userRes.rows.length === 0 || !userRes.rows[0].stripe_customer_id) {
            return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
        }

        const customerId = userRes.rows[0].stripe_customer_id;

        const session = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/subscriptions`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error('Stripe Portal Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
