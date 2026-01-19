import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not defined');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-01-27.acacia' as any, // Using latest stable or requested version
    typescript: true,
});

export const getStripeSession = async (priceId: string, userId: string, userEmail: string) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        mode: 'subscription',
        success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/subscriptions?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/subscriptions?canceled=true`,
        customer_email: userEmail,
        metadata: {
            userId: userId,
        },
    });

    return session;
};

export const getLeadCheckoutSession = async (leadId: string, leadPrice: number, userId: string, userEmail: string) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'chf',
                    product_data: {
                        name: `Lead #${leadId}`,
                        description: `Achat de lead qualifié sur DevisMaison`,
                    },
                    unit_amount: Math.round(leadPrice * 100), // Stripe uses cents
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/entreprise/dashboard?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/entreprise/dashboard?canceled=true`,
        customer_email: userEmail,
        metadata: {
            userId: userId,
            leadId: leadId,
            type: 'lead_purchase'
        },
    });

    return session;
};
