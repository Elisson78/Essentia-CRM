import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const res = await query(`
            SELECT id, email, name, role, created_at, phone, logo_url, description
            FROM users 
            WHERE id = $1 AND role = 'ENTREPRISE'
        `, [id]);

        if (res.rows.length === 0) {
            return NextResponse.json({ error: 'Entreprise non trouvée' }, { status: 404 });
        }

        return NextResponse.json(res.rows[0]);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { name, phone, description, logo_url } = body;

        const res = await query(`
            UPDATE users 
            SET name = $1, phone = $2, description = $3, logo_url = $4
            WHERE id = $5 AND role = 'ENTREPRISE'
            RETURNING id, email, name, role, created_at, phone, logo_url, description
        `, [name, phone, description, logo_url, id]);

        if (res.rows.length === 0) {
            return NextResponse.json({ error: 'Entreprise non trouvée ou mise à jour impossible' }, { status: 404 });
        }

        return NextResponse.json(res.rows[0]);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
