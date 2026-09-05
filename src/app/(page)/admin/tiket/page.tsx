// app/admin/tiket/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Search, Eye, Check, X, ChevronDown, Download, Trash2 } from 'lucide-react';

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
    createdAt: string;
};

function formatPurchasedAt(iso: string): string {
    const d = new Date(iso);
    const time = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }).format(d);
    const day = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Jakarta',
        day: 'numeric',
    }).format(d);
    const month = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Jakarta',
        month: 'long',
    }).format(d);
    return `${time} ${day} ${month}`;
}

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
    const [actingId, setActingId] = useState<string | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Ticket | null>(null);
    const [deleting, setDeleting] = useState(false);

    const load = async () => {
        const res = await fetch('/api/orders');
        setTickets(await res.json());
        setLoading(false);
    };

    useEffect(() => {
        load();
    }, []);

    const act = async (id: string, action: 'confirm' | 'reject') => {
        setActingId(id);
        await fetch(`/api/orders/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action }),
        });
        await load();
        setActingId(null);
    };

    const confirmDelete = async () => {
        if (!deleteTarget) return;
        setDeleting(true);
        try {
            await fetch(`/api/orders/${deleteTarget.id}`, {
                method: 'DELETE',
            });
            await load();
            setDeleteTarget(null);
        } finally {
            setDeleting(false);
        }
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
                                <th className='px-4 py-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider whitespace-nowrap'>
                                    Purchased
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
                                    <td className='px-4 py-3 whitespace-nowrap'>
                                        <span className='text-xs text-white/60'>
                                            {formatPurchasedAt(t.createdAt)}
                                        </span>
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
                                        <div className='flex items-center gap-1'>
                                            {t.status === 'PENDING' && (
                                                <>
                                                    <button
                                                        disabled={actingId === t.id}
                                                        onClick={() =>
                                                            act(t.id, 'confirm')
                                                        }
                                                        className={`p-1.5 rounded transition-colors border ${
                                                            actingId === t.id
                                                                ? 'bg-green-600/10 text-green-400/50 border-green-600/20 cursor-wait'
                                                                : 'bg-green-600/20 text-green-400 hover:bg-green-600/30 border-green-600/30'
                                                        }`}
                                                        title='Confirm'
                                                    >
                                                        {actingId === t.id ? (
                                                            <div className='h-4 w-4 animate-spin rounded-full border-2 border-green-400 border-t-transparent' />
                                                        ) : (
                                                            <Check className='h-4 w-4' />
                                                        )}
                                                    </button>
                                                    <button
                                                        disabled={actingId === t.id}
                                                        onClick={() =>
                                                            act(t.id, 'reject')
                                                        }
                                                        className={`p-1.5 rounded transition-colors border ${
                                                            actingId === t.id
                                                                ? 'bg-red-600/10 text-red-400/50 border-red-600/20 cursor-wait'
                                                                : 'bg-red-600/20 text-red-400 hover:bg-red-600/30 border-red-600/30'
                                                        }`}
                                                        title='Reject'
                                                    >
                                                        {actingId === t.id ? (
                                                            <div className='h-4 w-4 animate-spin rounded-full border-2 border-red-400 border-t-transparent' />
                                                        ) : (
                                                            <X className='h-4 w-4' />
                                                        )}
                                                    </button>
                                                </>
                                            )}
                                            <button
                                                onClick={() =>
                                                    setDeleteTarget(t)
                                                }
                                                className='p-1.5 rounded transition-colors border border-red-600/30 bg-red-600/20 text-red-400 hover:bg-red-600/30'
                                                title='Delete'
                                            >
                                                <Trash2 className='h-4 w-4' />
                                            </button>
                                        </div>
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

            {deleteTarget && (
                <div
                    onClick={() => !deleting && setDeleteTarget(null)}
                    className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4'
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className='w-full max-w-md rounded-2xl border border-white/10 bg-[#121212] p-6'
                    >
                        <div className='flex items-center gap-2 text-red-400'>
                            <Trash2 className='h-5 w-5' />
                            <h2 className='text-lg font-bold text-white'>
                                Delete Ticket
                            </h2>
                        </div>
                        <p className='mt-3 text-sm leading-6 text-white/60'>
                            Hapus tiket{' '}
                            <span className='font-mono text-white'>
                                {deleteTarget.orderId}
                            </span>{' '}
                            milik <span className='text-white'>{deleteTarget.fullName}</span>? Menghapus data ini tidak dapat dibatalkan.
                        </p>
                        {deleteTarget.proofUrl && (
                            <p className='mt-2 text-xs text-white/40'>
                                Note: bukti pembayaran & status tiket akan ikut terhapus.
                            </p>
                        )}
                        <div className='mt-6 flex justify-end gap-2'>
                            <button
                                disabled={deleting}
                                onClick={() => setDeleteTarget(null)}
                                className='px-4 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 disabled:opacity-50'
                            >
                                Cancel
                            </button>
                            <button
                                disabled={deleting}
                                onClick={confirmDelete}
                                className='inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50'
                            >
                                {deleting ? (
                                    <>
                                        <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
                                        Deleting...
                                    </>
                                ) : (
                                    'Delete'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
