import React from 'react';
import styles from './CategoriesSection.module.css';
import {
    Flower2,
    Layers,
    Zap,
    PaintRoller,
    Truck,
    Sparkles,
    Home,
    MoreHorizontal
} from 'lucide-react';
import Link from 'next/link';

const categories = [
    {
        title: "Jardinage & Extérieur",
        icon: <Flower2 size={24} />,
        href: "#"
    },
    {
        title: "Sols & Parquets",
        icon: <Layers size={24} />,
        href: "#"
    },
    {
        title: "Électricité",
        icon: <Zap size={24} />, // Often used for electricity
        href: "#"
    },
    {
        title: "Peinture & Rénovation",
        icon: <PaintRoller size={24} />,
        href: "#"
    },
    {
        title: "Déménagement",
        icon: <Truck size={24} />,
        href: "#"
    },
    {
        title: "Nettoyage",
        icon: <Sparkles size={24} />, // Clean/Sparkle
        href: "#"
    },
    {
        title: "Cuisines", // "Kitchens"
        icon: <Home size={24} />, // Home or maybe something more specific if available, Home is safe
        href: "#"
    },
    {
        title: "Toutes les catégories",
        icon: <MoreHorizontal size={24} />,
        href: "#"
    }
];

export default function CategoriesSection() {
    return (
        <section className={styles.section}>
            <div className={styles.maxContainer}>
                <h2 className={styles.title}>Des experts qualifiés pour tous vos besoins</h2>
                <div className={styles.grid}>
                    {categories.map((cat, index) => (
                        <Link key={index} href={cat.href} className={styles.card}>
                            <div className={styles.iconWrapper}>
                                {cat.icon}
                            </div>
                            <span className={styles.cardTitle}>{cat.title}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
