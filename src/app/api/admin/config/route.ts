import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
    try {
        const res = await query('SELECT key, value FROM platform_config');
        const config: Record<string, string> = {};
        res.rows.forEach(row => {
            config[row.key] = row.value;
        });
        return NextResponse.json(config);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { key, value } = body;

        await query(
            'INSERT INTO platform_config (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = CURRENT_TIMESTAMP',
            [key, value]
        );

        return NextResponse.json({ success: true, key, value });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
