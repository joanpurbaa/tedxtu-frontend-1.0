'use client';

import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';
import BackToTopButton from '@/components/BackToTopButton';

const merch = [
    { name: 'T-Shirt', price: 100000, img: '/merch/tshirt.webp' },
    { name: 'Shirt 2026', price: 100000, img: '/merch/shirt-2026.webp' },
    { name: 'Baseball Cap', price: 100000, img: '/merch/baseballCap.webp' },
    { name: 'Hat 2026', price: 100000, img: '/merch/hat-2026.webp' },
    { name: 'Keychain', price: 100000, img: '/merch/keychain.webp' },
    { name: 'Keychain 2026', price: 100000, img: '/merch/keychain-2026.webp' },
    { name: 'Lanyard 2026', price: 100000, img: '/merch/lanyard-2026.webp' },
    { name: 'Hand Fan', price: 100000, img: '/merch/handfan.webp' },
    { name: 'Sticker Pack', price: 100000, img: '/merch/stickerPack.webp' },
    { name: 'Bobbins Kit', price: 100000, img: '/merch/bobbinskit.webp' },
    { name: 'Fabric Kit', price: 100000, img: '/merch/fabricKit.webp' },
    { name: 'Stitches Kit', price: 100000, img: '/merch/stitchesKit.webp' },
    { name: 'Tapestry Kit', price: 100000, img: '/merch/tapestryKit.webp' },
];

export default function Merch() {
    return (
        <section className='merchBackground'>
            <Navbar />
            <main className='relative overflow-x-hidden'>
                <section className='relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden bg-transparent px-4 sm:px-6'>
                    <div className='pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 w-full'>
                        <Image
                            src='/about/red-ellipse.webp'
                            alt='Red ellipse decoration'
                            width={2800}
                            height={1500}
                            priority
                            quality={100}
                            className='w-full h-auto'
                        />
                    </div>

                    <div
                        className='absolute z-10'
                        style={{ top: '20%', left: '15%' }}
                    >
                        <Image
                            src='/about/mask.webp'
                            alt='Mask decoration'
                            width={100}
                            height={100}
                            priority
                            quality={100}
                            className='w-[44px] sm:w-[60px] md:w-[72px] lg:w-[90px] xl:w-[100px] h-auto'
                        />
                    </div>

                    <div
                        className='absolute z-10'
                        style={{ top: '20%', right: '15%' }}
                    >
                        <Image
                            src='/about/trumpet.webp'
                            alt='Trumpet decoration'
                            width={100}
                            height={100}
                            priority
                            quality={100}
                            className='w-[44px] sm:w-[60px] md:w-[72px] lg:w-[90px] xl:w-[100px] h-auto'
                        />
                    </div>

                    <div
                        className='absolute z-10'
                        style={{ bottom: '20%', left: '15%' }}
                    >
                        <Image
                            src='/about/turn-table.webp'
                            alt='Turn table decoration'
                            width={100}
                            height={100}
                            priority
                            quality={100}
                            className='w-[44px] sm:w-[60px] md:w-[72px] lg:w-[90px] xl:w-[100px] h-auto'
                        />
                    </div>

                    <div
                        className='absolute z-10'
                        style={{ bottom: '20%', right: '15%' }}
                    >
                        <Image
                            src='/about/crown.webp'
                            alt='Crown decoration'
                            width={100}
                            height={100}
                            priority
                            quality={100}
                            className='w-[44px] sm:w-[60px] md:w-[72px] lg:w-[90px] xl:w-[100px] h-auto'
                            style={{ transform: 'rotate(20deg)' }}
                        />
                    </div>

                    <div className='relative z-10 text-center w-full max-w-5xl mx-auto px-4'>
                        <div className='flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4'>
                            <span className='font-westmeath text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-tight'>
                                OUR
                            </span>
                            <Image
                                src='/about/music-note.webp'
                                alt='Music note'
                                width={32}
                                height={32}
                                priority
                                quality={100}
                                className='w-7 sm:w-8 md:w-9 h-auto'
                                style={{ transform: 'rotate(18deg)' }}
                            />
                            <span className='font-westmeath text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-tight'>
                                MERCHANDISE
                            </span>
                        </div>

                        <p className='font-raleway text-sm sm:text-base md:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto mt-4 sm:mt-5 md:mt-6'>
                            Take a piece of the symphony home with you.
                            TEDxTelkom University merchandise is more than just
                            a souvenir — it&apos;s a statement. Wear the story,
                            carry the idea.
                        </p>
                    </div>
                </section>

                <section className='relative z-10 w-full bg-transparent text-white px-4 sm:px-8 md:px-12 lg:px-16 pb-32 pt-4'>
                    <div className='pointer-events-none absolute left-0 bottom-0 z-[5] overflow-hidden blur-md -translate-x-1/3'>
                        <Image
                            src='/about/Mist.webp'
                            alt='Mist decoration'
                            width={1200}
                            height={800}
                            priority={false}
                        />
                    </div>
                    <div className='pointer-events-none absolute right-0 bottom-0 z-[5] overflow-hidden blur-md translate-x-1/3'>
                        <Image
                            src='/about/Mist.webp'
                            alt='Mist decoration'
                            width={1200}
                            height={800}
                            priority={false}
                            quality={100}
                            className='w-[60vw] max-w-[800px] h-auto'
                        />
                    </div>

                    <div className='relative z-10 w-full max-w-6xl mx-auto'>
                        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8'>
                            {merch.map((item, index) => (
                                <Link
                                    key={index}
                                    className='flex flex-col items-start w-full'
                                    href={''}
                                >
                                    <div className='relative w-full aspect-square flex justify-center items-center mb-2'>
                                        <Image
                                            src={item.img}
                                            alt={item.name}
                                            fill
                                            quality={90}
                                            className='object-contain object-center'
                                            style={{ mixBlendMode: 'multiply' }}
                                        />
                                    </div>

                                    <div className='text-left px-1'>
                                        <h3 className='font-westmeath text-sm sm:text-base md:text-lg text-white font-bold leading-snug'>
                                            {item.name}
                                        </h3>
                                        <p
                                            className='font-westmeath text-xs sm:text-sm md:text-base mt-0.5'
                                            style={{ color: '#DCA23E' }}
                                        >
                                            Rp
                                            {item.price.toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
            <BackToTopButton />
        </section>
    );
}
