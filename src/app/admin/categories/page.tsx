'use client';

import React, { useState, useEffect } from 'react';
import {
    Flower2,
    Layers,
    Zap,
    PaintRoller,
    Truck,
    Sparkles,
    Home,
    MoreHorizontal,
    Plus,
    Trash2,
    Hammer
} from 'lucide-react';
import styles from './AdminCategories.module.css';

// Map string name to component
const Icons: Record<string, any> = {
    Flower2,
    Layers,
    Zap,
    PaintRoller,
    Truck,
    Sparkles,
    Home,
    MoreHorizontal,
    Hammer
};

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({ name: '', icon: 'Hammer' });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await fetch('/api/admin/categories');
            if (res.ok) {
                setCategories(await res.json());
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name) return;

        try {
            const res = await fetch('/api/admin/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setFormData({ name: '', icon: 'Hammer' });
                fetchCategories();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) return;

        try {
            await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
            fetchCategories();
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoading) return <div className={styles.container}>Chargement...</div>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Types de travaux</h1>
                <p className={styles.subtitle}>Gérez les catégories de travaux disponibles pour les devis.</p>
            </div>

            <div className={styles.grid}>
                {/* Formulaire d'ajout */}
                <div className={styles.formCard}>
                    <h2 className={styles.cardTitle}>
                        <Plus size={20} />
                        Ajouter une catégorie
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Nom</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className={styles.input}
                                placeholder="Ex: Plomberie"
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Icône</label>
                            <select
                                value={formData.icon}
                                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                className={styles.select}
                            >
                                {Object.keys(Icons).map(iconName => (
                                    <option key={iconName} value={iconName}>{iconName}</option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.preview}>
                            Aperçu : {React.createElement(Icons[formData.icon] || Hammer, { size: 20, style: { color: '#D52B1E' } })}
                        </div>

                        <button type="submit" className={styles.submitBtn}>
                            Créer
                        </button>
                    </form>
                </div>

                {/* Liste */}
                <div className={styles.tableCard}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles.th}>Icône</th>
                                <th className={styles.th}>Nom</th>
                                <th className={styles.th}>Slug</th>
                                <th className={`${styles.th} ${styles.textRight}`} style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((cat) => {
                                const IconComponent = Icons[cat.icon] || Hammer;
                                return (
                                    <tr key={cat.id} className={styles.tr}>
                                        <td className={styles.td}>
                                            <div className={styles.iconCell}>
                                                <IconComponent size={18} />
                                            </div>
                                        </td>
                                        <td className={`${styles.td} ${styles.nameCell}`}>{cat.name}</td>
                                        <td className={`${styles.td} ${styles.slugCell}`}>{cat.slug}</td>
                                        <td className={`${styles.td}`} style={{ textAlign: 'right' }}>
                                            <button
                                                onClick={() => handleDelete(cat.id)}
                                                className={styles.deleteBtn}
                                                title="Supprimer"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                            {categories.length === 0 && (
                                <tr>
                                    <td colSpan={4} className={styles.emptyState}>
                                        Aucune catégorie trouvée.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
