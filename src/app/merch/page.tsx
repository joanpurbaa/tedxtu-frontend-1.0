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
            <main className='relative overflow-x-hidden overflow-y-clip'>
                <div className='pointer-events-none absolute left-1/2 top-[45vh] z-0 -translate-x-1/2 -translate-y-1/2'>
                    <div className='w-[100vw] max-w-none'>
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
                </div>

                <section className='relative z-20 w-full min-h-[100dvh] flex items-center justify-center overflow-visible bg-transparent'>
                    <div className='absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2'>
                        <Image
                            src='/about/mask.webp'
                            alt='Mask decoration'
                            width={120}
                            height={120}
                            priority
                            quality={100}
                        />
                    </div>
                    <div className='absolute top-1/4 right-1/4 translate-x-1/2 -translate-y-1/2'>
                        <Image
                            src='/about/trumpet.webp'
                            alt='Trumpet decoration'
                            width={120}
                            height={120}
                            priority
                            quality={100}
                        />
                    </div>
                    <div className='absolute bottom-1/4 left-1/4 -translate-x-1/2 translate-y-1/2'>
                        <Image
                            src='/about/turn-table.webp'
                            alt='Turn table decoration'
                            width={120}
                            height={120}
                            priority
                            quality={100}
                        />
                    </div>
                    <div
                        className='absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2'
                        style={{
                            transform:
                                'translateX(50%) translateY(50%) rotate(20deg)',
                        }}
                    >
                        <Image
                            src='/about/crown.webp'
                            alt='Crown decoration'
                            width={120}
                            height={120}
                            priority
                            quality={100}
                        />
                    </div>

                    <div className='relative z-10 text-center'>
                        <div className='relative z-10 text-center'>
                            <div className='flex items-center justify-center gap-8'>
                                <span className='font-westmeath text-6xl md:text-7xl text-white font-bold'>
                                    OUR
                                </span>
                                <Image
                                    src='/about/music-note.webp'
                                    alt='Music note'
                                    width={30}
                                    height={30}
                                    priority
                                    quality={100}
                                    style={{ transform: 'rotate(18deg)' }}
                                />
                                <span className='font-westmeath text-6xl md:text-7xl text-white font-bold'>
                                    MERCHANDISE
                                </span>
                            </div>
                        </div>
                        <p className='font-raleway text-lg md:text-xl text-white/80 max-w-2xl mx-auto mt-5'>
                            Take a piece of the symphony home with you.
                            TEDxTelkom University merchandise is more than just
                            a souvenir — it's a statement. Wear the story, carry
                            the idea.
                        </p>
                    </div>
                </section>

                <section className='relative z-10 w-full bg-transparent text-white px-4 sm:px-6 md:px-8 lg:px-14 py-20'>
                    <div className='max-w-7xl mx-auto relative z-10'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
                            {merch.map((item, index) => (
                                <Link
                                    key={index}
                                    href='/merch/detail'
                                    className='group'
                                >
                                    <div
                                        className='flex flex-col items-center bg-[#7e5d5d31] px-5 py-5 rounded-xl border border-[#FFB41E] 
                                        backdrop-blur-xs hover:bg-[#7e5d5d50] transition-all duration-300 cursor-pointer 
                                        hover:border-[#FFB41E] hover:shadow-lg hover:shadow-[#FFB41E]/20 h-full'
                                    >
                                        <div className='relative w-60 h-60 flex justify-center items-center rounded-3xl overflow-hidden mb-3 bg-black/20'>
                                            <Image
                                                src={item.img}
                                                alt={item.name}
                                                fill
                                                quality={100}
                                                className='object-cover object-center group-hover:scale-105 transition-transform duration-300'
                                            />
                                        </div>
                                        <div className='text-center'>
                                            <h3 className='font-westmeath text-2xl text-white group-hover:text-[#FFB41E] transition-colors duration-300'>
                                                {item.name}
                                            </h3>
                                            <p
                                                className='font-westmeath text-xl mt-2 group-hover:text-[#FF6B35] transition-colors duration-300'
                                                style={{ color: '#DCA23E' }}
                                            >
                                                Rp
                                                {item.price.toLocaleString('id-ID')}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className='pointer-events-none absolute -left-[300px] md:-left-[200px] bottom-0 z-[5] overflow-hidden blur-md'>
                        <Image
                            src='/about/Mist.webp'
                            alt='Mist decoration'
                            width={1200}
                            height={800}
                            priority={false}
                            quality={100}
                            className='w-[70vw] md:w-[60vw] h-auto'
                        />
                    </div>
                    <div className='pointer-events-none absolute -right-[300px] md:-right-[200px] bottom-0 z-[5] overflow-hidden blur-md'>
                        <Image
                            src='/about/Mist.webp'
                            alt='Mist decoration'
                            width={1200}
                            height={800}
                            priority={false}
                            quality={100}
                            className='w-[70vw] md:w-[60vw] h-auto'
                        />
                    </div>
                </section>
            </main>
            <Footer />
            <BackToTopButton />
        </section>
    );
}
