'use client';

import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Footer from '@/components/Footer';
import BackToTopButton from '@/components/BackToTopButton';

const merch = [
    { name: 'T-Shirt', price: 100000, img: '/merch/tshirt.png' },
    { name: 'Shirt 2026', price: 100000, img: '/merch/shirt-2026.png' },
    { name: 'Baseball Cap', price: 100000, img: '/merch/baseballCap.png' },
    { name: 'Hat 2026', price: 100000, img: '/merch/hat-2026.png' },
    { name: 'Keychain', price: 100000, img: '/merch/keychain.png' },
    { name: 'Keychain 2026', price: 100000, img: '/merch/keychain-2026.png' },
    { name: 'Lanyard 2026', price: 100000, img: '/merch/lanyard-2026.png' },
    { name: 'Hand Fan', price: 100000, img: '/merch/handfan.png' },
    { name: 'Sticker Pack', price: 100000, img: '/merch/stickerPack.png' },
    { name: 'Bobbins Kit', price: 100000, img: '/merch/bobbinskit.png' },
    { name: 'Fabric Kit', price: 100000, img: '/merch/fabricKit.png' },
    { name: 'Stitches Kit', price: 100000, img: '/merch/stitchesKit.png' },
    { name: 'Tapestry Kit', price: 100000, img: '/merch/tapestryKit.png' },
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

                <section className='relative z-20 w-full min-h-[100dvh] flex items-center justify-center overflow-hidden bg-transparent px-4 sm:px-6'>
                    {/* Top-left: Mask */}
                    <div className='hidden lg:block absolute top-8 lg:top-12 left-6 lg:left-10 z-10'>
                        <Image
                            src='/about/mask.webp'
                            alt='Mask decoration'
                            width={80}
                            height={80}
                            priority
                            quality={100}
                            className='w-16 lg:w-20 h-auto'
                        />
                    </div>
                    
                    {/* Top-right: Trumpet */}
                    <div className='hidden lg:block absolute top-8 lg:top-12 right-6 lg:right-10 z-10'>
                        <Image
                            src='/about/trumpet.webp'
                            alt='Trumpet decoration'
                            width={80}
                            height={80}
                            priority
                            quality={100}
                            className='w-16 lg:w-20 h-auto'
                        />
                    </div>
                    
                    {/* Bottom-left: Turn table */}
                    <div className='hidden lg:block absolute bottom-8 lg:bottom-12 left-6 lg:left-10 z-10'>
                        <Image
                            src='/about/turn-table.webp'
                            alt='Turn table decoration'
                            width={80}
                            height={80}
                            priority
                            quality={100}
                            className='w-16 lg:w-20 h-auto'
                        />
                    </div>
                    
                    {/* Bottom-right: Crown */}
                    <div className='hidden lg:block absolute bottom-8 lg:bottom-12 right-6 lg:right-10 z-10'>
                        <Image
                            src='/about/crown.webp'
                            alt='Crown decoration'
                            width={80}
                            height={80}
                            priority
                            quality={100}
                            className='w-16 lg:w-20 h-auto'
                            style={{ transform: 'rotate(20deg)' }}
                        />
                    </div>

                    <div className='relative z-10 text-center w-full max-w-4xl mx-auto'>
                        <div className='flex flex-col items-center justify-center gap-3 sm:gap-4'>
                            {/* Title with Music Note */}
                            <div className='flex items-center justify-center gap-2 sm:gap-3 md:gap-4 flex-wrap'>
                                <span className='font-westmeath text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-white font-bold'>
                                    OUR
                                </span>
                                <Image
                                    src='/about/music-note.webp'
                                    alt='Music note'
                                    width={24}
                                    height={24}
                                    priority
                                    quality={100}
                                    className='w-6 sm:w-7 md:w-8 h-auto'
                                    style={{ transform: 'rotate(18deg)' }}
                                />
                                <span className='font-westmeath text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-white font-bold'>
                                    MERCHANDISE
                                </span>
                            </div>
                            
                            {/* Description */}
                            <p className='font-raleway text-sm sm:text-base md:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto mt-2 sm:mt-3 md:mt-5'>
                                Take a piece of the symphony home with you.
                                TEDxTelkom University merchandise is more than just
                                a souvenir — it's a statement. Wear the story, carry
                                the idea.
                            </p>
                        </div>
                    </div>
                </section>

                <section className='relative z-10 w-full bg-transparent text-white px-4 sm:px-6 md:px-14 py-20'>
                    {/* <div className='pointer-events-none absolute right-0 top-1/2 z-0 -translate-y-1/2 translate-x-[55%]'>
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
                    </div> */}

                    <div className='mx-auto relative z-10'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-y-16 place-items-center'>
                            {merch.map((item, index) => (
                                <div
                                    key={index}
                                    className='flex flex-col items-start w-60'
                                >
                                    <div className='relative w-60 h-60 flex justify-center items-center rounded-3xl overflow-hidden mb-3'>
                                        <Image
                                            src={item.img}
                                            alt={item.name}
                                            fill
                                            quality={100}
                                            className='object-cover object-center'
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
                                            Rp
                                            {item.price.toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='pointer-events-none absolute -left-[450] bottom-0 z-[5] overflow-hidden blur-md'>
                        <Image
                            src='/about/Mist.webp'
                            alt='Mist decoration'
                            width={1200}
                            height={800}
                            priority={false}
                            quality={100}
                            className='w-[85vw] max-w-[1020px] h-auto'
                        />
                    </div>
                    <div className='pointer-events-none absolute -right-[350px] bottom-0 z-[5] overflow-hidden blur-md'>
                        <Image
                            src='/about/Mist.webp'
                            alt='Mist decoration'
                            width={1200}
                            height={800}
                            priority={false}
                            quality={100}
                            className='w-[85vw] max-w-[1020px] h-auto'
                        />
                    </div>
                </section>
            </main>
            <Footer />
            <BackToTopButton />
        </section>
    );
}
