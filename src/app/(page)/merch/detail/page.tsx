'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BackToTopButton from '@/components/ui/backToTopButton';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ChevronLeft, ChevronRight, X } from 'lucide-react';

const MERCH_PRODUCTS = [
    {
        id: 'cap',
        name: 'Cap',
        price: 60000,
        description: 'TEDxTelkom University cap available in black and maroon.',
        images: [
            '/merch/cap/Cap Mockup-Maroon.webp',
            '/merch/cap/Cap Mockup-Black.webp',
        ],
        sizes: [],
    },
    {
        id: 'keychain',
        name: 'Keychain',
        price: 10000,
        description: 'A small TEDxTelkom University keepsake for your everyday carry.',
        images: ['/merch/keychain/tedxlogo.webp', '/merch/keychain/x1.webp'],
        sizes: [],
    },
    {
        id: 'enamel',
        name: 'Enamel Pin',
        price: 20000,
        description: 'Collectible enamel pins made to add a little TEDx energy anywhere.',
        images: ['/merch/enamel/enamel1.webp', '/merch/enamel/enamel2.webp'],
        sizes: [],
    },
    {
        id: 'notebook',
        name: 'Notebook',
        price: 23000,
        description: 'A compact notebook for ideas worth putting on paper.',
        images: [
            '/merch/notebook/Notebook Tampak Depan.webp',
            '/merch/notebook/Notebook Tampak Belakang.webp',
        ],
        imageLabels: ['Front', 'Back'],
        sizes: [],
    },
    {
        id: 'totebag',
        name: 'Totebag',
        price: 30000,
        description: 'A sturdy everyday tote for carrying your ideas with you.',
        images: [
            '/merch/totebag/Tote Bag Mockup-Black-Variant 1.webp',
            '/merch/totebag/Tote Bag Mockup-Black-Variant 2.webp',
        ],
        sizes: [],
    },
    {
        id: 'tshirt',
        name: 'T-Shirt',
        price: 85000,
        description: 'TEDxTelkom University T-Shirt available in multiple designs.',
        images: [
            '/merch/Tshirt/Tshirt-Mockup-Black-Variant1.webp',
            '/merch/Tshirt/Tshirt-Mockup-White-Variant1.webp',
            '/merch/Tshirt/Tshirt-Mockup-White-Variant2-WithMaroonRinger.webp',
        ],
        sizes: ['S', 'M', 'L', 'XL'],
    },
];

export default function DetailMerchPage() {
    const [selectedProduct, setSelectedProduct] = useState(MERCH_PRODUCTS[0]);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

    const handleAddToCart = () => {
        if (selectedProduct.sizes.length > 0 && !selectedSize) {
            alert('Please select a size');
            return;
        }
        console.log('Added to cart:', {
            product: selectedProduct.name,
            size: selectedSize,
            quantity,
        });
    };

    const selectProduct = (product: (typeof MERCH_PRODUCTS)[number]) => {
        setSelectedProduct(product);
        setSelectedImage(0);
        setSelectedSize(null);
        window.history.replaceState(null, '', `/merch/detail?product=${product.id}`);
    };

    useEffect(() => {
        const productId = new URLSearchParams(window.location.search).get(
            'product',
        );
        const product = MERCH_PRODUCTS.find((item) => item.id === productId);

        if (product) {
            setSelectedProduct(product);
            setSelectedImage(0);
            setSelectedSize(null);
        }
    }, []);

    const incrementQuantity = () => setQuantity((prev) => prev + 1);
    const decrementQuantity = () =>
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    const handleNextImage = () => {
        setSelectedImage((prev) => (prev + 1) % selectedProduct.images.length);
    };

    const selectedImageLabel =
        selectedProduct.imageLabels?.[selectedImage] ??
        `View ${selectedImage + 1}`;

    const handlePrevImage = () => {
        setSelectedImage(
            (prev) =>
                (prev - 1 + selectedProduct.images.length) %
                selectedProduct.images.length,
        );
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
                                    src={selectedProduct.images[selectedImage]}
                                    alt={`${selectedProduct.name} - ${selectedImageLabel}`}
                                    fill
                                    quality={75}
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
                                {selectedImage + 1} /{' '}
                                {selectedProduct.images.length}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className='relative flex-1 w-full bg-[#4a1512] pt-32 sm:pt-36'>
                <div
                    className='absolute inset-0 opacity-15 mix-blend-overlay'
                    style={{
                        backgroundImage:
                            "url('/speakers/backgroundTexture.webp')",
                        backgroundRepeat: 'repeat',
                        backgroundSize: '60rem 60rem',
                    }}
                />

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
                                    className='relative mx-auto h-[26rem] w-full max-w-[28rem] rounded-2xl overflow-hidden bg-black/40 border border-[#FFB41E]/30 flex items-center justify-center hover:border-[#FFB41E]/60 transition-all cursor-pointer'
                                >
                                    <motion.div
                                        key={selectedImage}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className='relative w-full h-full'
                                    >
                                        <Image
                                            src={
                                                selectedProduct.images[
                                                    selectedImage
                                                ]
                                            }
                                            alt={`${selectedProduct.name} - ${selectedImageLabel}`}
                                            fill
                                            priority
                                            quality={75}
                                            className='object-contain p-10'
                                        />
                                    </motion.div>
                                </button>

                                <div className='flex gap-4 justify-center'>
                                    {selectedProduct.images.map((img, idx) => (
                                        <motion.button
                                            key={idx}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() =>
                                                setSelectedImage(idx)
                                            }
                                            aria-label={`${selectedProduct.name} - ${selectedProduct.imageLabels?.[idx] ?? `View ${idx + 1}`}`}
                                            className={`relative w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-all ${
                                                selectedImage === idx
                                                    ? 'border-[#FFB41E] bg-black/60'
                                                    : 'border-gray-700 bg-black/20 hover:border-[#FFB41E]/50'
                                            }`}
                                        >
                                            <Image
                                                src={img}
                                                alt={`${selectedProduct.name} - ${selectedProduct.imageLabels?.[idx] ?? `View ${idx + 1}`}`}
                                                fill
                                                className='object-contain p-2'
                                            />
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
                                    {selectedProduct.name}
                                </h1>

                                <div className='flex items-baseline'>
                                    <span className='font-westmeath text-2xl md:text-3xl lg:text-4xl font-bold text-[#FFB41E]'>
                                        Rp
                                        {selectedProduct.price.toLocaleString(
                                            'id-ID',
                                        )}
                                    </span>
                                </div>

                                <p className='font-raleway text-white/75 text-base leading-relaxed'>
                                    {selectedProduct.description}
                                </p>

                                {selectedProduct.sizes.length > 0 && (
                                    <div className='space-y-4'>
                                        <label className='font-westmeath text-lg text-white block'>
                                            SIZE
                                        </label>
                                        <div className='flex gap-3 flex-wrap'>
                                            {selectedProduct.sizes.map((size) => (
                                            <motion.button
                                                key={size}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() =>
                                                    setSelectedSize(size)
                                                }
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
                                )}

                                <div className='space-y-4'>
                                    <label className='font-westmeath text-lg text-white block'>
                                        QUANTITY
                                    </label>
                                    <div className='flex items-center gap-6 bg-black/60 border border-[#DCA23E] rounded-xl w-fit p-2 px-4'>
                                        <button
                                            onClick={decrementQuantity}
                                            className='text-[#DCA23E] hover:text-[#FFB41E] transition-colors'
                                        >
                                            <Minus size={20} />
                                        </button>
                                        <span className='font-westmeath text-xl text-[#FFB41E] w-8 text-center'>
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={incrementQuantity}
                                            className='text-[#DCA23E] hover:text-[#FFB41E] transition-colors'
                                        >
                                            <Plus size={20} />
                                        </button>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{
                                        scale: 1.02,
                                        boxShadow:
                                            '0 0 25px rgba(255, 215, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.3)',
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleAddToCart}
                                    className='w-full py-4 md:py-5 font-westmeath text-xl md:text-2xl font-bold text-black rounded-full
                                        bg-gradient-to-b from-[#FF4444] to-[#FFD700]
                                        transition-all duration-300 uppercase relative overflow-hidden'
                                    style={{
                                        boxShadow:
                                            'inset 0 1px 0 rgba(255,255,255,0.2)',
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
                            {MERCH_PRODUCTS.map((item) => (
                                <motion.button
                                    key={item.id}
                                    type='button'
                                    onClick={() => selectProduct(item)}
                                    className={`group text-left ${selectedProduct.id === item.id ? 'ring-2 ring-[#FFB41E]' : ''}`}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.02, y: -5 }}
                                        className='flex flex-col items-center p-5 rounded-2xl border border-[#FFB41E]/40 hover:border-[#FFB41E] transition-all h-full'
                                    >
                                        <div className='relative h-52 w-full flex justify-center items-center rounded-xl overflow-hidden mb-4 sm:h-56 md:h-64'>
                                            <Image
                                                src={item.images[0]}
                                                alt={item.name}
                                                fill
                                                className='object-contain p-5 group-hover:scale-105 transition-transform duration-500'
                                            />
                                        </div>
                                        <div className='text-center w-full'>
                                            <h3 className='font-westmeath text-xl md:text-2xl text-white group-hover:text-[#FFB41E] transition-colors'>
                                                {item.name}
                                            </h3>
                                            <p className='font-westmeath text-lg md:text-xl text-[#DCA23E]'>
                                                Rp
                                                {item.price.toLocaleString(
                                                    'id-ID',
                                                )}
                                            </p>
                                        </div>
                                        <div className='mt-4 w-full py-2 bg-[#FFB41E] text-black font-westmeath font-normal rounded-lg transition-all duration-300 text-center'>
                                            {selectedProduct.id === item.id
                                                ? 'SELECTED'
                                                : 'VIEW PRODUCT'}
                                        </div>
                                    </motion.div>
                                </motion.button>
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
