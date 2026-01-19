import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
    try {
        // Obtenir le revenu total (somme de lead_price pour les assignments PAID)
        const revenueRes = await query(`
            SELECT SUM(l.lead_price) as total_revenue
            FROM lead_assignments la
            JOIN leads l ON la.lead_id = l.id
            WHERE la.payment_status = 'PAID'
        `);

        // Obtenir le nombre de leads total
        const totalLeadsRes = await query('SELECT COUNT(*) as count FROM leads');

        // Obtenir le nombre de leads payés (au moins un achat)
        const paidLeadsRes = await query(`
            SELECT COUNT(DISTINCT lead_id) as count 
            FROM lead_assignments 
            WHERE payment_status = 'PAID'
        `);

        // Obtenir le nombre d'entreprises inscrites
        const companiesRes = await query("SELECT COUNT(*) as count FROM users WHERE role = 'ENTREPRISE'");

        return NextResponse.json({
            totalRevenue: parseFloat(revenueRes.rows[0].total_revenue || 0),
            totalLeads: parseInt(totalLeadsRes.rows[0].count),
            paidLeads: parseInt(paidLeadsRes.rows[0].count),
            totalCompanies: parseInt(companiesRes.rows[0].count),
            conversionRate: totalLeadsRes.rows[0].count > 0
                ? (paidLeadsRes.rows[0].count / totalLeadsRes.rows[0].count * 100).toFixed(1)
                : 0
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
