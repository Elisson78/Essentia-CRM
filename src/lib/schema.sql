-- Création des types d'utilisateurs
-- CREATE TYPE user_role AS ENUM ('ADMIN', 'CLIENT', 'ENTREPRISE');

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT,
    role TEXT NOT NULL DEFAULT 'CLIENT', -- CLIENT, ADMIN, ENTREPRISE
    stripe_customer_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table des abonnements (Subscriptions)
CREATE TABLE IF NOT EXISTS subscriptions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    stripe_subscription_id TEXT UNIQUE,
    stripe_customer_id TEXT,
    plan_type TEXT NOT NULL, -- BASIC, PRO, ENTERPRISE
    status TEXT NOT NULL, -- active, canceled, trialing, past_due
    current_period_end TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- Table des demandes de devis (Leads)
CREATE TABLE IF NOT EXISTS leads (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES users(id),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    city TEXT NOT NULL,
    category TEXT NOT NULL, -- Rénovation, Construction, Peinture, etc.
    project_type TEXT, -- simple, medium, large
    estimated_start_date TIMESTAMP WITH TIME ZONE,
    estimated_deadline TIMESTAMP WITH TIME ZONE,
    lead_price DECIMAL(10,2) DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'NOUVEAU', -- NOUVEAU, ENVOYÉ, EN_NÉGOCIATION, TERMINÉ
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table des relations Lead-Entreprise (pour le Dashboard Admin)
CREATE TABLE IF NOT EXISTS lead_assignments (
    id SERIAL PRIMARY KEY,
    lead_id INTEGER REFERENCES leads(id),
    company_id INTEGER REFERENCES users(id),
    status TEXT NOT NULL DEFAULT 'EN_ATTENTE', -- EN_ATTENTE, CONTACTÉ, ACCEPTÉ, REFUSÉ
    payment_status TEXT NOT NULL DEFAULT 'PENDING', -- PENDING, PAID
    payment_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(lead_id, company_id)
);
