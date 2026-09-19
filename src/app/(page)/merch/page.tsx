'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Image from 'next/image';
import Footer from '@/components/layout/Footer';
import BackToTopButton from '@/components/ui/backToTopButton';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const products = [
    {
        id: 'cap',
        name: 'Cap',
        price: 60000,
        variations: [
            { label: 'Maroon', img: '/merch/cap/Cap Mockup-Maroon.webp' },
            { label: 'Black', img: '/merch/cap/Cap Mockup-Black.webp' },
            { label: 'White', img: '/merch/cap/Cap Mockup-White.webp' },
        ],
    },
    {
        id: 'keychain',
        name: 'Keychain',
        price: 10000,
        variations: [
            { label: 'TEDx Logo', img: '/merch/keychain/tedxlogo.webp' },
            { label: 'X Design', img: '/merch/keychain/x1.webp' },
        ],
    },
    {
        id: 'enamel',
        name: 'Enamel Pin',
        price: 20000,
        variations: [
            { label: 'Design 1', img: '/merch/enamel/enamel1.webp' },
            { label: 'Design 2', img: '/merch/enamel/enamel2.webp' },
        ],
    },
    {
        id: 'notebook',
        name: 'Notebook',
        price: 23000,
        variations: [
            { label: 'Front', img: '/merch/notebook/Notebook Tampak Depan.webp' },
            { label: 'Back', img: '/merch/notebook/Notebook Tampak Belakang.webp' },
        ],
    },
    {
        id: 'totebag',
        name: 'Totebag',
        price: 30000,
        variations: [
            {
                label: 'Black Variant 1',
                img: '/merch/totebag/Tote Bag Mockup-Black-Variant 1.webp',
            },
            {
                label: 'Black Variant 2',
                img: '/merch/totebag/Tote Bag Mockup-Black-Variant 2.webp',
            },
            {
                label: 'White Variant 1',
                img: '/merch/totebag/Tote Bag Mockup-White-Variant 1.webp',
            },
            {
                label: 'White Variant 2',
                img: '/merch/totebag/Tote Bag Mockup-White-Variant 2.webp',
            },
        ],
    },
    {
        id: 'tshirt',
        name: 'T-Shirt',
        price: 85000,
        variations: [
            { label: 'Black', img: '/merch/Tshirt/Tshirt-Mockup-Black-Variant1.webp' },
            { label: 'Maroon', img: '/merch/Tshirt/Tshirt-Mockup-Maroon-Variant1.webp' },
            { label: 'White', img: '/merch/Tshirt/Tshirt-Mockup-White-Variant1.webp' },
            {
                label: 'White Variant 2',
                img: '/merch/Tshirt/Tshirt-Mockup-White-Variant2.webp',
            },
            {
                label: 'White Maroon Ringer',
                img: '/merch/Tshirt/Tshirt-Mockup-White-Variant2-WithMaroonRinger.webp',
            },
            {
                label: "Men's Design 1",
                img: '/merch/Tshirt/Men T-Shirt Mockup-alt 1.webp',
            },
            {
                label: "Men's Design 2",
                img: '/merch/Tshirt/Men T-Shirt Mockup-alt 2.webp',
            },
        ],
    },
];

const merch = products.flatMap((product) =>
    product.variations
        .filter((_, index) => !(product.id === 'notebook' && index > 0))
        .map((variation) => ({
            id: product.id,
            name: product.name,
            price: product.price,
            variation: variation.label,
            img: variation.img,
        })),
);

const bundling = [
    {
        paket: 'Mini Pack',
        isi: 'Notebook + Sticker Pack + Keychain',
        harga: 'Rp27k',
    },
    {
        paket: 'Daily Pack',
        isi: 'Totebag + Notebook + Sticker Pack + Keychain',
        harga: 'Rp54k',
    },
    {
        paket: 'Style Pack',
        isi: 'Baseball Cap + Sticker Pack + Keychain',
        harga: 'Rp82k',
    },
    {
        paket: 'Casual Pack',
        isi: 'T-Shirt + Sock + Sticker Pack + Keychain',
        harga: 'Rp119k',
    },
    {
        paket: 'Complete Pack',
        isi: 'T-Shirt + Totebag + Enamel Pin + Notebook + Sticker Pack + Keychain',
        harga: 'Rp155k',
    },
];

const BUNDLE_ITEM_PRICES: Record<string, number> = {
    Notebook: 23000,
    Keychain: 10000,
    Totebag: 30000,
    'T-Shirt': 85000,
    'Enamel Pin': 20000,
    'Sticker Pack': 5000,
    'Baseball Cap': 55000,
    Sock: 15000,
};

const parseBundlePrice = (harga: string) => {
    const value = harga.replace(/[^0-9Kk]/g, '');
    const thousands = value.toLowerCase().endsWith('k')
        ? value.slice(0, -1)
        : value;
    return Number(thousands) * 1000;
};

const getBundleSavings = (bundle: (typeof bundling)[number]) => {
    const individualTotal = bundle.isi
        .split(' + ')
        .reduce((sum, item) => sum + (BUNDLE_ITEM_PRICES[item] ?? 0), 0);
    return individualTotal - parseBundlePrice(bundle.harga);
};

const BUNDLE_ITEM_IMAGES: Record<string, string> = {
    Notebook: '/merch/notebook/Notebook Tampak Depan.webp',
    Keychain: '/merch/keychain/tedxlogo.webp',
    Totebag: '/merch/totebag/Tote Bag Mockup-Black-Variant 1.webp',
    'T-Shirt': '/merch/Tshirt/Tshirt-Mockup-White-Variant1.webp',
    'Enamel Pin': '/merch/enamel/enamel1.webp',
    'Baseball Cap': '/merch/baseballCap.webp',
    'Sticker Pack': '/merch/sticker fix.webp',
};

export default function Merch() {
    const [selectedCard, setSelectedCard] = useState<
        (typeof merch)[number] | null
    >(null);
    const [selectedBundle, setSelectedBundle] = useState<
        (typeof bundling)[number] | null
    >(null);

    const closeCardModal = () => setSelectedCard(null);
    const closeBundleModal = () => setSelectedBundle(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeCardModal();
                closeBundleModal();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        document.body.style.overflow =
            selectedCard || selectedBundle ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedCard, selectedBundle]);

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

                        <div className='mt-7 inline-flex flex-wrap items-center justify-center gap-2.5 rounded-full border-2 border-dashed border-[#DCA23E]/70 bg-black/50 px-6 py-2.5'>
                            <Image
                                src='/about/music-note.webp'
                                alt=''
                                width={20}
                                height={20}
                                className='w-4 sm:w-5 h-auto'
                            />
                            <p className='font-westmeath text-sm sm:text-base md:text-lg tracking-wide text-[#DCA23E]'>
                                ONE NIGHT ONLY — AT THE MAIN EVENT
                            </p>
                        </div>
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
                                    <button
                                        onClick={() => setSelectedCard(item)}
                                        className='flex flex-col items-start w-full group cursor-pointer text-left'
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
                                            <p className='font-raleway text-xs sm:text-sm text-white/70 mt-0.5'>
                                                {item.variation}
                                            </p>
                                            <p
                                                className='font-westmeath text-xs sm:text-sm md:text-base mt-0.5'
                                                style={{ color: '#DCA23E' }}
                                            >
                                                Rp
                                                {item.price.toLocaleString('id-ID')}
                                            </p>
                                        </div>
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className='relative z-10 w-full bg-transparent text-white px-4 sm:px-8 md:px-12 lg:px-16 pb-32 pt-8'>
                    <div className='relative z-10 w-full max-w-6xl mx-auto'>
                        <div className='mb-10'>
                            <h2 className='font-westmeath text-3xl sm:text-4xl md:text-5xl text-white font-bold'>
                                MERCH BUNDLING
                            </h2>
                            <p className='font-raleway text-sm sm:text-base text-white/70 mt-3 max-w-2xl'>
                                Mix-and-match packs curated to fit every budget.
                                Get your favorites together for less.
                            </p>
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {bundling.map((item, index) => (
                                <motion.button
                                    key={index}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.45, delay: (index % 3) * 0.08, ease: 'easeOut' }}
                                    whileHover={{ y: -6 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelectedBundle(item)}
                                    className='flex flex-col gap-4 rounded-2xl border border-[#FFB41E]/40 bg-black/40 p-6 hover:border-[#FFB41E]/70 transition-all cursor-pointer text-left'
                                >
                                    <h3 className='font-westmeath text-lg md:text-xl font-bold text-[#FFB41E]'>
                                        {item.paket}
                                    </h3>
                                    <p className='font-raleway text-sm md:text-base text-white/80 leading-relaxed flex-1'>
                                        {item.isi}
                                    </p>
                                    <p className='font-westmeath text-xl md:text-2xl font-bold text-white'>
                                        {item.harga}
                                    </p>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
            <BackToTopButton />

            <AnimatePresence>
                {selectedCard && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCardModal}
                        className='fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-8'
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
                            onClick={(event) => event.stopPropagation()}
                            className='relative w-full max-w-3xl rounded-2xl border border-[#FFB41E]/40 bg-[#2a0a08] overflow-hidden shadow-[0_0_40px_rgba(255,180,30,0.25)]'
                        >
                            <div className='flex items-center justify-between gap-4 px-6 py-4 border-b border-[#FFB41E]/30'>
                                <div>
                                    <h2 className='font-westmeath text-xl sm:text-2xl text-white font-bold uppercase tracking-wide'>
                                        {selectedCard.name}
                                    </h2>
                                    <p className='font-raleway text-xs sm:text-sm text-white/70 mt-0.5'>
                                        {selectedCard.variation}
                                    </p>
                                </div>
                                <div className='flex items-center gap-4 shrink-0'>
                                    <span className='font-westmeath text-lg sm:text-xl font-bold text-[#FFB41E]'>
                                        Rp
                                        {selectedCard.price.toLocaleString(
                                            'id-ID',
                                        )}
                                    </span>
                                    <button
                                        onClick={closeCardModal}
                                        aria-label='Close'
                                        className='text-white/80 hover:text-[#FFB41E] transition-colors bg-black/40 rounded-full p-2'
                                    >
                                        <X size={24} strokeWidth={2.5} />
                                    </button>
                                </div>
                            </div>

                            <div className='relative h-[50vh] flex items-center justify-center bg-black/40'>
                                <Image
                                    src={selectedCard.img}
                                    alt={`${selectedCard.name} - ${selectedCard.variation}`}
                                    fill
                                    quality={90}
                                    className='object-contain p-6'
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {selectedBundle && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeBundleModal}
                        className='fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-8'
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
                            onClick={(event) => event.stopPropagation()}
                            className='relative w-full max-w-2xl rounded-2xl border border-[#FFB41E]/40 bg-[#2a0a08] overflow-hidden shadow-[0_0_40px_rgba(255,180,30,0.25)]'
                        >
                            <div className='flex items-center justify-between gap-4 px-6 py-4 border-b border-[#FFB41E]/30'>
                                <div>
                                    <h2 className='font-westmeath text-xl sm:text-2xl text-white font-bold uppercase tracking-wide'>
                                        {selectedBundle.paket}
                                    </h2>
                                    <p className='font-raleway text-xs sm:text-sm text-white/70 mt-0.5'>
                                        What&apos;s inside this bundle
                                    </p>
                                </div>
                                <div className='flex items-center gap-4 shrink-0'>
                                    <span className='font-westmeath text-lg sm:text-xl font-bold text-[#FFB41E]'>
                                        {selectedBundle.harga}
                                    </span>
                                    <button
                                        onClick={closeBundleModal}
                                        aria-label='Close'
                                        className='text-white/80 hover:text-[#FFB41E] transition-colors bg-black/40 rounded-full p-2'
                                    >
                                        <X size={24} strokeWidth={2.5} />
                                    </button>
                                </div>
                            </div>

                            <div className='p-6'>
                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                                    {selectedBundle.isi
                                        .split(' + ')
                                        .map((itemName, index) => {
                                            const img =
                                                BUNDLE_ITEM_IMAGES[itemName];
                                            return (
                                                <div
                                                    key={index}
                                                    className='flex items-center gap-3 rounded-xl border border-[#FFB41E]/30 bg-black/40 p-3'
                                                >
                                                    <div className='w-12 h-12 rounded-lg overflow-hidden bg-black/60 shrink-0 flex items-center justify-center'>
                                                        {img ? (
                                                            <Image
                                                                src={img}
                                                                alt={itemName}
                                                                width={48}
                                                                height={48}
                                                                className='object-contain w-full h-full'
                                                            />
                                                        ) : (
                                                            <span className='font-westmeath text-lg text-[#FFB41E]'>
                                                                {itemName[0]}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span className='font-raleway text-sm text-white'>
                                                        {itemName}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                </div>

                                <div className='mt-6 flex items-center justify-between border-t border-[#FFB41E]/30 pt-4'>
                                    <span className='font-raleway text-sm text-white/70'>
                                        You saved
                                    </span>
                                    <span className='font-westmeath text-xl md:text-2xl font-bold text-[#FFB41E]'>
                                        Rp
                                        {getBundleSavings(selectedBundle).toLocaleString(
                                            'id-ID',
                                        )}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
