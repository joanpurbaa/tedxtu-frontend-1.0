'use client';

import { useEffect, useState } from 'react';
import { Search, Download, ChevronDown, Users } from 'lucide-react';

type AudienceData = {
    id: string;
    orderId: string;
    createdAt: string;
    email: string;
    fullName: string;
    nickname: string;
    phone: string;
    domisili: string;
    participantStatus: string;
    studentId: string | null;
    faculty: string | null;
    facultyOther: string | null;
    institution: string | null;
    major: string | null;
    tedFamiliarity: string;
    topics: string[];
    musicLifestyle: boolean;
    environmentShapes: boolean;
    artsExpression: boolean;
    eventAspect: string[];
    eventAspectOther: string | null;
    tier: string;
    price: string;
    status: string;
    scanned: boolean;
    scannedAt: string | null;
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

export default function AudiencePage() {
    const [data, setData] = useState<AudienceData[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filterTier, setFilterTier] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [exporting, setExporting] = useState(false);

    const loadData = async () => {
        setLoading(true);
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (filterTier !== 'all') params.append('tier', filterTier);
        if (filterStatus !== 'all') params.append('status', filterStatus);

        const res = await fetch(`/api/audience?${params.toString()}`);
        const json = await res.json();
        setData(json);
        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, [search, filterTier, filterStatus]);

    const handleExport = async () => {
        setExporting(true);
        try {
            const res = await fetch('/api/audience/export');
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `tedx-audience-data-${new Date().toISOString().slice(0, 10)}.xlsx`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Export failed:', error);
        } finally {
            setExporting(false);
        }
    };

    const tiers = ['PRE-SALE1', 'PRE-SALE2', 'REGULAR'];
    const statuses = ['PENDING', 'CONFIRMED', 'REJECTED'];

    return (
        <div className='p-6'>
            <div className='mb-8'>
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                    <div>
                        <h1 className='text-2xl font-bold text-white'>
                            Audience Data
                        </h1>
                        <p className='mt-1 text-sm text-white/60'>
                            Demographic & user research data from registrants
                        </p>
                    </div>
                    <button
                        onClick={handleExport}
                        disabled={exporting}
                        className='inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 rounded-lg text-sm font-medium text-white transition-colors'
                    >
                        <Download className='h-4 w-4' />
                        {exporting ? 'Exporting...' : 'Export Excel'}
                    </button>
                </div>

                <div className='mt-4 flex flex-col sm:flex-row gap-3'>
                    <div className='relative flex-1'>
                        <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40' />
                        <input
                            type='text'
                            placeholder='Search by name, email, order ID, or institution...'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className='w-full pl-10 pr-4 py-2 bg-[#121212] border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent'
                        />
                    </div>
                    <div className='flex gap-2'>
                        <div className='relative'>
                            <select
                                value={filterTier}
                                onChange={(e) => setFilterTier(e.target.value)}
                                className='appearance-none pl-4 pr-10 py-2 bg-[#121212] border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent'
                            >
                                <option value='all'>All Tiers</option>
                                {tiers.map((t) => (
                                    <option key={t} value={t}>
                                        {t}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 pointer-events-none' />
                        </div>
                        <div className='relative'>
                            <select
                                value={filterStatus}
                                onChange={(e) =>
                                    setFilterStatus(e.target.value)
                                }
                                className='appearance-none pl-4 pr-10 py-2 bg-[#121212] border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent'
                            >
                                <option value='all'>All Status</option>
                                {statuses.map((s) => (
                                    <option key={s} value={s}>
                                        {s}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 pointer-events-none' />
                        </div>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className='flex items-center justify-center h-64'>
                    <div className='text-center'>
                        <div className='inline-block animate-spin rounded-full h-8 w-8 border-4 border-white/20 border-t-red-600'></div>
                        <p className='mt-4 text-white/60'>Loading data...</p>
                    </div>
                </div>
            ) : (
                <>
                    <div className='bg-[#121212] rounded-xl border border-white/5 overflow-hidden'>
                        <div className='overflow-x-auto'>
                            <table className='w-full text-sm'>
                                <thead>
                                    <tr className='border-b border-white/5'>
                                        <th className='px-4 py-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider whitespace-nowrap'>
                                            Order ID
                                        </th>
                                        <th className='px-4 py-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider whitespace-nowrap'>
                                            Name
                                        </th>
                                        <th className='px-4 py-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider whitespace-nowrap hidden md:table-cell'>
                                            Email
                                        </th>
                                        <th className='px-4 py-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider whitespace-nowrap hidden lg:table-cell'>
                                            Status
                                        </th>
                                        <th className='px-4 py-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider whitespace-nowrap hidden sm:table-cell'>
                                            Tier
                                        </th>
                                        <th className='px-4 py-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider whitespace-nowrap hidden xl:table-cell'>
                                            Institution
                                        </th>
                                        <th className='px-4 py-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider whitespace-nowrap hidden 2xl:table-cell'>
                                            Familiarity
                                        </th>
                                        <th className='px-4 py-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider whitespace-nowrap'>
                                            Topics
                                        </th>
                                        <th className='px-4 py-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider whitespace-nowrap'>
                                            Status
                                        </th>
                                        <th className='px-4 py-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider whitespace-nowrap'>
                                            Scanned
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-white/5'>
                                    {data.map((item) => (
                                        <tr
                                            key={item.id}
                                            className='hover:bg-white/5 transition-colors'
                                        >
                                            <td className='px-4 py-3 font-mono text-xs text-white/60 whitespace-nowrap'>
                                                {item.orderId}
                                            </td>
                                            <td className='px-4 py-3 whitespace-nowrap'>
                                                <div className='font-medium text-white'>
                                                    {item.fullName}
                                                </div>
                                                <div className='text-xs text-white/40'>
                                                    {item.nickname}
                                                </div>
                                            </td>
                                            <td className='px-4 py-3 text-white/60 hidden md:table-cell whitespace-nowrap'>
                                                {item.email}
                                            </td>
                                            <td className='px-4 py-3 hidden lg:table-cell whitespace-nowrap'>
                                                <span className='text-xs text-white/60'>
                                                    {item.participantStatus}
                                                </span>
                                            </td>
                                            <td className='px-4 py-3 hidden sm:table-cell whitespace-nowrap'>
                                                <span className='text-xs font-medium text-white/80'>
                                                    {item.tier}
                                                </span>
                                            </td>
                                            <td className='px-4 py-3 text-white/60 hidden xl:table-cell whitespace-nowrap'>
                                                {item.institution || '-'}
                                            </td>
                                            <td className='px-4 py-3 text-white/60 hidden 2xl:table-cell whitespace-nowrap text-xs'>
                                                {item.tedFamiliarity}
                                            </td>
                                            <td className='px-4 py-3 whitespace-nowrap'>
                                                <div className='flex flex-wrap gap-1'>
                                                    {item.topics
                                                        .slice(0, 2)
                                                        .map((topic) => (
                                                            <span
                                                                key={topic}
                                                                className='inline-flex px-1.5 py-0.5 bg-white/5 rounded text-xs text-white/60 border border-white/5'
                                                            >
                                                                {topic}
                                                            </span>
                                                        ))}
                                                    {item.topics.length > 2 && (
                                                        <span className='text-xs text-white/30'>
                                                            +
                                                            {item.topics
                                                                .length - 2}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className='px-4 py-3 whitespace-nowrap'>
                                                <StatusBadge
                                                    status={item.status}
                                                />
                                            </td>
                                            <td className='px-4 py-3 whitespace-nowrap'>
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${item.scanned ? 'bg-blue-600/20 text-blue-400 border-blue-600/30' : 'bg-white/5 text-white/40 border-white/10'}`}
                                                >
                                                    {item.scanned
                                                        ? 'Yes'
                                                        : 'No'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {data.length === 0 && (
                            <div className='text-center py-12'>
                                <Users className='h-10 w-10 text-white/20 mx-auto mb-3' />
                                <p className='text-white/60'>
                                    No audience data found
                                </p>
                            </div>
                        )}
                    </div>

                    <div className='mt-4 text-sm text-white/40'>
                        Showing {data.length} registrant
                        {data.length !== 1 ? 's' : ''}
                    </div>
                </>
            )}
        </div>
    );
}
