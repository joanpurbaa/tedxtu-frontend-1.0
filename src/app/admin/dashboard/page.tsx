// app/admin/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import {
    ShoppingBag,
    CheckCircle,
    Clock,
    XCircle,
    QrCode,
    Users,
} from 'lucide-react';

type Stats = {
    total: number;
    confirmed: number;
    pending: number;
    rejected: number;
    scanned: number;
    byTier: { tier: string; _count: { tier: number } }[];
};

function StatCard({
    label,
    value,
    icon: Icon,
    color,
}: {
    label: string;
    value: number;
    icon: React.ElementType;
    color: string;
}) {
    return (
        <div className='bg-[#121212] rounded-xl border border-white/5 p-6 transition-all hover:border-white/10'>
            <div className='flex items-center justify-between'>
                <div>
                    <p className='text-sm font-medium text-white/60'>{label}</p>
                    <p className='mt-2 text-3xl font-semibold text-white'>
                        {value}
                    </p>
                </div>
                <div className={`rounded-full p-3 ${color}`}>
                    <Icon className='h-5 w-5 text-white' />
                </div>
            </div>
        </div>
    );
}

function TierCard({ tier, count }: { tier: string; count: number }) {
    return (
        <div className='bg-[#121212] rounded-xl border border-white/5 p-6 text-center transition-all hover:border-white/10'>
            <p className='text-sm font-medium text-white/60 uppercase tracking-wider'>
                {tier}
            </p>
            <p className='mt-3 text-3xl font-bold text-white'>{count}</p>
            <p className='mt-1 text-xs text-white/40'>registrations</p>
        </div>
    );
}

export default function DashboardPage() {
    const [stats, setStats] = useState<Stats | null>(null);

    useEffect(() => {
        fetch('/api/admin/stats')
            .then((r) => r.json())
            .then(setStats);
    }, []);

    if (!stats) {
        return (
            <div className='flex items-center justify-center h-64'>
                <div className='text-center'>
                    <div className='inline-block animate-spin rounded-full h-8 w-8 border-4 border-white/20 border-t-red-600'></div>
                    <p className='mt-4 text-white/60'>Loading dashboard...</p>
                </div>
            </div>
        );
    }

    const cards = [
        {
            label: 'Total Orders',
            value: stats.total,
            icon: ShoppingBag,
            color: 'bg-blue-600',
        },
        {
            label: 'Confirmed',
            value: stats.confirmed,
            icon: CheckCircle,
            color: 'bg-green-600',
        },
        {
            label: 'Pending',
            value: stats.pending,
            icon: Clock,
            color: 'bg-yellow-600',
        },
        {
            label: 'Rejected',
            value: stats.rejected,
            icon: XCircle,
            color: 'bg-red-600',
        },
        {
            label: 'Checked-in',
            value: stats.scanned,
            icon: QrCode,
            color: 'bg-purple-600',
        },
    ];

    return (
        <div className='p-6'>
            <div className='mb-8'>
                <h1 className='text-2xl font-bold text-white'>Dashboard</h1>
                <p className='mt-1 text-sm text-white/60'>
                    Overview of your ticket sales and registrations
                </p>
            </div>

            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5'>
                {cards.map((card) => (
                    <StatCard key={card.label} {...card} />
                ))}
            </div>

            <div className='mt-10'>
                <div className='flex items-center gap-2 mb-4'>
                    <Users className='h-5 w-5 text-white/60' />
                    <h2 className='text-lg font-semibold text-white'>
                        Registrations by Tier
                    </h2>
                </div>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                    {stats.byTier.map((t) => (
                        <TierCard
                            key={t.tier}
                            tier={t.tier}
                            count={t._count.tier}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
