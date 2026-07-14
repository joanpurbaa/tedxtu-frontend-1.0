'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants, useScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" as const }
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
    const sectionRef = useRef<HTMLDivElement>(null);

    const { ref: inViewRef, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const setRefs = (node: HTMLDivElement | null) => {
        (sectionRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        inViewRef(node);
    };

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const springConfig = { stiffness: 80, damping: 20, restDelta: 0.001 };

    const rawMistLeftX = useTransform(scrollYProgress, [0.05, 0.25], ["-40%", "0%"]);
    const rawMistLeftOpacity = useTransform(scrollYProgress, [0.05, 0.22], [0, 0.7]);
    const rawMistRightX = useTransform(scrollYProgress, [0.05, 0.25], ["40%", "0%"]);
    const rawMistRightOpacity = useTransform(scrollYProgress, [0.05, 0.22], [0, 0.7]);

    const mistLeftX = useSpring(rawMistLeftX, springConfig);
    const mistLeftOpacity = useSpring(rawMistLeftOpacity, springConfig);
    const mistRightX = useSpring(rawMistRightX, springConfig);
    const mistRightOpacity = useSpring(rawMistRightOpacity, springConfig);

    const largeGallerySize = Math.round(192 * 1.35); 
    const smallGallerySize = 192; 

    return (
        <section
            id='event'
            ref={setRefs}
            className='relative w-full min-h-screen flex items-center justify-center bg-black px-4 py-20'
            style={{
                overflow: 'visible', // Agar ellipse dari section bawah bisa menembus ke sini
                // zIndex dihapus untuk menghindari isolasi stacking context
            }}
        >
            {/* LAYER 1: Background (z-0) */}
            <div className='absolute inset-0 z-0 overflow-hidden'>
                <Image
                    src='/gallery/gallery-12.webp'
                    alt='Event Background'
                    fill
                    className='object-cover opacity-60'
                    quality={100}
                    priority
                />
                <div className='absolute inset-0 pointer-events-none'>
                    <div className='absolute top-0 left-0 w-full h-[30%] bg-gradient-to-b from-black to-transparent' />
                    <div className='absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-black to-transparent' />
                </div>
            </div>

            {/* LAYER 2: Mist (z-10) */}
            <div className='absolute inset-0 z-10 pointer-events-none'>
                <motion.div
                    style={{ x: mistLeftX, opacity: mistLeftOpacity }}
                    className='absolute top-0 left-0 h-0'
                >
                    <div className='relative -top-[180px] md:-top-[280px] -translate-x-[40%]'>
                        <Image
                            src='/about/Mist.webp'
                            alt=''
                            width={1100}
                            height={800}
                            className='w-[65vw] max-w-[950px] h-auto'
                        />
                    </div>
                </motion.div>
                <motion.div
                    style={{ x: mistRightX, opacity: mistRightOpacity }}
                    className='absolute top-0 right-0 h-0'
                >
                    <div className='relative -top-[150px] md:-top-[250px] translate-x-[15%]'>
                        <Image
                            src='/about/Mist.webp'
                            alt=''
                            width={1100}
                            height={800}
                            className='w-[65vw] max-w-[950px] h-auto'
                        />
                    </div>
                </motion.div>
            </div>

            {/* LAYER 3: Gallery (z-[20]) — Di bawah ellipse merch (z-30) */}
            <div className='absolute inset-0 z-[20] pointer-events-none'>
                <div className='absolute top-[18%] left-[12%] md:top-[22%] md:left-[25%] -translate-x-1/2 -translate-y-1/2'>
                    <Image
                        src='/gallery/gallery-10.webp'
                        alt=''
                        width={smallGallerySize}
                        height={smallGallerySize}
                        className='opacity-100 rounded-xl'
                    />
                </div>
                <div className='absolute top-[18%] right-[12%] md:top-[22%] md:right-[25%] translate-x-1/2 -translate-y-1/2'>
                    <Image
                        src='/gallery/gallery-8.webp'
                        alt=''
                        width={largeGallerySize}
                        height={largeGallerySize}
                        className='opacity-100 rounded-xl'
                    />
                </div>
                <div className='absolute bottom-[18%] left-[12%] md:bottom-[22%] md:left-[25%] -translate-x-1/2 translate-y-1/2'>
                    <Image
                        src='/gallery/gallery-9.webp'
                        alt=''
                        width={largeGallerySize}
                        height={largeGallerySize}
                        className='opacity-100 rounded-xl'
                    />
                </div>
                <div className='absolute bottom-[18%] right-[12%] md:bottom-[22%] md:right-[25%] translate-x-1/2 translate-y-1/2'>
                    <Image
                        src='/gallery/gallery-11.webp'
                        alt=''
                        width={smallGallerySize}
                        height={smallGallerySize}
                        className='opacity-100 rounded-xl'
                    />
                </div>
            </div>

            {/* LAYER 4: Main Content (z-50) */}
            <motion.div
                className='relative z-20 max-w-4xl w-full flex flex-col items-center justify-center text-center px-6'
                variants={staggerContainer}
                initial='hidden'
                animate={inView ? 'visible' : 'hidden'}
            >
                <motion.h2
                    variants={fadeInUp}
                    className='font-westmeath text-4xl md:text-5xl lg:text-6xl text-white mb-6 tracking-wider uppercase drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]'
                >
                    THE EVENT
                </motion.h2>

                <motion.p
                    variants={fadeInUp}
                    className='font-raleway text-base md:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]'
                >
                    Once a year, the stage is set. The lights dim, the curtain
                    rises — and ideas take center stage. TEDxTelkom University
                    Main Event brings together voices that dare to think
                    differently, delivering talks that linger long after the
                    applause fades. No scripts, no filters — just real ideas,
                    told with conviction. The symphony is coming. Will you be
                    there?
                </motion.p>

                <motion.div variants={fadeInUp}>
                    <Link
                        href='/event'
                        className='relative group flex items-center justify-center w-[220px] h-[60px] md:w-[320px] md:h-[65px] transition-transform hover:scale-105 active:scale-95 mx-auto'
                    >
                        <Image
                            src='/about/get-ticket-button.webp'
                            alt=''
                            fill
                            className='object-contain'
                        />
                        <span className='relative z-10 font-westmeath text-white text-lg md:text-xl leading-none uppercase -mt-1 md:-mt-2'>
                            more about event
                        </span>
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}

export default EventSection;