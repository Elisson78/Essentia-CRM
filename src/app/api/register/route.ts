import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { email, password, name, role } = await request.json();

        // Vérifier si l'utilisateur existe déjà
        const userExist = await query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExist.rows.length > 0) {
            return NextResponse.json({ error: 'Email déjà utilisé' }, { status: 400 });
        }

        // Dans un vrai projet, il faudrait hasher le mot de passe (bcrypt)
        // Pour ce MVP, nous simplifions
        const res = await query(
            'INSERT INTO users (email, password, name, role) VALUES ($1, $2, $3, $4) RETURNING id, email, name, role',
            [email, password, name || '', role || 'CLIENT']
        );

        return NextResponse.json(res.rows[0]);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
