'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export interface TicketTier {
    tier: string;
    price: string;
    badgeText?: string;
    remaining: string;
    releaseDate: Date;
    endDate: Date | null;
    quantity: number;
    features: string[];
}

const SHARED_FEATURES = [
    'Entry ticket',
    'TED Talks experience',
    'Audience kit',
    'Freebies (drink and snack)',
    'Voucher makan 15k',
];

export const ticketsData: TicketTier[] = [
    {
        tier: 'EARLY BIRD',
        price: 'RP 71.900',
        remaining: '60 ticket remaining',
        releaseDate: new Date('2026-09-05T00:00:00Z'),
        endDate: new Date('2026-09-13T00:00:00Z'),
        quantity: 60,
        features: SHARED_FEATURES,
    },
    {
        tier: 'PRE-SALE 1',
        price: 'RP 79.900',
        remaining: '140 ticket remaining',
        releaseDate: new Date('2026-09-14T00:00:00Z'),
        endDate: new Date('2026-09-22T00:00:00Z'),
        quantity: 140,
        features: SHARED_FEATURES,
    },
    {
        tier: 'NORMAL PRICE',
        price: 'RP 84.900',
        remaining: '100 ticket remaining',
        releaseDate: new Date('2026-09-22T00:00:00Z'),
        endDate: null,
        quantity: 100,
        features: SHARED_FEATURES,
    },
];

function isTicketAvailable(tier: TicketTier): boolean {
    const now = new Date();
    if (now < tier.releaseDate) return false;
    if (tier.endDate !== null && now >= tier.endDate) return false;
    return true;
}

function formatOpenDate(date: Date): string {
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];
    return `${date.getUTCDate()} ${months[date.getUTCMonth()]}`;
}

const TicketSelection = () => {
    const [soldCounts, setSoldCounts] = useState<Record<string, number>>({});

    useEffect(() => {
        const fetchAvailability = async () => {
            try {
                const res = await fetch('/api/tickets/availability');
                if (!res.ok) return;
                const data = await res.json();
                setSoldCounts(data.confirmed ?? {});
            } catch {
                // keep previous counts
            }
        };

        fetchAvailability();
        const interval = setInterval(fetchAvailability, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id='ticket' className='relative scroll-mt-36 overflow-hidden bg-[#4d0902] px-4 py-40 sm:px-6 lg:px-8'>
            <Image
                src='/speakers/fabricTexture.webp'
                alt=''
                fill
                sizes='100vw'
                className='object-cover opacity-20 mix-blend-overlay'
            />
            <div className='absolute inset-0 bg-black/20' />
            <div
                className='absolute inset-0'
                style={{
                    backgroundImage:
                        'linear-gradient(to bottom, black 0%, transparent 18%, transparent 82%, black 100%)',
                }}
            />

            <div className='relative mx-auto max-w-7xl'>
                <div className='mx-auto max-w-3xl text-center'>
                    <h2 className='font-westmeath text-3xl uppercase tracking-wide text-white sm:text-4xl lg:text-5xl'>
                        GET YOUR TICKETS
                    </h2>
                    <p className='mt-4 font-raleway text-sm leading-6 text-white/85 sm:text-base'>
                        Secure Your Place in History
                    </p>
                </div>

                <div className='mt-10 mx-auto grid max-w-xl gap-8 sm:max-w-4xl lg:max-w-6xl lg:grid-cols-3'>
                    {ticketsData.map((ticket) => {
                        const available = isTicketAvailable(ticket);
                        const sold = soldCounts[ticket.tier] ?? 0;
                        const remaining = Math.max(0, ticket.quantity - sold);
                        const soldOut = remaining === 0;

                        return (
                            <article
                                key={ticket.tier}
                                className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-amber-400/80 bg-black/40 px-6 py-8 shadow-[0_18px_50px_rgba(0,0,0,0.35)] transition-transform duration-300 ${
                                    available && !soldOut
                                        ? 'hover:-translate-y-1 hover:scale-[1.01]'
                                        : 'opacity-40 grayscale'
                                }`}
                            >
                                <div className='flex justify-center'>
                                    {ticket.badgeText && (
                                        <span className='inline-flex items-center rounded-full bg-amber-400 px-4 py-1 font-raleway text-xs font-bold uppercase tracking-[0.2em] text-[#3b150f] shadow-md'>
                                            {ticket.badgeText}
                                        </span>
                                    )}
                                </div>

                                <div className='mt-4 text-center'>
                                    <h3 className='font-westmeath text-2xl tracking-[0.1em] text-white'>
                                        {ticket.tier}
                                    </h3>
                                    <p className='mt-4 font-westmeath text-4xl text-amber-300 sm:text-5xl'>
                                        {ticket.price}
                                    </p>
                                </div>

                                <ul className='mt-6 flex-1 space-y-3 text-left font-raleway text-sm leading-6 text-white/90'>
                                    {ticket.features.map((feature) => (
                                        <li key={feature} className='flex gap-3'>
                                            <span className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300' />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <p className='mt-6 text-center font-raleway text-sm text-white/60'>
                                    {remaining} tiket tersisa
                                </p>

                                <div className='mt-8'>
                                    <a
                                        href={
                                            available && !soldOut
                                                ? `/ticketing?tier=${encodeURIComponent(ticket.tier)}&price=${encodeURIComponent(ticket.price)}`
                                                : '#'
                                        }
                                        aria-disabled={!available || soldOut}
                                        className={`block w-full rounded-full px-5 py-3 text-center font-westmeath text-sm uppercase tracking-[0.18em] text-white transition duration-300 ${
                                            available && !soldOut
                                                ? 'bg-amber-500 hover:scale-[1.02] hover:bg-amber-400 hover:brightness-110'
                                                : 'pointer-events-auto cursor-not-allowed bg-white/10 group-hover:bg-white/20'
                                        }`}
                                    >
                                        {available
                                            ? soldOut
                                                ? 'SOLD OUT'
                                                : 'RESERVE NOW'
                                            : `OPEN ${formatOpenDate(ticket.releaseDate)}`}
                                    </a>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TicketSelection;
