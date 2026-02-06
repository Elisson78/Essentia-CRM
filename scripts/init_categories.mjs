import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is missing in .env.local');
    process.exit(1);
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const DEFAULT_CATEGORIES = [
    { name: "Jardinage & Extérieur", icon: "Flower2", slug: "jardinage-exterieur" },
    { name: "Sols & Parquets", icon: "Layers", slug: "sols-parquets" },
    { name: "Électricité", icon: "Zap", slug: "electricite" },
    { name: "Peinture & Rénovation", icon: "PaintRoller", slug: "peinture-renovation" },
    { name: "Déménagement", icon: "Truck", slug: "demenagement" },
    { name: "Nettoyage", icon: "Sparkles", slug: "nettoyage" },
    { name: "Cuisines", icon: "Home", slug: "cuisines" },
];

async function main() {
    const client = await pool.connect();
    try {
        console.log('Creating work_types table...');
        await client.query(`
      CREATE TABLE IF NOT EXISTS work_types (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        icon TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
        console.log('Table created or already exists.');

        for (const cat of DEFAULT_CATEGORIES) {
            console.log(`Seeding category: ${cat.name}`);
            // Use ON CONFLICT DO NOTHING to avoid duplicates if re-run
            await client.query(`
        INSERT INTO work_types (name, icon, slug)
        VALUES ($1, $2, $3)
        ON CONFLICT (slug) DO NOTHING;
      `, [cat.name, cat.icon, cat.slug]);
        }

        console.log('Seeding completed successfully.');
    } catch (err) {
        console.error('Error initializing categories:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

main();
