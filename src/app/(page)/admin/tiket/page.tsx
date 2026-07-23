// app/admin/tiket/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Search, Eye, Check, X, ChevronDown, Download } from 'lucide-react';

type Ticket = {
    id: string;
    orderId: string;
    fullName: string;
    email: string;
    phone: string;
    participantStatus: string;
    tier: string;
    paymentName: string | null;
    proofUrl: string | null;
    status: 'PENDING' | 'CONFIRMED' | 'REJECTED';
    scanned: boolean;
};

function StatusBadge({ status }: { status: string }) {
    const colors = {
        CONFIRMED: 'bg-green-600/20 text-green-400 border-green-600/30',
        PENDING: 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30',
        REJECTED: 'bg-red-600/20 text-red-400 border-red-600/30',
    };
    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[status as keyof typeof colors] || 'bg-white/10 text-white/60 border-white/10'}`}
        >
            {status}
        </span>
    );
}

function ScanBadge({ scanned }: { scanned: boolean }) {
    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${scanned ? 'bg-blue-600/20 text-blue-400 border-blue-600/30' : 'bg-white/5 text-white/40 border-white/10'}`}
        >
            {scanned ? 'Yes' : 'No'}
        </span>
    );
}

export default function TiketPage() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const [preview, setPreview] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');

    const load = async () => {
        const res = await fetch('/api/orders');
        setTickets(await res.json());
        setLoading(false);
    };

    useEffect(() => {
        load();
    }, []);

    const act = async (id: string, action: 'confirm' | 'reject') => {
        await fetch(`/api/orders/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action }),
        });
        load();
    };

    const filteredTickets = tickets.filter((t) => {
        const matchesSearch =
            t.fullName.toLowerCase().includes(search.toLowerCase()) ||
            t.email.toLowerCase().includes(search.toLowerCase()) ||
            t.orderId.toLowerCase().includes(search.toLowerCase());
        const matchesStatus =
            filterStatus === 'all' || t.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    if (loading) {
        return (
            <div className='flex items-center justify-center h-64'>
                <div className='text-center'>
                    <div className='inline-block animate-spin rounded-full h-8 w-8 border-4 border-white/20 border-t-red-600'></div>
                    <p className='mt-4 text-white/60'>Loading tickets...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='p-6'>
            <div className='mb-8'>
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                    <div>
                        <h1 className='text-2xl font-bold text-white'>
                            Ticket Management
                        </h1>
                        <p className='mt-1 text-sm text-white/60'>
                            Manage and review all ticket orders
                        </p>
                    </div>
                </div>

                <div className='mt-4 flex flex-col sm:flex-row gap-3'>
                    <div className='relative flex-1'>
                        <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40' />
                        <input
                            type='text'
                            placeholder='Search by name, email, or order ID...'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className='w-full pl-10 pr-4 py-2 bg-[#121212] border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent'
                        />
                    </div>
                    <div className='relative'>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className='appearance-none pl-4 pr-10 py-2 bg-[#121212] border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent'
                        >
                            <option value='all'>All Status</option>
                            <option value='PENDING'>Pending</option>
                            <option value='CONFIRMED'>Confirmed</option>
                            <option value='REJECTED'>Rejected</option>
                        </select>
                        <ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 pointer-events-none' />
                    </div>
                </div>
            </div>

            <div className='bg-[#121212] rounded-xl border border-white/5 overflow-hidden'>
                <div className='overflow-x-auto'>
                    <table className='w-full text-sm'>
                        <thead>
                            <tr className='border-b border-white/5'>
                                <th className='px-4 py-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider'>
                                    Order ID
                                </th>
                                <th className='px-4 py-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider'>
                                    Name
                                </th>
                                <th className='px-4 py-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider hidden md:table-cell'>
                                    Email
                                </th>
                                <th className='px-4 py-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider hidden lg:table-cell'>
                                    Status
                                </th>
                                <th className='px-4 py-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider hidden sm:table-cell'>
                                    Tier
                                </th>
                                <th className='px-4 py-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider hidden xl:table-cell'>
                                    Payment
                                </th>
                                <th className='px-4 py-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider'>
                                    Proof
                                </th>
                                <th className='px-4 py-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider'>
                                    Status
                                </th>
                                <th className='px-4 py-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider'>
                                    Scanned
                                </th>
                                <th className='px-4 py-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider'>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-white/5'>
                            {filteredTickets.map((t) => (
                                <tr
                                    key={t.id}
                                    className='hover:bg-white/5 transition-colors'
                                >
                                    <td className='px-4 py-3 font-mono text-xs text-white/60'>
                                        {t.orderId}
                                    </td>
                                    <td className='px-4 py-3 font-medium text-white'>
                                        {t.fullName}
                                    </td>
                                    <td className='px-4 py-3 text-white/60 hidden md:table-cell'>
                                        {t.email}
                                    </td>
                                    <td className='px-4 py-3 hidden lg:table-cell'>
                                        <span className='text-xs text-white/60'>
                                            {t.participantStatus}
                                        </span>
                                    </td>
                                    <td className='px-4 py-3 hidden sm:table-cell'>
                                        <span className='text-xs font-medium text-white/80'>
                                            {t.tier}
                                        </span>
                                    </td>
                                    <td className='px-4 py-3 hidden xl:table-cell'>
                                        <span className='text-xs text-white/60'>
                                            {t.paymentName ?? '-'}
                                        </span>
                                    </td>
                                    <td className='px-4 py-3'>
                                        {t.proofUrl ? (
                                            <button
                                                onClick={() =>
                                                    setPreview(t.proofUrl!)
                                                }
                                                className='inline-flex items-center gap-1 text-red-400 hover:text-red-300 text-xs font-medium'
                                            >
                                                <Eye className='h-3.5 w-3.5' />
                                                View
                                            </button>
                                        ) : (
                                            <span className='text-xs text-white/30'>
                                                -
                                            </span>
                                        )}
                                    </td>
                                    <td className='px-4 py-3'>
                                        <StatusBadge status={t.status} />
                                    </td>
                                    <td className='px-4 py-3'>
                                        <ScanBadge scanned={t.scanned} />
                                    </td>
                                    <td className='px-4 py-3'>
                                        {t.status === 'PENDING' && (
                                            <div className='flex gap-1'>
                                                <button
                                                    onClick={() =>
                                                        act(t.id, 'confirm')
                                                    }
                                                    className='p-1.5 bg-green-600/20 text-green-400 rounded hover:bg-green-600/30 transition-colors border border-green-600/30'
                                                    title='Confirm'
                                                >
                                                    <Check className='h-4 w-4' />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        act(t.id, 'reject')
                                                    }
                                                    className='p-1.5 bg-red-600/20 text-red-400 rounded hover:bg-red-600/30 transition-colors border border-red-600/30'
                                                    title='Reject'
                                                >
                                                    <X className='h-4 w-4' />
                                                </button>
                                            </div>
                                        )}
                                        {t.status !== 'PENDING' && (
                                            <span className='text-xs text-white/30'>
                                                -
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredTickets.length === 0 && (
                    <div className='text-center py-12'>
                        <p className='text-white/60'>No tickets found</p>
                    </div>
                )}
            </div>

            {preview && (
                <div
                    onClick={() => setPreview(null)}
                    className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-8'
                >
                    <div className='relative max-w-2xl w-full'>
                        <img
                            src={preview}
                            alt='Payment proof'
                            className='w-full rounded-xl shadow-2xl'
                        />
                        <button
                            onClick={() => setPreview(null)}
                            className='absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors'
                        >
                            <X className='h-5 w-5' />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
