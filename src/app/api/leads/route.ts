import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: Request) {
    try {
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
            LEFT JOIN lead_assignments la ON l.id = la.lead_id AND la.company_id = $1
            ORDER BY l.created_at DESC
        `, [companyId || null]);

        // Protection des données : ne montrer l'email e le téléphone que si payé
        const sanitizedLeads = res.rows.map(lead => {
            const isPaid = lead.payment_status === 'PAID';
            return {
                ...lead,
                client_email: isPaid ? lead.client_email : '***@***.***',
                client_phone: isPaid ? lead.client_phone : '**********'
            };
        });

        return NextResponse.json(sanitizedLeads);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            client_id, name, email, phone, password,
            title, description, city, category,
            project_type, estimated_start_date, estimated_deadline
        } = body;

        let finalClientId = client_id;

        // Si l'utilisateur n'est pas connecté ou client_id absent, on gère l'auto-enregistrement
        if (!finalClientId && email) {
            // Chercher si l'utilisateur existe déjà
            const userCheck = await query('SELECT id FROM users WHERE email = $1', [email]);

            if (userCheck.rows.length > 0) {
                finalClientId = userCheck.rows[0].id;
            } else {
                // Créer un nouvel utilisateur avec le mot de passe fourni (ou 'password' par défaut)
                const newUser = await query(
                    'INSERT INTO users (email, password, name, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                    [email, password || 'password', name, phone, 'CLIENT']
                );
                finalClientId = newUser.rows[0].id;
            }
        }

        if (!finalClientId) {
            throw new Error('client_id ou email requis');
        }

        // Logique de prix base sur la configuration globale
        const configRes = await query('SELECT key, value FROM platform_config WHERE key LIKE $1', ['lead_price_%']);
        const config: Record<string, number> = {};
        configRes.rows.forEach(row => {
            config[row.key] = parseFloat(row.value);
        });

        let lead_price = config.lead_price_simple || 30;
        if (project_type === 'medium') lead_price = config.lead_price_medium || 50;
        else if (project_type === 'large') lead_price = config.lead_price_large || 80;

        const res = await query(
            `INSERT INTO leads (
                client_id, title, description, city, category, 
                project_type, estimated_start_date, estimated_deadline, lead_price
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
            [
                finalClientId, title, description, city, category,
                project_type, estimated_start_date, estimated_deadline, lead_price
            ]
        );

        // Envoyer aussi les infos utilisateur pour le login automatique côté client
        const userRes = await query('SELECT id, email, name, role FROM users WHERE id = $1', [finalClientId]);

        return NextResponse.json({
            lead: res.rows[0],
            user: userRes.rows[0]
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
