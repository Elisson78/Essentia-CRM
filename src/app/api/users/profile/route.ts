import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function PUT(request: Request) {
    try {
        const { id, name, email, phone } = await request.json();

        if (!id) {
            return NextResponse.json({ error: 'ID utilisateur requis' }, { status: 400 });
        }

        // Vérifier si l'email n'est pas déjà utilisé par un autre utilisateur
        const emailCheck = await query('SELECT id FROM users WHERE email = $1 AND id != $2', [email, id]);
        if (emailCheck.rows.length > 0) {
            return NextResponse.json({ error: 'Cet email est déjà utilisé' }, { status: 400 });
        }

        const res = await query(
            'UPDATE users SET name = $1, email = $2, phone = $3 WHERE id = $4 RETURNING id, name, email, phone, role',
            [name, email, phone, id]
        );

        if (res.rows.length === 0) {
            return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
        }

        return NextResponse.json({
            message: 'Profil mis à jour avec succès',
            user: res.rows[0]
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
