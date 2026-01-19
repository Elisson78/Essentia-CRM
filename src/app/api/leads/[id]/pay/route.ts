import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getLeadCheckoutSession } from '@/lib/stripe';

export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { company_id, email } = await request.json();
        const lead_id = params.id;

        if (!company_id) {
            return NextResponse.json({ error: 'company_id requis' }, { status: 400 });
        }

        // Vérifier si le lead existe e pegar o preço
        const leadRes = await query('SELECT id, lead_price FROM leads WHERE id = $1', [lead_id]);
        if (leadRes.rows.length === 0) {
            return NextResponse.json({ error: 'Lead non trouvé' }, { status: 404 });
        }

        const lead = leadRes.rows[0];

        // Criar sessão de Checkout do Stripe
        const session = await getLeadCheckoutSession(
            lead_id,
            parseFloat(lead.lead_price),
            company_id.toString(),
            email
        );

        return NextResponse.json({
            success: true,
            url: session.url
        });
    } catch (error: any) {
        console.error('Lead Pay Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
