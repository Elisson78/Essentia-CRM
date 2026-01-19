import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const isAdmin = request.headers.get('is-admin') === 'true';
        const companyId = request.headers.get('company-id');

        const res = await query(`
            SELECT 
                l.*, 
                u.name as client_name, 
                u.email as client_email, 
                u.phone as client_phone,
                la.payment_status
            FROM leads l
            JOIN users u ON l.client_id = u.id
            LEFT JOIN lead_assignments la ON l.id = la.lead_id AND la.company_id = $2
            WHERE l.id = $1
        `, [id, companyId || null]);

        if (res.rows.length === 0) {
            return NextResponse.json({ error: 'Lead non trouvé' }, { status: 404 });
        }

        const lead = res.rows[0];
        const isPaid = lead.payment_status === 'PAID';

        // Administrateur voit tout, sinon on masque si non payé
        const sanitizedLead = {
            ...lead,
            client_email: (isPaid || isAdmin) ? lead.client_email : '***@***.***',
            client_phone: (isPaid || isAdmin) ? lead.client_phone : '**********'
        };

        // Fetch assignments for this lead
        const assignmentsRes = await query(`
            SELECT la.*, u.name as company_name 
            FROM lead_assignments la
            JOIN users u ON la.company_id = u.id
            WHERE la.lead_id = $1
            ORDER BY la.created_at DESC
        `, [id]);

        return NextResponse.json({
            lead: sanitizedLead,
            assignments: assignmentsRes.rows
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { status } = body;

        const res = await query(
            'UPDATE leads SET status = $1 WHERE id = $2 RETURNING *',
            [status, id]
        );

        return NextResponse.json(res.rows[0]);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
