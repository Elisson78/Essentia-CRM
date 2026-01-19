import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        const res = await query('SELECT id, email, name, role, password FROM users WHERE email = $1', [email]);
        const user = res.rows[0];

        if (!user || user.password !== password) {
            return NextResponse.json({ error: 'Identifiants invalides' }, { status: 401 });
        }

        // Pour le MVP, on renvoie les infos basiques sans JWT complexe pour l'instant
        const { password: _, ...userWithoutPassword } = user;
        return NextResponse.json(userWithoutPassword);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
