'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTopButton from '@/components/BackToTopButton';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ChevronLeft, ChevronRight, X } from 'lucide-react';

const MERCHANDISE_DATA = {
    id: 1,
    name: 'MIAMI SHIRT 2026',
    price: 100000,
    description: 'Limited edition TEDxTelkom University merchandise featuring exclusive Miami-inspired design.',
    mainImage: '/merch/detail-merch/miamiShirt.png',
    images: [
        '/merch/detail-merch/miamiShirt.png',
        '/merch/detail-merch/shirtVector.png',
        '/merch/detail-merch/shirtDetail.png',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
};

const SUGGESTED_MERCH = [
    { id: 1, name: 'T-Shirt', price: 100000, img: '/merch/tshirt.webp' },
    { id: 2, name: 'Shirt 2026', price: 100000, img: '/merch/shirt-2026.webp' },
    { id: 3, name: 'Baseball Cap', price: 100000, img: '/merch/baseballCap.webp' },
    { id: 4, name: 'Hat 2026', price: 100000, img: '/merch/hat-2026.webp' },
];

export default function DetailMerchPage() {
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Please select a size');
            return;
        }
        console.log('Added to cart:', {
            product: MERCHANDISE_DATA.name,
            size: selectedSize,
            quantity,
        });
    };

    const incrementQuantity = () => setQuantity((prev) => prev + 1);
    const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    const handleNextImage = () => {
        setSelectedImage((prev) => (prev + 1) % MERCHANDISE_DATA.images.length);
    };

    const handlePrevImage = () => {
        setSelectedImage((prev) => (prev - 1 + MERCHANDISE_DATA.images.length) % MERCHANDISE_DATA.images.length);
    };

    return (
        <section className='min-h-screen w-full bg-black flex flex-col'>
            <Navbar />

            <AnimatePresence>
                {isFullscreenOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsFullscreenOpen(false)}
                        className='fixed inset-0 bg-black/90 z-50 flex items-center justify-center'
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                            className='relative w-full h-full flex items-center justify-center'
                        >
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsFullscreenOpen(false)}
                                className='absolute top-8 right-8 z-50 text-white hover:text-[#FFB41E] transition-colors'
                            >
                                <X size={40} strokeWidth={2.5} />
                            </motion.button>

                            <div className='relative w-[80vw] h-[80vh] flex items-center justify-center'>
                                <Image
                                    src={MERCHANDISE_DATA.images[selectedImage]}
                                    alt={`${MERCHANDISE_DATA.name} - Fullscreen ${selectedImage + 1}`}
                                    fill
                                    quality={100}
                                    className='object-contain'
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handlePrevImage}
                                className='absolute left-8 top-1/2 -translate-y-1/2 text-white hover:text-[#FFB41E] transition-colors'
                            >
                                <ChevronLeft size={48} strokeWidth={2} />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleNextImage}
                                className='absolute right-8 top-1/2 -translate-y-1/2 text-white hover:text-[#FFB41E] transition-colors'
                            >
                                <ChevronRight size={48} strokeWidth={2} />
                            </motion.button>

                            <div className='absolute bottom-8 left-1/2 -translate-x-1/2 text-white font-westmeath text-lg'>
                                {selectedImage + 1} / {MERCHANDISE_DATA.images.length}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main 
                className="relative flex-1 w-full bg-black bg-repeat bg-fixed"
                style={{ 
                    backgroundImage: `url('/merch/detail-merch/background%20patern.png')`,
                    backgroundSize: 'cover'
                }}
            >
                <div className='absolute inset-0 bg-black/40 pointer-events-none'></div>

                <section className='relative w-full px-4 sm:px-6 md:px-14 py-12 sm:py-16 md:py-20 flex items-center bg-transparent'>
                    <div className='max-w-7xl mx-auto w-full'>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12'>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                className='flex flex-col gap-6'
                            >
                                <button 
                                    onClick={() => setIsFullscreenOpen(true)}
                                    className='relative w-full max-w-sm h-96 rounded-2xl overflow-hidden bg-black/40 border border-[#FFB41E]/30 flex items-center justify-center mx-auto hover:border-[#FFB41E]/60 transition-all cursor-pointer'
                                >
                                    <motion.div
                                        key={selectedImage}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className='relative w-full h-full'
                                    >
                                        <Image
                                            src={MERCHANDISE_DATA.images[selectedImage]}
                                            alt={`${MERCHANDISE_DATA.name} - View ${selectedImage + 1}`}
                                            fill
                                            priority
                                            quality={100}
                                            className='object-contain p-8'
                                        />
                                    </motion.div>
                                </button>

                                <div className='flex gap-4 justify-center'>
                                    {MERCHANDISE_DATA.images.map((img, idx) => (
                                        <motion.button
                                            key={idx}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setSelectedImage(idx)}
                                            className={`relative w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-all ${
                                                selectedImage === idx
                                                    ? 'border-[#FFB41E] bg-black/60'
                                                    : 'border-gray-700 bg-black/20 hover:border-[#FFB41E]/50'
                                            }`}
                                        >
                                            <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className='object-contain p-2' />
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                className='flex flex-col justify-center gap-8'
                            >
                                <h1 className='font-westmeath text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase tracking-wide'>
                                    {MERCHANDISE_DATA.name}
                                </h1>

                                <div className='flex items-baseline'>
                                    <span className='font-westmeath text-2xl md:text-3xl lg:text-4xl font-bold text-[#FFB41E]'>
                                        Rp{MERCHANDISE_DATA.price.toLocaleString('id-ID')}
                                    </span>
                                </div>

                                <div className='space-y-4'>
                                    <label className='font-westmeath text-lg text-white block'>SIZE</label>
                                    <div className='flex gap-3 flex-wrap'>
                                        {MERCHANDISE_DATA.sizes.map((size) => (
                                            <motion.button
                                                key={size}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setSelectedSize(size)}
                                                className={`px-6 py-3 rounded-lg font-westmeath font-bold text-lg border-2 transition-all duration-300 ${
                                                    selectedSize === size
                                                        ? 'bg-[#FFB41E] text-black border-[#FFB41E] shadow-[0_0_20px_rgba(255,180,30,0.4)]'
                                                        : 'bg-black/40 text-[#DCA23E] border-[#DCA23E] hover:border-[#FFB41E]'
                                                }`}
                                            >
                                                {size}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                <div className='space-y-4'>
                                    <label className='font-westmeath text-lg text-white block'>QUANTITY</label>
                                    <div className='flex items-center gap-6 bg-black/60 border border-[#DCA23E] rounded-xl w-fit p-2 px-4'>
                                        <button onClick={decrementQuantity} className='text-[#DCA23E] hover:text-[#FFB41E] transition-colors'>
                                            <Minus size={20} />
                                        </button>
                                        <span className='font-westmeath text-xl text-[#FFB41E] w-8 text-center'>{quantity}</span>
                                        <button onClick={incrementQuantity} className='text-[#DCA23E] hover:text-[#FFB41E] transition-colors'>
                                            <Plus size={20} />
                                        </button>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ 
                                        scale: 1.02,
                                        boxShadow: '0 0 25px rgba(255, 215, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.3)'
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleAddToCart}
                                    className='w-full py-4 md:py-5 font-westmeath text-xl md:text-2xl font-bold text-black rounded-full
                                        bg-gradient-to-b from-[#FF4444] to-[#FFD700]
                                        transition-all duration-300 uppercase relative overflow-hidden'
                                    style={{
                                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)',
                                    }}
                                >
                                    BUY NOW
                                </motion.button>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <section className='relative w-full px-4 sm:px-6 md:px-14 py-16 md:py-24'>
                    <div className='max-w-7xl mx-auto'>
                        <div className='mb-12'>
                            <h2 className='font-westmeath text-4xl md:text-5xl font-bold text-white'>
                                YOU MIGHT ALSO LIKE
                            </h2>
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
                            {SUGGESTED_MERCH.map((item) => (
                                <Link key={item.id} href='/merch/detail' className='group'>
                                    <motion.div
                                        whileHover={{ scale: 1.02, y: -5 }}
                                        className='flex flex-col items-center p-5 rounded-2xl border border-[#FFB41E]/40 hover:border-[#FFB41E] transition-all h-full'
                                    >
                                        <div className='relative w-full aspect-square flex justify-center items-center rounded-xl overflow-hidden mb-4'>
                                            <Image
                                                src={item.img}
                                                alt={item.name}
                                                fill
                                                className='object-cover group-hover:scale-110 transition-transform duration-500'
                                            />
                                        </div>
                                        <div className='text-center w-full'>
                                            <h3 className='font-westmeath text-xl md:text-2xl text-white group-hover:text-[#FFB41E] transition-colors'>
                                                {item.name}
                                            </h3>
                                            <p className='font-westmeath text-lg md:text-xl text-[#DCA23E]'>
                                                Rp{item.price.toLocaleString('id-ID')}
                                            </p>
                                        </div>
                                        <div className='mt-4 w-full py-2 bg-[#FFB41E] text-black font-westmeath font-normal rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 text-center'>
                                            QUICK VIEW
                                        </div>
                                    </motion.div>
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