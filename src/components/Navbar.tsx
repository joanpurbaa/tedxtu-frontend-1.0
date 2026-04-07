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

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={cn(
            'fixed top-0 left-0 right-0 z-50 flex h-20 w-full shrink-0 items-center px-4 md:px-14 transition-all duration-300',
            isScrolled ? 'bg-black/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        )}>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant='outline' size='icon' className='lg:hidden'>
                        <MenuIcon className='h-6 w-6' />
                        <span className='sr-only'>Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side='left' className='bg-black border-gray-800'>
                    <SheetTitle className='text-white'>Navigation</SheetTitle>
                    <div className='flex flex-col items-start gap-6 py-6'>
                        <Link href='/' className='flex items-center gap-2' prefetch={false}>
                            <Image
                                src='/logo.png'
                                alt='TEDxTelkom University logo'
                                width={120}
                                height={30}
                                quality={100}
                            />
                        </Link>
                        <Link href='/' className='w-full py-2 text-lg font-semibold text-white hover:text-red-500 transition-colors'>Home</Link>
                        <Link href='/about' className='w-full py-2 text-lg font-semibold text-white hover:text-red-500 transition-colors'>About Us</Link>
                        <Link href='/event' className='w-full py-2 text-lg font-semibold text-white hover:text-red-500 transition-colors' prefetch={false}>Event</Link>
                        <Link href='/recruitment' className='w-full py-2 text-lg font-semibold text-white hover:text-red-500 transition-colors' prefetch={false}>Recruitment</Link>
                        <Link href='/merch' className='w-full py-2 text-lg font-semibold text-white hover:text-red-500 transition-colors' prefetch={false}>Merch</Link>
                    </div>
                </SheetContent>
            </Sheet>
            <Link href='/' className='mr-6 hidden lg:flex items-center' prefetch={false}>
                <Image
                    src='/logo.png'
                    alt='TEDxTelkom University logo'
                    width={172}
                    height={43}
                    quality={100}
                />
                <span className='sr-only'>TEDxTelkom University</span>
            </Link>
            <nav className='ml-auto hidden lg:flex gap-6'>
                <Link
                    href={"/"}
                    className='group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-lg font-bold text-white transition-colors hover:text-red-500 focus:text-red-500 focus:outline-none disabled:pointer-events-none disabled:opacity-50'
                >
                    Home
                </Link>
                <Link
                    href={"/about"}
                    className='group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-lg font-bold text-white transition-colors hover:text-red-500 focus:text-red-500 focus:outline-none disabled:pointer-events-none disabled:opacity-50'
                >
                    About Us
                </Link>
                <Link
                    href='/event'
                    className='group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-lg font-bold text-white transition-colors hover:text-red-500 focus:text-red-500 focus:outline-none disabled:pointer-events-none disabled:opacity-50'
                    prefetch={false}
                >
                    Event
                </Link>
                <Link
                    href='/recruitment'
                    className='group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-lg font-bold text-white transition-colors hover:text-red-500 focus:text-red-500 focus:outline-none disabled:pointer-events-none disabled:opacity-50'
                    prefetch={false}
                >
                    Recruitment
                </Link>
                <Link
                    href='/merch'
                    className='group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-lg font-bold text-white transition-colors hover:text-red-500 focus:text-red-500 focus:outline-none disabled:pointer-events-none disabled:opacity-50'
                    prefetch={false}
                >
                    Merch
                </Link>
            </nav>
        </header>
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
