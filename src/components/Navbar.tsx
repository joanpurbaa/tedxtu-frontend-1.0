'use client';

import { useState, useEffect } from 'react';
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetTitle,
} from '@/components/ui/sheet';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import useCountdown from '@/hooks/useCountdown';

const EVENT_START_DATE = '2027-01-16T08:00:00+07:00';

type CountdownProps = {
    targetDate?: Date | string;
    className?: string;
};

function formatTime(value: number) {
    return value.toString().padStart(2, '0');
}

export default function Navbar({
    targetDate = EVENT_START_DATE,
    className,
}: CountdownProps) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const { totalHours, minutes, seconds, isFinished } =
        useCountdown(targetDate);

    return (
        <div className='fixed left-0 right-0 top-0 z-50 flex flex-col'>
            <section
                aria-label='Event countdown'
                className={cn(
                    'w-full bg-[url(/countdown-background.png)] bg-cover bg-center bg-no-repeat px-4 py-3 text-center shadow-[0_10px_24px_rgba(0,0,0,0.65)]',
                    className,
                )}
            >
                <p className='relative z-10 font-raleway text-xs font-black uppercase tracking-[0.12em] text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.85)] sm:text-sm md:text-base'>
                    {isFinished ? (
                        'OUR EVENT HAS STARTED! COME TO THE VENUE FOR OTS'
                    ) : (
                        <>
                            <span>WILL BE START IN : </span>
                            <time
                                dateTime={new Date(targetDate).toISOString()}
                                className='text-[#FFB41E]'
                            >
                                {totalHours}H {formatTime(minutes)}M{' '}
                                {formatTime(seconds)}S
                            </time>
                        </>
                    )}
                </p>
            </section>

            <header
                className={cn(
                    'flex h-20 w-full items-center px-4 transition-all duration-300 md:px-14',
                    isScrolled
                        ? 'bg-black/95 backdrop-blur-md shadow-lg'
                        : 'bg-black/70 backdrop-blur-sm',
                )}
            >
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant='outline'
                            size='icon'
                            className='lg:hidden'
                        >
                            <MenuIcon className='h-6 w-6' />
                            <span className='sr-only'>
                                Toggle navigation menu
                            </span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side='left'
                        className='bg-black border-gray-800'
                    >
                        <SheetTitle className='text-white'>
                            Navigation
                        </SheetTitle>
                        <div className='flex flex-col items-start gap-6 py-6'>
                            <Link
                                href='/'
                                className='flex items-center gap-2'
                                prefetch={false}
                            >
                                <Image
                                    src='/logo.webp'
                                    alt='TEDxTelkom University logo'
                                    width={120}
                                    height={30}
                                    quality={100}
                                />
                            </Link>
                            {[
                                '/',
                                '/about',
                                '/event',
                                // '/recruitment',
                                // '/merch',
                            ].map((href, i) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className='w-full py-2 text-lg font-westmeath text-white hover:text-red-500 transition-colors'
                                    prefetch={false}
                                >
                                    {
                                        [
                                            'Home',
                                            'About Us',
                                            'Event',
                                            // 'Recruitment',
                                            // 'Merch',
                                        ][i]
                                    }
                                </Link>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>

                <Link
                    href='/'
                    className='mr-6 hidden lg:flex items-center'
                    prefetch={false}
                >
                    <Image
                        src='/logo.webp'
                        alt='TEDxTelkom University logo'
                        width={172}
                        height={43}
                        quality={100}
                    />
                    <span className='sr-only'>TEDxTelkom University</span>
                </Link>

                <nav className='ml-auto hidden lg:flex gap-6'>
                    {[
                        { href: '/', label: 'Home' },
                        { href: '/about', label: 'About Us' },
                        { href: '/event', label: 'Event' },
                        // { href: '/recruitment', label: 'Recruitment' },
                        // { href: '/merch', label: 'Merch' },
                    ].map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            prefetch={false}
                            className='group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-lg font-westmeath text-white transition-colors hover:text-red-500 focus:text-red-500 focus:outline-none'
                        >
                            {label}
                        </Link>
                    ))}
                </nav>
            </header>
        </div>
    );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
        >
            <line x1='4' x2='20' y1='12' y2='12' />
            <line x1='4' x2='20' y1='6' y2='6' />
            <line x1='4' x2='20' y1='18' y2='18' />
        </svg>
    );
}
