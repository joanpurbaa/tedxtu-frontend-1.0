'use client';

import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Footer from '@/components/Footer';
import BackToTopButton from '@/components/BackToTopButton';

const merch = Array.from({ length: 10 }, (_, i) => ({
    name: 'Merch Name',
    price: 'Rp100.000',
}));

export default function Merch() {
    return (
        <>
            <Navbar />

            <main className='relative overflow-x-hidden overflow-y-clip bg-black'>
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
                        <h1 className='font-westmeath text-6xl md:text-7xl text-white font-bold mb-6'>
                            OUR MERCHANDISE
                        </h1>
                        <p className='font-raleway text-lg md:text-xl text-white/80 max-w-2xl mx-auto'>
                            Take a piece of the symphony home with you.
                            TEDxTelkom University merchandise is more than just
                            a souvenir — it's a statement. Wear the story, carry
                            the idea.
                        </p>
                    </div>
                </section>

                <section className='relative z-10 w-full bg-transparent text-white px-4 sm:px-6 md:px-14 py-20'>
                    <div className='pointer-events-none absolute right-0 top-1/2 z-0 -translate-y-1/2 translate-x-[55%]'>
                        <div className='w-[120vw] max-w-none'>
                            <Image
                                src='/about/red-ellipse.webp'
                                alt='Red ellipse decoration'
                                width={2800}
                                height={1500}
                                priority={false}
                                quality={100}
                                className='w-full h-auto'
                            />
                        </div>
                    </div>

                    <div className='max-w-7xl mx-auto relative z-10'>
                        <div className='flex flex-col'>
                            <div className='grid justify-center grid-cols-[repeat(auto-fit,_minmax(256px,_0fr))] gap-x-4 gap-y-12 md:gap-y-16'>
                                {merch.slice(0, 8).map((item, index) => (
                                    <div
                                        key={index}
                                        className='flex flex-col items-start'
                                    >
                                        <div className='relative w-64 h-64 rounded-3xl overflow-hidden mb-3'>
                                            <Image
                                                src='/about/small-yellow-card.webp'
                                                alt={item.name}
                                                fill
                                                quality={100}
                                                className='object-cover object-bottom'
                                            />
                                        </div>

                                        <div className='text-left'>
                                            <h3 className='font-westmeath text-2xl text-white font-bold'>
                                                {item.name}
                                            </h3>
                                            <p
                                                className='font-westmeath text-xl mt-2'
                                                style={{ color: '#DCA23E' }}
                                            >
                                                {item.price}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className='flex justify-center gap-x-4 mt-12 md:mt-16'>
                                {merch.slice(8).map((item, index) => (
                                    <div
                                        key={8 + index}
                                        className='flex flex-col items-start'
                                    >
                                        <div className='relative w-64 h-64 rounded-3xl overflow-hidden mb-3'>
                                            <Image
                                                src='/about/small-yellow-card.webp'
                                                alt={item.name}
                                                fill
                                                quality={100}
                                                className='object-cover object-bottom'
                                            />
                                        </div>

                                        <div className='text-left'>
                                            <h3 className='font-westmeath text-2xl text-white font-bold'>
                                                {item.name}
                                            </h3>
                                            <p
                                                className='font-westmeath text-xl mt-2'
                                                style={{ color: '#DCA23E' }}
                                            >
                                                {item.price}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
            <BackToTopButton />
        </>
    );
}
