import { NextResponse } from 'next/server';
import { query } from '@/lib/db';


function simpleSlugify(text: string) {
    return text
        .toString()
        .toLowerCase()
        .normalize('NFD') // Remove accents
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
}

export async function GET() {
    try {
        const result = await query('SELECT * FROM work_types ORDER BY created_at DESC');
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { name, icon } = await request.json();

        if (!name || !icon) {
            return NextResponse.json({ error: 'Name and Icon are required' }, { status: 400 });
        }

        const slug = simpleSlugify(name);

        const result = await query(
            'INSERT INTO work_types (name, icon, slug) VALUES ($1, $2, $3) RETURNING *',
            [name, icon, slug]
        );

        return NextResponse.json(result.rows[0]);
    } catch (error) {
        console.error('Error creating category:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
