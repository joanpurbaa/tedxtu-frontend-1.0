"use client";
import { useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, type Variants } from 'framer-motion';

const heroReveal: Variants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.15,
        },
    },
};

const bgReveal: Variants = {
    initial: { opacity: 0, scale: 1.08 },
    animate: {
        opacity: 1,
        scale: 1,
        transition: { duration: 1.1, ease: 'easeOut' },
    },
};

const decorReveal: Variants = {
    initial: { opacity: 0, y: 24, scale: 0.96 },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.9, ease: 'easeOut' },
    },
};

const contentReveal: Variants = {
    initial: { opacity: 0, y: 28 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.95, ease: 'easeOut' },
    },
};

export function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const springConfig = { stiffness: 60, damping: 20, restDelta: 0.001 };

    const rawBgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
    const rawContentY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
    const rawOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    const rawTopLeftY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
    const rawTopRightY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
    const rawBottomLeftY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const rawBottomRightY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    const rawTopLeftX = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
    const rawTopRightX = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
    const rawBottomLeftX = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);
    const rawBottomRightX = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

    const rawTopLeftRot = useTransform(scrollYProgress, [0, 1], [0, -8]);
    const rawTopRightRot = useTransform(scrollYProgress, [0, 1], [0, 8]);
    const rawBottomLeftRot = useTransform(scrollYProgress, [0, 1], [0, 6]);
    const rawBottomRightRot = useTransform(scrollYProgress, [0, 1], [0, -6]);

    const bgY = useSpring(rawBgY, springConfig);
    const contentY = useSpring(rawContentY, springConfig);
    const contentOpacity = useSpring(rawOpacity, springConfig);

    const topLeftY = useSpring(rawTopLeftY, springConfig);
    const topRightY = useSpring(rawTopRightY, springConfig);
    const bottomLeftY = useSpring(rawBottomLeftY, springConfig);
    const bottomRightY = useSpring(rawBottomRightY, springConfig);

    const topLeftX = useSpring(rawTopLeftX, springConfig);
    const topRightX = useSpring(rawTopRightX, springConfig);
    const bottomLeftX = useSpring(rawBottomLeftX, springConfig);
    const bottomRightX = useSpring(rawBottomRightX, springConfig);

    const topLeftRot = useSpring(rawTopLeftRot, springConfig);
    const topRightRot = useSpring(rawTopRightRot, springConfig);
    const bottomLeftRot = useSpring(rawBottomLeftRot, springConfig);
    const bottomRightRot = useSpring(rawBottomRightRot, springConfig);

    return (
        <motion.main
            key={pathname}
            id='hero'
            ref={containerRef}
            variants={heroReveal}
            initial='initial'
            animate='animate'
            className='relative w-full min-h-[100dvh] flex flex-col items-center justify-center bg-black overflow-hidden'
        >
            {/* Layer 1 — Background */}
            <motion.div
                variants={bgReveal}
                style={{ y: bgY }}
                // scale-150 memberi cukup ruang gerak agar tidak ada gap/kepotong saat scroll
                className='absolute inset-0 z-0 scale-150'
            >
                <Image
                    src='/about/tedx-background.webp'
                    alt='Hero background'
                    fill
                    className='object-cover'
                    priority
                />
            </motion.div>

            {/* Vignette layer — dipisah dari motion div agar tidak ikut bergerak */}
            {/* Dengan begitu vignette selalu cover full screen tanpa gap */}
            <div className='absolute inset-0 z-[1] pointer-events-none'>
                {/* Atas */}
                <div className='absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black via-black/70 to-transparent' />
                {/* Bawah — intens agar nyambung ke section berikutnya */}
                <div className='absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/80 to-transparent' />
                {/* Solid hitam di paling bawah agar benar-benar seamless */}
                <div className='absolute inset-x-0 bottom-0 h-16 bg-black' />
                {/* Kiri */}
                <div className='absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black/80 to-transparent' />
                {/* Kanan */}
                <div className='absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black/80 to-transparent' />
            </div>

            {/* Layer 2 — Decorative elements */}
            <motion.div
                variants={decorReveal}
                style={{ y: topLeftY, x: topLeftX, rotate: topLeftRot }}
                className='absolute top-[20%] left-[15%] md:top-1/4 md:left-1/4 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none'
            >
                <Image src='/about/mask.webp' alt='Mask' width={120} height={120} priority quality={100} className="w-16 md:w-28 lg:w-32" />
            </motion.div>

            <motion.div
                variants={decorReveal}
                transition={{ delay: 0.08 }}
                style={{ y: topRightY, x: topRightX, rotate: topRightRot }}
                className='absolute top-[20%] right-[15%] md:top-1/4 md:right-1/4 translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none'
            >
                <Image src='/about/trumpet.webp' alt='Trumpet' width={120} height={120} priority quality={100} className="w-16 md:w-28 lg:w-32" />
            </motion.div>

            <motion.div
                variants={decorReveal}
                transition={{ delay: 0.16 }}
                style={{ y: bottomLeftY, x: bottomLeftX, rotate: bottomLeftRot }}
                className='absolute bottom-[20%] left-[15%] md:bottom-1/4 md:left-1/4 -translate-x-1/2 translate-y-1/2 z-10 pointer-events-none'
            >
                <Image src='/about/turn-table.webp' alt='Turn table' width={120} height={120} priority quality={100} className="w-16 md:w-28 lg:w-32" />
            </motion.div>

            <motion.div
                variants={decorReveal}
                transition={{ delay: 0.24 }}
                style={{ y: bottomRightY, x: bottomRightX, rotate: bottomRightRot }}
                className='absolute bottom-[20%] right-[15%] md:bottom-1/4 md:right-1/4 translate-x-1/2 translate-y-1/2 z-10 pointer-events-none'
            >
                <Image src='/about/crown.webp' alt='Crown' width={120} height={120} priority quality={100} className="w-16 md:w-28 lg:w-32" />
            </motion.div>

            {/* Layer 3 — Content */}
            <motion.div 
                variants={contentReveal}
                style={{ y: contentY, opacity: contentOpacity }}
                className='relative z-20 flex flex-col items-center justify-center gap-8'
            >
                <h1 className='text-center'>
                    <div className='flex items-center justify-center gap-4 flex-wrap'>
                        <span className='font-westmeath text-5xl md:text-6xl lg:text-7xl text-white font-normal'>
                            Tailoring
                        </span>
                        <Image src='/about/music-note.webp' alt='Music note' width={30} height={30} priority quality={100} />
                        <span className='font-westmeath text-5xl md:text-6xl lg:text-7xl text-white font-normal'>
                            your
                        </span>
                    </div>
                    <div className='flex items-center justify-center gap-4 flex-wrap mt-2'>
                        <span className='font-westmeath text-5xl md:text-6xl lg:text-7xl text-white font-normal'>
                            own
                        </span>
                        <Image src='/about/single-golden-note.png' alt='Golden note' width={30} height={30} priority quality={100} />
                        <span className='font-westmeath text-5xl md:text-6xl lg:text-7xl text-white font-normal'>
                            tapestry
                        </span>
                    </div>
                </h1>

                <p className='text-sm sm:text-base md:text-lg lg:text-xl font-raleway italic font-medium text-white/80 px-4 max-w-2xl text-center'>
                    Every thread has a story. What tapestry do you want to weave?
                </p>

                <div className='flex flex-col sm:flex-row justify-center items-center gap-2 px-4 mt-4'>
                    <Link href="/event" className='relative group flex items-center justify-center w-[220px] h-[65px] md:w-[320px] md:h-[62px] transition-transform hover:scale-105 active:scale-95'>
                        <Image
                            src='/about/get-ticket-button.png'
                            alt='Get your ticket now'
                            fill
                            className='object-contain'
                            priority
                        />
                        <span className='relative z-10 font-westmeath text-white text-lg md:text-xl leading-none uppercase tracking-tight -mt-1 md:-mt-2'>
                            Get your ticket now
                        </span>
                    </Link>

                    <Link href="/merch" className='relative group flex items-center justify-center w-[180px] h-[60px] md:w-[220px] md:h-[62px] transition-transform hover:scale-105 active:scale-95'>
                        <Image
                            src='/about/merch-button.png'
                            alt='Our merch'
                            fill
                            className='object-contain'
                            priority
                        />
                        <span className='relative z-10 font-westmeath text-white text-lg md:text-xl leading-none uppercase tracking-tight -mt-1 md:-mt-2'>
                            Our merch
                        </span>
                    </Link>
                </div>
            </motion.div>
        </motion.main>
    );
}