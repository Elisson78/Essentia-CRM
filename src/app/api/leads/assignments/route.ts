import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { lead_id, entreprise_id } = await request.json();

        // Check if already assigned
        const check = await query('SELECT id FROM lead_assignments WHERE lead_id = $1 AND company_id = $2', [lead_id, entreprise_id]);
        if (check.rows.length > 0) {
            return NextResponse.json({ error: 'Lead déjà assigné à cette entreprise' }, { status: 400 });
        }

        const res = await query(
            'INSERT INTO lead_assignments (lead_id, company_id) VALUES ($1, $2) RETURNING *',
            [lead_id, entreprise_id]
        );

        // Update lead status to EN_COURS if it was NOUVEAU
        await query("UPDATE leads SET status = 'EN_COURS' WHERE id = $1 AND status = 'NOUVEAU'", [lead_id]);

        return NextResponse.json(res.rows[0]);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const lead_id = searchParams.get('lead_id');

        const res = await query(`
            SELECT la.*, u.name as company_name, u.email as company_email
            FROM lead_assignments la
            JOIN users u ON la.company_id = u.id
            WHERE la.lead_id = $1
        `, [lead_id]);

        return NextResponse.json(res.rows);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
