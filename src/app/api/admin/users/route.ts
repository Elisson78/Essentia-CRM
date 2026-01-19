import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
    try {
        const res = await query('SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC');
        return NextResponse.json(res.rows);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { id, role } = body;

        if (!id || !role) {
            return NextResponse.json({ error: 'ID e Role são obrigatórios' }, { status: 400 });
        }

        const res = await query(
            'UPDATE users SET role = $1 WHERE id = $2 RETURNING id, name, email, role',
            [role, id]
        );

        if (res.rows.length === 0) {
            return NextResponse.json({ error: 'Utilisateurs non trouvé' }, { status: 404 });
        }

        return NextResponse.json(res.rows[0]);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
