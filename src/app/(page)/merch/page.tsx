'use client';

import Navbar from '@/components/layout/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';
import BackToTopButton from '@/components/ui/backToTopButton';
import { motion } from 'framer-motion';

const merch = [
    { id: 'cap', name: 'Cap', price: 60000, img: '/merch/cap/Cap Mockup-Maroon.png' },
    { id: 'keychain', name: 'Keychain', price: 10000, img: '/merch/keychain/tedxlogo.png' },
    { id: 'enamel', name: 'Enamel Pin', price: 20000, img: '/merch/enamel/enamel1.png' },
    {
        id: 'notebook',
        name: 'Notebook',
        price: 23000,
        img: '/merch/notebook/Notebook Tampak Depan.png',
    },
    {
        id: 'totebag',
        name: 'Totebag',
        price: 30000,
        img: '/merch/totebag/Tote Bag Mockup-Black-Variant 1.png',
    },
    {
        id: 'tshirt',
        name: 'T-Shirt',
        price: 85000,
        img: '/merch/Tshirt/Tshirt-Mockup-White-Variant1.png',
    },
];

export default function Merch() {
    return (
        <section className='merchBackground'>
            <div
                className='fixed inset-0 -z-10'
                style={{
                    backgroundImage: "url('/Ticket%20section.png')",
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <div className='fixed inset-0 -z-10 bg-black/55' />
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
                            quality={75}
                            className='w-full h-auto'
                        />
                    </div>

                    <motion.div
                        className='absolute z-10'
                        style={{ top: '20%', left: '15%' }}
                        initial={{ opacity: 0, scale: 0.7, rotate: -12 }}
                        animate={{ opacity: 1, scale: 1, rotate: [0, -5, 0] }}
                        transition={{ opacity: { duration: 0.5 }, scale: { duration: 0.6 }, rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
                    >
                        <Image
                            src='/about/mask.webp'
                            alt='Mask decoration'
                            width={100}
                            height={100}
                            priority
                            quality={75}
                            className='w-[44px] sm:w-[60px] md:w-[72px] lg:w-[90px] xl:w-[100px] h-auto'
                        />
                    </motion.div>

                    <motion.div
                        className='absolute z-10'
                        style={{ top: '20%', right: '15%' }}
                        initial={{ opacity: 0, scale: 0.7, rotate: 12 }}
                        animate={{ opacity: 1, scale: 1, rotate: [0, 5, 0] }}
                        transition={{ opacity: { duration: 0.5, delay: 0.1 }, scale: { duration: 0.6, delay: 0.1 }, rotate: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' } }}
                    >
                        <Image
                            src='/about/trumpet.webp'
                            alt='Trumpet decoration'
                            width={100}
                            height={100}
                            priority
                            quality={75}
                            className='w-[44px] sm:w-[60px] md:w-[72px] lg:w-[90px] xl:w-[100px] h-auto'
                        />
                    </motion.div>

                    <motion.div
                        className='absolute z-10'
                        style={{ bottom: '20%', left: '15%' }}
                        initial={{ opacity: 0, scale: 0.7, rotate: -12 }}
                        animate={{ opacity: 1, scale: 1, y: [0, -10, 0], rotate: [0, -8, 0] }}
                        transition={{ opacity: { duration: 0.5, delay: 0.2 }, scale: { duration: 0.6, delay: 0.2 }, y: { duration: 3.8, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
                    >
                        <Image
                            src='/about/gramophone.svg'
                            alt='Turn table decoration'
                            width={100}
                            height={100}
                            priority
                            quality={75}
                            className='w-[44px] sm:w-[60px] md:w-[72px] lg:w-[90px] xl:w-[100px] h-auto'
                        />
                    </motion.div>

                    <motion.div
                        className='absolute z-10'
                        style={{ bottom: '20%', right: '15%' }}
                        initial={{ opacity: 0, scale: 0.7, rotate: 12 }}
                        animate={{ opacity: 1, scale: 1, y: [0, -8, 0], rotate: [20, 28, 20] }}
                        transition={{ opacity: { duration: 0.5, delay: 0.3 }, scale: { duration: 0.6, delay: 0.3 }, y: { duration: 4.2, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' } }}
                    >
                        <Image
                            src='/about/crown.webp'
                            alt='Crown decoration'
                            width={100}
                            height={100}
                            priority
                            quality={75}
                            className='w-[44px] sm:w-[60px] md:w-[72px] lg:w-[90px] xl:w-[100px] h-auto'
                            style={{ transform: 'rotate(20deg)' }}
                        />
                    </motion.div>

                    <motion.div
                        className='relative z-10 text-center w-full max-w-5xl mx-auto px-4'
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
                    >
                        <div className='flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4'>
                            <motion.span
                                className='font-westmeath text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-tight'
                                animate={{ y: [0, -4, 0] }}
                                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                OUR
                            </motion.span>
                            <Image
                                src='/about/music-note.webp'
                                alt='Music note'
                                width={32}
                                height={32}
                                priority
                                quality={75}
                                className='w-7 sm:w-8 md:w-9 h-auto'
                                style={{ transform: 'rotate(18deg)' }}
                            />
                            <motion.span
                                className='font-westmeath text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-tight'
                                animate={{ y: [0, 4, 0] }}
                                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                            >
                                MERCHANDISE
                            </motion.span>
                        </div>

                        <p className='font-raleway text-sm sm:text-base md:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto mt-4 sm:mt-5 md:mt-6'>
                            Take a piece of the symphony home with you.
                            TEDxTelkom University merchandise is more than just
                            a souvenir — it&apos;s a statement. Wear the story,
                            carry the idea.
                        </p>
                    </motion.div>
                </section>

                <section className='relative z-10 w-full bg-transparent text-white px-4 sm:px-8 md:px-12 lg:px-16 pb-32 pt-4'>
                    <div className='pointer-events-none absolute left-0 bottom-0 z-[5] overflow-hidden blur-md -translate-x-1/3'>
                        <Image
                            src='/about/Mist.svg'
                            alt='Mist decoration'
                            width={1200}
                            height={800}
                            priority={false}
                        />
                    </div>
                    <div className='pointer-events-none absolute right-0 bottom-0 z-[5] overflow-hidden blur-md translate-x-1/3'>
                        <Image
                            src='/about/Mist.svg'
                            alt='Mist decoration'
                            width={1200}
                            height={800}
                            priority={false}
                            quality={75}
                            className='w-[60vw] max-w-[800px] h-auto'
                        />
                    </div>

                    <div className='relative z-10 w-full max-w-6xl mx-auto'>
                        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8'>
                            {merch.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 24, scale: 0.96 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.45, delay: (index % 4) * 0.08, ease: 'easeOut' }}
                                    whileHover={{ y: -8, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
                                    whileTap={{ scale: 0.97 }}
                                    className='w-full'
                                >
                                    <Link
                                        href={`/merch/detail?product=${item.id}`}
                                        className='flex flex-col items-start w-full group cursor-pointer'
                                    >
                                        <div className='relative mx-auto mb-2 h-44 w-full max-w-[240px] flex items-center justify-center sm:h-52 md:h-60'>
                                            <Image
                                                src={item.img}
                                                alt={item.name}
                                                fill
                                                quality={90}
                                                className='object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300'
                                                style={{ mixBlendMode: 'multiply' }}
                                            />
                                        </div>

                                        <div className='text-left px-1'>
                                            <h3 className='font-westmeath text-sm sm:text-base md:text-lg text-white font-bold leading-snug group-hover:text-[#FFB41E] transition-colors duration-300'>
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
                                </motion.div>
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
