'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    }
};

export function EventSection() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    // Ukuran standar untuk gallery-8 dan gallery-9
    const largeGallerySize = Math.round(192 * 1.35); 
    // Ukuran lebih kecil khusus untuk gallery-10 dan gallery-11
    const smallGallerySize = 192; 

    return (
        <section
            id='event'
            ref={ref}
            className='relative w-full min-h-screen flex items-center justify-center bg-black px-4 py-20 overflow-visible'
        >
            {/* Background Image - gallery-12.png */}
            <div className='absolute inset-0 z-0'>
                <Image
                    src='/gallery/gallery-12.png'
                    alt='Event Background'
                    fill
                    className='object-cover opacity-60' // Opacity bisa disesuaikan jika terlalu terang
                    quality={100}
                    priority
                />
            </div>

            {/* Mist decorations */}
            <div className='pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-between h-0'>
                <div className='relative -top-[280px] -translate-x-[45%]'>
                    <Image
                        src='/about/Mist.webp'
                        alt='Mist decoration left'
                        width={1100}
                        height={800}
                        quality={100}
                        className='w-[55vw] max-w-[850px] h-auto opacity-70'
                    />
                </div>
                <div className='relative -top-[250px] translate-x-[15%]'>
                    <Image
                        src='/about/Mist.webp'
                        alt='Mist decoration right'
                        width={1100}
                        height={800}
                        quality={100}
                        className='w-[55vw] max-w-[850px] h-auto opacity-70'
                    />
                </div>
            </div>

            {/* --- Decorative images (Gallery) --- */}
            
            {/* Top Left - Gallery 10 (SMALLER) */}
            <div className='absolute top-[20%] left-[28%] -translate-x-1/2 -translate-y-1/2 z-20'>
                <Image
                    src='/gallery/gallery-10.png'
                    alt='Gallery decoration top left'
                    width={smallGallerySize}
                    height={smallGallerySize}
                    quality={100}
                    className='opacity-50 md:opacity-90 hover:opacity-100 transition-opacity'
                />
            </div>

            {/* Top Right - Gallery 8 (LARGE) */}
            <div className='absolute top-[20%] right-[28%] translate-x-1/2 -translate-y-1/2 z-20'>
                <Image
                    src='/gallery/gallery-8.jpg'
                    alt='Gallery decoration top right'
                    width={largeGallerySize}
                    height={largeGallerySize}
                    quality={100}
                    className='opacity-50 md:opacity-90 hover:opacity-100 transition-opacity'
                />
            </div>

            {/* Bottom Left - Gallery 9 (LARGE) */}
            <div className='absolute bottom-[20%] left-[28%] -translate-x-1/2 translate-y-1/2 z-20'>
                <Image
                    src='/gallery/gallery-9.jpg'
                    alt='Gallery decoration bottom left'
                    width={largeGallerySize}
                    height={largeGallerySize}
                    quality={100}
                    className='opacity-50 md:opacity-90 hover:opacity-100 transition-opacity'
                />
            </div>

            {/* Bottom Right - Gallery 11 (SMALLER) */}
            <div className='absolute bottom-[20%] right-[28%] translate-x-1/2 translate-y-1/2 z-20'>
                <Image
                    src='/gallery/gallery-11.png'
                    alt='Gallery decoration bottom right'
                    width={smallGallerySize}
                    height={smallGallerySize}
                    quality={100}
                    className='opacity-50 md:opacity-90 hover:opacity-100 transition-opacity'
                />
            </div>

            {/* Content Container dengan Animasi */}
            <motion.div
                className='relative z-30 max-w-4xl w-full flex flex-col items-center justify-center text-center'
                variants={staggerContainer}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
            >
                <motion.h2
                    variants={fadeInUp}
                    className='font-westmeath text-4xl md:text-5xl lg:text-6xl text-white mb-8 tracking-wider uppercase font-normal'
                >
                    THE EVENT
                </motion.h2>

                <motion.p
                    variants={fadeInUp}
                    className='font-raleway text-base md:text-xl text-gray-300 mb-12 leading-relaxed max-w-2xl'
                >
                    Setiap helaian benang memiliki cerita. Permadani apa yang ingin Anda tenun? Lorem ipsum dolor sit amet consectetur adipiscing elit. Adipiscing elit quisque faucibus ex sapien vitae pellentesque.
                </motion.p>

                <motion.div variants={fadeInUp}>
                    <Link href='/event' className='relative inline-block group transition-transform hover:scale-105 active:scale-95'>
                        <div className='relative w-[243px] h-[47px]'>
                            <Image
                                src='/about/get-ticket-button.png'
                                alt='More About Event'
                                fill
                                className='object-contain'
                                quality={100}
                            />
                            <span className='absolute inset-0 flex items-center justify-center text-white font-westmeath text-sm md:text-lg font-normal leading-none uppercase whitespace-nowrap'>
                                more about event
                            </span>
                        </div>
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}

export default EventSection;