import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
    try {
        const res = await query(`
            SELECT id, email, name, role, created_at, phone, logo_url, description
            FROM users 
            WHERE role = 'ENTREPRISE'
            ORDER BY created_at DESC
        `);

        return NextResponse.json(res.rows);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
