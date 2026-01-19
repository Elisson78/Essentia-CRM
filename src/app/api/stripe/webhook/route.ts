import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { query } from '@/lib/db';
import Stripe from 'stripe';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature')!;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
        console.error(`Webhook Error: ${err.message}`);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    const session = event.data.object as any;

    switch (event.type) {
        case 'checkout.session.completed':
            const customerId = session.customer;
            const userId = session.metadata.userId;

            if (session.metadata.type === 'lead_purchase') {
                const leadId = session.metadata.leadId;
                await query(
                    `INSERT INTO lead_assignments (lead_id, company_id, status, payment_status, payment_id)
           VALUES ($1, $2, 'ACCEPTÉ', 'PAID', $3)
           ON CONFLICT (lead_id, company_id) DO UPDATE 
           SET payment_status = 'PAID', status = 'ACCEPTÉ', payment_id = $3`,
                    [leadId, userId, session.id]
                );
            } else {
                const subscriptionId = session.subscription;
                // Pegar os detalhes da assinatura
                const subscription = await stripe.subscriptions.retrieve(subscriptionId) as any;
                const planId = subscription.items.data[0].price.id;

                let planType = 'BASIC';
                if (planId === process.env.STRIPE_PRICE_ID_PRO) planType = 'PRO';
                if (planId === process.env.STRIPE_PRICE_ID_ENTERPRISE) planType = 'ENTERPRISE';

                // Atualizar banco de dados
                await query(
                    'UPDATE users SET stripe_customer_id = $1 WHERE id = $2',
                    [customerId, userId]
                );

                await query(
                    `INSERT INTO subscriptions (user_id, stripe_subscription_id, stripe_customer_id, plan_type, status, current_period_end)
           VALUES ($1, $2, $3, $4, $5, to_timestamp($6))
           ON CONFLICT (stripe_subscription_id) DO UPDATE 
           SET status = $5, current_period_end = to_timestamp($6)`,
                    [
                        userId,
                        subscriptionId,
                        customerId,
                        planType,
                        subscription.status,
                        subscription.current_period_end
                    ]
                );
            }
            break;

        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
            const sub = event.data.object as any;
            await query(
                'UPDATE subscriptions SET status = $1, current_period_end = to_timestamp($2) WHERE stripe_subscription_id = $3',
                [sub.status, sub.current_period_end, sub.id]
            );
            break;

        case 'invoice.payment_failed':
            const failedInvoice = event.data.object as any;
            if (failedInvoice.subscription) {
                await query(
                    'UPDATE subscriptions SET status = $1 WHERE stripe_subscription_id = $2',
                    ['past_due', failedInvoice.subscription]
                );
            }
            break;

        case 'invoice.payment_succeeded':
            const paidInvoice = event.data.object as any;
            if (paidInvoice.subscription) {
                await query(
                    'UPDATE subscriptions SET status = $1 WHERE stripe_subscription_id = $2',
                    ['active', paidInvoice.subscription]
                );
            }
            break;
    }

    return NextResponse.json({ received: true });
}
