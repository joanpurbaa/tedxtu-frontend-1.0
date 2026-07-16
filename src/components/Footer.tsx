'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Linkedin, MapPin, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className='relative w-full bg-black text-white px-4 sm:px-6 md:px-14 py-12 sm:py-16 md:py-20'>
            <div className='max-w-7xl mx-auto'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12'>
                    {/* Logo & Tagline */}
                    <div className='flex flex-col items-start gap-6'>
                        <div className='w-48 h-auto'>
                            <Image
                                src='/logo.webp'
                                alt='TEDxTelkom University logo'
                                width={172}
                                height={43}
                                quality={75}
                                className='w-full h-auto'
                            />
                        </div>
                        <p className='font-raleway text-sm sm:text-base leading-relaxed text-white/90'>
                            Ideas change people<br />
                            People change the world
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className='flex flex-col gap-6'>
                        <h3 className='font-westmeath text-xl sm:text-2xl font-bold'>QUICK LINKS</h3>
                        <nav className='flex flex-col gap-3'>
                            <Link href='/' className='font-raleway text-sm sm:text-base text-white/80 hover:text-red-500 transition-colors'>
                                Home
                            </Link>
                            <Link href='/about' className='font-raleway text-sm sm:text-base text-white/80 hover:text-red-500 transition-colors'>
                                About Us
                            </Link>
                            <Link href='/event' className='font-raleway text-sm sm:text-base text-white/80 hover:text-red-500 transition-colors'>
                                Event
                            </Link>
                            {/* <Link href='/recruitment' className='font-raleway text-sm sm:text-base text-white/80 hover:text-red-500 transition-colors'>
                                Recruitment
                            </Link> */}
                            {/* <Link href='/merch' className='font-raleway text-sm sm:text-base text-white/80 hover:text-red-500 transition-colors'>
                                Merch
                            </Link> */}
                        </nav>
                    </div>

                    {/* Contact */}
                    <div className='flex flex-col gap-6'>
                        <h3 className='font-westmeath text-xl sm:text-2xl font-bold'>CONTACT</h3>
                        <div className='flex flex-col gap-4'>
                            <div className='flex items-start gap-3'>
                                <div className='text-red-500 mt-1 flex-shrink-0'>
                                    <MapPin className='w-5 h-5' />
                                </div>
                                <div className='flex flex-col'>
                                    <p className='font-raleway text-sm sm:text-base text-white/90'>
                                        Telkom University
                                    </p>
                                    <p className='font-raleway text-sm sm:text-base text-white/80'>
                                        Bandung, Indonesia
                                    </p>
                                </div>
                            </div>
                            <a href='mailto:tedxtelkomuniversity@gmail.com' className='flex items-start gap-3 hover:opacity-80 transition-opacity'>
                                <div className='text-red-500 mt-1 flex-shrink-0'>
                                    <Mail className='w-5 h-5' />
                                </div>
                                <p className='font-raleway text-sm sm:text-base text-white/90 break-all'>
                                    tedxtelkomuniversity@gmail.com
                                </p>
                            </a>
                        </div>
                    </div>

                    {/* Follow Us */}
                    <div className='flex flex-col gap-6'>
                        <h3 className='font-westmeath text-xl sm:text-2xl font-bold'>FOLLOW US</h3>
                        <div className='flex gap-4'>
                            <a href='https://www.instagram.com/tedxtelkomuniversity' target='_blank' rel='noopener noreferrer' className='text-white hover:text-red-500 transition-colors'>
                                <Instagram className='w-7 h-7' />
                            </a>
                            <a href='https://www.linkedin.com/company/tedxtelkom-university/' target='_blank' rel='noopener noreferrer' className='text-white hover:text-red-500 transition-colors'>
                                <Linkedin className='w-7 h-7' />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
