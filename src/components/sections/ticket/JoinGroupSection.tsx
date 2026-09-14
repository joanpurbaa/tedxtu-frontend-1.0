'use client';

import { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { GROUP_INVITE_LINK } from '@/lib/group';

export default function JoinGroupSection({
    token,
    initialJoined,
}: {
    token: string;
    initialJoined: boolean;
}) {
    const [joined, setJoined] = useState(initialJoined);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const confirmJoin = async () => {
        setLoading(true);
        setError(false);
        try {
            const res = await fetch('/api/tickets/join', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token }),
            });
            const data = await res.json();
            if (res.ok && data.joinedGroup) {
                setJoined(true);
            } else {
                setError(true);
            }
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className='w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 text-center'>
            <h2 className='text-lg font-bold text-white'>Join Grup Peserta</h2>
            <p className='mt-2 text-sm leading-relaxed text-white/70'>
                Klik tombol di bawah untuk bergabung ke grup WhatsApp peserta
                TEDx, lalu kembali ke halaman ini dan konfirmasi.
            </p>
            <a
                href={GROUP_INVITE_LINK}
                target='_blank'
                rel='noopener noreferrer'
                className='mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-black transition hover:brightness-110'
            >
                Join Grup WhatsApp
            </a>
            {joined ? (
                <div className='mt-4 inline-flex items-center gap-1.5 rounded-lg border border-green-600/30 bg-green-600/20 px-4 py-2 text-sm font-medium text-green-400'>
                    <Check className='h-4 w-4' />
                    Sudah join grup
                </div>
            ) : (
                <button
                    onClick={confirmJoin}
                    disabled={loading}
                    className='mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50'
                >
                    {loading && <Loader2 className='h-4 w-4 animate-spin' />}
                    Saya sudah join grup
                </button>
            )}
            {error && (
                <p className='mt-3 text-xs text-red-400'>
                    Gagal menyimpan konfirmasi, coba lagi.
                </p>
            )}
        </section>
    );
}