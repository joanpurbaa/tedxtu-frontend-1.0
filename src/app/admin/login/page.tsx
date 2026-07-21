'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Loader2, Lock, User } from 'lucide-react';

export default function AdminLoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => null);
                setError(data?.error ?? 'Login failed');
                return;
            }

            const from = searchParams.get('from');
            router.replace(
                from && from.startsWith('/admin') ? from : '/admin/dashboard',
            );
            router.refresh();
        } catch {
            setError('Something went wrong, please try again');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4 font-['Inter']">
            <div className='w-full max-w-sm rounded-xl border border-white/5 bg-[#121212] p-8'>
                <div className='mb-8 flex flex-col items-center text-center'>
                    <Image
                        src='/logo.webp'
                        alt='TEDx Logo'
                        width={40}
                        height={40}
                        className='mb-4 rounded-lg'
                    />
                    <h1 className='text-lg font-semibold text-white'>
                        TEDx Admin
                    </h1>
                    <p className='mt-1 text-sm text-white/40'>
                        Sign in to continue
                    </p>
                </div>

                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <label className='mb-1.5 block text-sm font-medium text-white/60'>
                            Username
                        </label>
                        <div className='flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3'>
                            <User className='h-4 w-4 text-white/40' />
                            <input
                                type='text'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete='username'
                                required
                                className='w-full bg-transparent py-2.5 text-sm text-white outline-none placeholder:text-white/30'
                                placeholder='admin'
                            />
                        </div>
                    </div>

                    <div>
                        <label className='mb-1.5 block text-sm font-medium text-white/60'>
                            Password
                        </label>
                        <div className='flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3'>
                            <Lock className='h-4 w-4 text-white/40' />
                            <input
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete='current-password'
                                required
                                className='w-full bg-transparent py-2.5 text-sm text-white outline-none placeholder:text-white/30'
                                placeholder='••••••••'
                            />
                        </div>
                    </div>

                    {error && (
                        <p className='text-sm text-red-400'>{error}</p>
                    )}

                    <button
                        type='submit'
                        disabled={loading}
                        className='flex w-full items-center justify-center gap-2 rounded-lg bg-white py-2.5 text-sm font-semibold text-black transition-all hover:bg-white/90 disabled:opacity-60'
                    >
                        {loading && (
                            <Loader2 className='h-4 w-4 animate-spin' />
                        )}
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    );
}
