const { Pool } = require('pg');
const pool = new Pool({ connectionString: 'postgresql://postgres:Bradok41@72.62.36.167:5432/db_cons?schema=public' });

async function run() {
    try {
        const companies = [
            { name: 'Léman Construction Sàrl', email: 'leman@example.ch', phone: '+41 22 123 45 67', logo: 'logo_leman_construction', desc: 'Spécialiste du gros œuvre et de la maçonnerie à Genève.' },
            { name: 'Peinture & Déco Helvetica', email: 'helvetica@example.ch', phone: '+41 21 234 56 78', logo: 'logo_peinture_helvetica', desc: 'Experts en peinture intérieure et décoration à Lausanne.' },
            { name: 'Swiss Electric Pro', email: 'electric@example.ch', phone: '+41 44 345 67 89', logo: 'logo_swiss_electric_pro', desc: 'Installations électriques et domotique de haute precision.' },
            { name: 'Jardins du Rhône', email: 'rhone@example.ch', phone: '+41 27 456 78 90', logo: 'logo_jardins_du_rhone', desc: 'Aménagement paysager et entretien de jardins en Valais.' },
            { name: 'Rénovation Valaisanne', email: 'valais@example.ch', phone: '+41 27 567 89 01', logo: 'logo_renovation_valaisanne', desc: 'Votre partenaire pour toutes vos rénovations de chalet.' }
        ];

        for (const c of companies) {
            console.log(`Processing ${c.name}...`);
            const res = await pool.query(
                `INSERT INTO users (email, password, name, phone, role, logo_url, description) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7) 
                 ON CONFLICT (email) 
                 DO UPDATE SET role = $5, name = $3, phone = $4, logo_url = $6, description = $7 
                 RETURNING id`,
                [c.email, 'password123', c.name, c.phone, 'ENTREPRISE', c.logo, c.desc]
            );
            console.log(`Done! ID: ${res.rows[0].id}`);
        }
        console.log('All companies processed successfully.');
    } catch (e) {
        console.error('ERROR:', e);
    } finally {
        await pool.end();
    }
}

run();
