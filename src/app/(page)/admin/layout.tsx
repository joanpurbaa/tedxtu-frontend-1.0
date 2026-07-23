'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Ticket, QrCode, LogOut, Users } from 'lucide-react';
import Image from 'next/image';
import { Inter } from 'next/font/google';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

const nav = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/audience', label: 'Audience Data', icon: Users },
    { href: '/admin/tiket', label: 'Tickets', icon: Ticket },
    { href: '/admin/scan', label: 'Scan', icon: QrCode },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();

    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    async function handleLogout() {
        await fetch('/api/logout', { method: 'POST' });
        router.replace('/admin/login');
        router.refresh();
    }

    return (
        <div
            className={`${inter.variable} flex min-h-screen bg-[#0a0a0a] text-white font-['Inter']`}
        >
            <aside className='w-64 shrink-0 bg-[#121212] border-r border-white/5 flex flex-col'>
                <div className='p-6 border-b border-white/5'>
                    <Link
                        href='/admin/dashboard'
                        className='flex items-center gap-3'
                    >
                        <Image
                            src='/logo-white.svg'
                            alt='TEDx Logo'
                            width={32}
                            height={32}
                            className='rounded-lg'
                        />
                        <span className='text-lg font-semibold text-white'>
                            TEDx Admin
                        </span>
                    </Link>
                </div>

                <nav className='flex-1 p-4 space-y-1'>
                    {nav.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                                    isActive
                                        ? 'bg-white/10 text-white'
                                        : 'text-white/60 hover:bg-white/5 hover:text-white'
                                }`}
                            >
                                <item.icon
                                    className={`h-5 w-5 ${isActive ? 'text-white' : 'text-white/40'}`}
                                />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className='p-4 border-t border-white/5'>
                    <button
                        onClick={handleLogout}
                        className='flex items-center gap-3 rounded-lg px-4 py-2.5 w-full text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white transition-all'
                    >
                        <LogOut className='h-5 w-5 text-white/40' />
                        Logout
                    </button>
                </div>
            </aside>

            <main className='flex-1 overflow-x-auto bg-[#0a0a0a]'>
                {children}
            </main>
        </div>
    );
}
