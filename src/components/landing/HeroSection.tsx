"use client"
import Link from 'next/link';
import Image from 'next/image';

export function HeroSection() {
    return (
        <main id='hero' className='relative w-full min-h-[100dvh] flex flex-col items-center justify-center bg-black overflow-hidden'>
            {/* Fullscreen background */}
            <div className='absolute inset-0 z-0'>
                <Image
                    src='/about/tedx-background.webp'
                    alt='Hero background'
                    fill
                    className='object-cover'
                    priority
                />
                
                {/* BOTTOM VIGNETTE / GRADIENT OVERLAY */}
                {/* 
                  - h-1/3: Mengatur seberapa tinggi gradasinya (33% dari bawah).
                  - from-black: Dimulai dengan hitam pekat di paling bawah.
                  - to-transparent: Menjadi transparan ke arah atas.
                */}
                <div className='absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent' />
            </div>

            {/* Decorative elements - Top left */}
            <div className='absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 z-10'>
                <Image
                    src='/about/mask.webp'
                    alt='Mask decoration'
                    width={120}
                    height={120}
                    priority
                    quality={100}
                />
            </div>

            {/* Decorative elements - Top right */}
            <div className='absolute top-1/4 right-1/4 translate-x-1/2 -translate-y-1/2 z-10'>
                <Image
                    src='/about/trumpet.webp'
                    alt='Trumpet decoration'
                    width={120}
                    height={120}
                    priority
                    quality={100}
                />
            </div>

            {/* Decorative elements - Bottom left */}
            <div className='absolute bottom-1/4 left-1/4 -translate-x-1/2 translate-y-1/2 z-10'>
                <Image
                    src='/about/turn-table.webp'
                    alt='Turn table decoration'
                    width={120}
                    height={120}
                    priority
                    quality={100}
                />
            </div>

            {/* Decorative elements - Bottom right */}
            <div className='absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 z-10'>
                <Image
                    src='/about/crown.webp'
                    alt='Crown decoration'
                    width={120}
                    height={120}
                    priority
                    quality={100}
                />
            </div>

            {/* Content */}
            <div className='relative z-20 flex flex-col items-center justify-center gap-8'>
                {/* Heading */}
                <h1 className='text-center'>
                    <div className='flex items-center justify-center gap-4 flex-wrap'>
                        <span className='font-westmeath text-5xl md:text-6xl lg:text-7xl text-white font-normal'>
                            Tailoring
                        </span>
                        <Image
                            src='/about/music-note.webp'
                            alt='Music note'
                            width={30}
                            height={30}
                            priority
                            quality={100}
                        />
                        <span className='font-westmeath text-5xl md:text-6xl lg:text-7xl text-white font-normal'>
                            your
                        </span>
                    </div>
                    <div className='flex items-center justify-center gap-4 flex-wrap mt-2'>
                        <span className='font-westmeath text-5xl md:text-6xl lg:text-7xl text-white font-normal'>
                            own
                        </span>
                        <Image
                            src='/about/single-golden-note.png'
                            alt='Golden note'
                            width={30}
                            height={30}
                            priority
                            quality={100}
                        />
                        <span className='font-westmeath text-5xl md:text-6xl lg:text-7xl text-white font-normal'>
                            tapestry
                        </span>
                    </div>
                </h1>

                {/* Tagline */}
                <p className='text-sm sm:text-base md:text-lg lg:text-xl font-raleway italic font-medium text-white/80 px-4 max-w-2xl text-center'>
                    Every thread has a story. What tapestry do you want to weave?
                </p>

                {/* Buttons */}
                <div className='flex flex-col sm:flex-row justify-center gap-6 px-4 mt-4'>
                    <Link href="/event">
                        <button className='relative overflow-hidden'>
                            <Image
                                src='/about/get-ticket-button.png'
                                alt='Get your ticket now'
                                width={243}
                                height={47}
                                quality={100}
                                priority
                            />
                            <span className='absolute inset-0 grid place-items-center font-westmeath leading-none text-white font-normal text-sm md:text-lg -translate-y-[1px]'>
                                Get your ticket now
                            </span>
                        </button>
                    </Link>
                    <Link href="/merch">
                        <button className='relative overflow-hidden'>
                            <Image
                                src='/about/merch-button.png'
                                alt='Our merch'
                                width={169}
                                height={47}
                                quality={100}
                                priority
                            />
                            <span className='absolute inset-0 grid place-items-center font-westmeath leading-none text-white font-normal text-sm md:text-lg -translate-y-[1px]'>
                                Our merch
                            </span>
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    );
}