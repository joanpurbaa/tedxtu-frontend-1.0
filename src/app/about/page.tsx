'use client';

import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Countdown from '@/components/countdown';
import BackToTopButton from '@/components/BackToTopButton';
import { motion, useScroll, useSpring, useTransform, type Variants } from 'framer-motion';

const entranceUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
};

const fadeOnly: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.8, ease: 'easeOut' },
    },
};

const gentleRise: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: 'easeOut' },
    },
};

type FloatingOrnamentProps = {
    src: string;
    alt: string;
    className: string;
    delay: number;
    size: number;
    active: boolean;
};

function FloatingOrnament({ src, alt, className, delay, size, active }: FloatingOrnamentProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
                active
                    ? {
                          opacity: 1,
                          y: [0, -10, 0],
                          x: [0, 4, -4, 0],
                          rotate: [0, 2, -2, 0],
                          scale: 1,
                      }
                    : { opacity: 0 }
            }
            transition={{
                opacity: { duration: 0.4, delay },
                y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay },
                x: { duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay },
                rotate: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay },
            }}
            className={className}
        >
            <Image src={src} alt={alt} width={size} height={size} priority quality={100} />
        </motion.div>
    );
}

export default function About() {
    const [heroReady, setHeroReady] = useState(false);
    const [redEllipseFaded, setRedEllipseFaded] = useState(false);
    const conductorRef = useRef<HTMLElement>(null);

    const [introComplete, setIntroComplete] = useState(false);
    const [flickerOpacity, setFlickerOpacity] = useState(0);
    const flickerTimersRef = useRef<number[]>([]);

    const { scrollYProgress: conductorScrollYProgress } = useScroll({
        target: conductorRef,
        offset: ['start end', 'end start'],
    });

    const rawMistY = useTransform(conductorScrollYProgress, [0, 1], ['-10%', '10%']);
    const rawMistX = useTransform(conductorScrollYProgress, [0, 1], ['6%', '-6%']);
    const mistY = useSpring(rawMistY, { stiffness: 40, damping: 18 });
    const mistX = useSpring(rawMistX, { stiffness: 40, damping: 18 });

    const baseConductorCards = [
        {
            title: 'IA',
            desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.',
        },
        {
            title: 'LICENSEE &\nCO-LICENSEE',
            desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.',
        },
        {
            title: 'PNE',
            desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.',
        },
        {
            title: 'LNO',
            desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.',
        },
        {
            title: 'PNE',
            desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.',
        },
        {
            title: 'MNE',
            desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.',
        },
    ];

    const conductorCards = [
        ...baseConductorCards,
        ...baseConductorCards,
        ...baseConductorCards,
    ];

    const middleIndex = baseConductorCards.length;
    const [activeCard, setActiveCard] = useState(middleIndex);
    const [dragStart, setDragStart] = useState<number | null>(null);
    const [isAnimating, setIsAnimating] = useState(true);
    const isTransitioningRef = useRef(false);

    const clearAllFlickerTimers = () => {
        flickerTimersRef.current.forEach((t) => window.clearTimeout(t));
        flickerTimersRef.current = [];
    };

    const scheduleNextIdleFlicker = () => {
        const idleDelay = 9000 + Math.random() * 11000;

        const t1 = window.setTimeout(() => {
            const blinks = 2 + Math.floor(Math.random() * 2);
            let offset = 0;

            for (let i = 0; i < blinks; i++) {
                const offDuration = 60 + Math.random() * 120;
                const onDuration = 80 + Math.random() * 180;

                const tOff = window.setTimeout(() => {
                    setFlickerOpacity(0.05 + Math.random() * 0.15);
                }, offset);
                flickerTimersRef.current.push(tOff);
                offset += offDuration;

                const tOn = window.setTimeout(() => {
                    setFlickerOpacity(1);
                }, offset);
                flickerTimersRef.current.push(tOn);
                offset += onDuration;
            }

            const tNext = window.setTimeout(() => {
                scheduleNextIdleFlicker();
            }, offset + 200);
            flickerTimersRef.current.push(tNext);
        }, idleDelay);

        flickerTimersRef.current.push(t1);
    };

    useEffect(() => {
        setHeroReady(true);
        
        const fadeInTimer = setTimeout(() => {
            setRedEllipseFaded(true);
            setFlickerOpacity(1);
            setIntroComplete(true);
        }, 1500);

        const flickerTimer = setTimeout(() => {
            scheduleNextIdleFlicker();
        }, 1500 + 600);

        return () => {
            clearTimeout(fadeInTimer);
            clearTimeout(flickerTimer);
            clearAllFlickerTimers();
        };
    }, []);



    useEffect(() => {
        const total = baseConductorCards.length;
        const firstIndex = total;
        const lastIndex = total * 2 - 1;

        if (activeCard > lastIndex) {
            const timeout = setTimeout(() => {
                setIsAnimating(false);
                setActiveCard(firstIndex + (activeCard - (lastIndex + 1)));
                setTimeout(() => setIsAnimating(true), 50);
            }, 500);
            return () => clearTimeout(timeout);
        } else if (activeCard < firstIndex) {
            const timeout = setTimeout(() => {
                setIsAnimating(false);
                setActiveCard(lastIndex - (firstIndex - activeCard - 1));
                setTimeout(() => setIsAnimating(true), 50);
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, [activeCard, baseConductorCards.length]);

    const navigateCard = (delta: number) => {
        if (isTransitioningRef.current) return;
        isTransitioningRef.current = true;
        setIsAnimating(true);
        setActiveCard((prev) => prev + delta);
        setTimeout(() => {
            isTransitioningRef.current = false;
        }, 600);
    };

    const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
        const clientX =
            'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        setDragStart(clientX);
    };

    const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
        if (dragStart === null) return;
        const clientX =
            'changedTouches' in e
                ? e.changedTouches[0].clientX
                : (e as React.MouseEvent).clientX;
        const diff = dragStart - clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) navigateCard(1);
            else navigateCard(-1);
        }
        setDragStart(null);
    };

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: `
                @font-face {
                    font-family: 'Great Vibes';
                    src: url('/font/GreatVibes-Regular.ttf') format('truetype');
                    font-weight: normal; font-style: normal; font-display: swap;
                }
            `}} />
            <Navbar />
            <main className='relative w-full overflow-x-clip bg-black'>

                <section className='relative z-20 w-full min-h-[100dvh] flex items-center justify-center overflow-visible bg-black'>
                    <div className='pointer-events-none absolute inset-0 bg-black' />

                    <motion.div
                        aria-hidden='true'
                        className='pointer-events-none absolute left-1/2 top-1/2 z-0'
                        style={{ x: '-50%', y: '-50%' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: redEllipseFaded ? flickerOpacity : 1 }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                    >
                        <div className='w-[140vw] max-w-none'>
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
                    </motion.div>

                    <div className='relative z-10 text-center px-4'>
                        <div className='flex items-center justify-center gap-4 sm:gap-6 md:gap-8 flex-wrap'>
                            <motion.span
                                className='font-westmeath text-4xl md:text-5xl lg:text-6xl text-white font-bold'
                                variants={fadeOnly}
                                initial='hidden'
                                animate={redEllipseFaded ? 'visible' : 'hidden'}
                            >
                                ABOUT
                            </motion.span>
                            <motion.div
                                variants={fadeOnly}
                                initial='hidden'
                                animate={redEllipseFaded ? 'visible' : 'hidden'}
                                transition={{ delay: 0.2 }}
                                className='relative'
                            >
                                <Image
                                    src='/about/music-note.webp'
                                    alt='Music note'
                                    width={30}
                                    height={30}
                                    priority
                                    quality={100}
                                    style={{ transform: 'rotate(18deg)' }}
                                />
                            </motion.div>
                            <motion.span
                                className='font-westmeath text-4xl md:text-5xl lg:text-6xl text-white font-bold'
                                variants={fadeOnly}
                                initial='hidden'
                                animate={redEllipseFaded ? 'visible' : 'hidden'}
                                transition={{ delay: 0.3 }}
                            >
                                US
                            </motion.span>
                        </div>
                        <motion.p
                            className='font-raleway text-base md:text-xl text-white/80 italic mt-6'
                            variants={fadeOnly}
                            initial='hidden'
                            animate={redEllipseFaded ? 'visible' : 'hidden'}
                            transition={{ delay: 0.5 }}
                        >
                            Where ideas find their stage
                        </motion.p>
                    </div>

                    <FloatingOrnament
                        src='/about/mask.webp'
                        alt='Mask decoration'
                        className='absolute top-[24%] left-[18%] -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none'
                        delay={0.1}
                        size={120}
                        active={introComplete}
                    />
                    <FloatingOrnament
                        src='/about/trumpet.webp'
                        alt='Trumpet decoration'
                        className='absolute top-[24%] right-[18%] translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none'
                        delay={0.2}
                        size={120}
                        active={introComplete}
                    />
                    <FloatingOrnament
                        src='/about/turn-table.webp'
                        alt='Turn table decoration'
                        className='absolute bottom-[24%] left-[18%] -translate-x-1/2 translate-y-1/2 z-10 pointer-events-none'
                        delay={0.3}
                        size={120}
                        active={introComplete}
                    />
                    <FloatingOrnament
                        src='/about/crown.webp'
                        alt='Crown decoration'
                        className='absolute bottom-[24%] right-[18%] translate-x-1/2 translate-y-1/2 z-10 pointer-events-none'
                        delay={0.4}
                        size={120}
                        active={introComplete}
                    />
                </section>

                <section className='relative z-30 w-full min-h-screen overflow-visible bg-transparent text-white px-4 md:px-14 py-20'>

                    <motion.div
                        className='pointer-events-none absolute left-0 top-[50%] z-20'
                        style={{ 
                            translateY: '-50%', 
                            translateX: '-60%'
                        }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.1, margin: "-20% 0px -20% 0px" }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                    >
                        <Image
                            src='/about/yellow-ellipse.webp'
                            alt='Yellow ellipse decoration left'
                            width={900}
                            height={900}
                            priority={false}
                            quality={100}
                            className='w-[160vw] max-w-[1800px] h-auto'
                        />
                    </motion.div>

                    <motion.div
                        className='pointer-events-none absolute right-0 top-[50%] z-20'
                        style={{ 
                            translateY: '-50%', 
                            translateX: '60%'
                        }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.1, margin: "-20% 0px -20% 0px" }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                    >
                        <Image
                            src='/about/yellow-ellipse.webp'
                            alt='Yellow ellipse decoration right'
                            width={900}
                            height={900}
                            priority={false}
                            quality={100}
                            className='w-[160vw] max-w-[1800px] h-auto'
                        />
                    </motion.div>

                    <div className='relative z-20 max-w-6xl mx-auto'>
                        <motion.h2
                            className='font-westmeath text-4xl md:text-5xl lg:text-6xl text-center mb-12'
                            variants={gentleRise}
                            initial='hidden'
                            whileInView='visible'
                            viewport={{ once: true, amount: 0.35 }}
                        >
                            OUR THEME
                        </motion.h2>
                        <div className='max-w-4xl mx-auto text-center space-y-12'>
                            <motion.h3
                                className='font-westmeath text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent'
                                style={{
                                    backgroundImage:
                                        'linear-gradient(180deg, #DCA23E 0%, #DCA23E 65%, #B45A22 85%, #8A0E04 100%)',
                                }}
                                variants={entranceUp}
                                initial='hidden'
                                whileInView='visible'
                                viewport={{ once: true, amount: 0.35 }}
                            >
                                "LOREM IPSUM DOLOR SIT AMET"
                            </motion.h3>
                            <motion.p
                                className='font-raleway text-base md:text-xl leading-9 text-white/80'
                                variants={entranceUp}
                                initial='hidden'
                                whileInView='visible'
                                viewport={{ once: true, amount: 0.35 }}
                                transition={{ duration: 0.85, ease: 'easeOut', delay: 0.12 }}
                            >
                                Lorem ipsum dolor sit amet consectetur
                                adipiscing elit. Adipiscing elit quisque
                                faucibus ex sapien vitae pellentesque. Vitae
                                pellentesque sem placerat in id cursus mi.
                                Cursus mi pretium tellus duis convallis tempus
                                leo. Tempus leo eu aenean sed diam urna tempor.
                                Urna tempor pulvinar vivamus fringilla lacus nec
                                metus.
                            </motion.p>
                        </div>
                    </div>
                </section>

                <div
                    className='pointer-events-none absolute -left-[11%] z-40'
                    style={{ top: '45%', transform: 'translateY(-50%)' }}
                >
                    <Image
                        src='/about/golden-note.webp'
                        alt='Golden note decoration'
                        width={523}
                        height={597}
                        priority={false}
                        quality={100}
                        className='w-[41.8vw] max-w-[523px] h-auto'
                        style={{ transform: 'rotate(-53.68deg)' }}
                    />
                </div>

                <section ref={conductorRef} className='relative z-50 w-full min-h-screen bg-transparent text-white px-3 sm:px-6 md:px-14 py-6 sm:py-8 md:py-12'>
                    <div className='max-w-6xl mx-auto'>
                        <h2 className='font-westmeath text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center mb-6 sm:mb-8 md:mb-12 flex items-center justify-center gap-3 flex-wrap'>
                            <span>VISION</span>
                            <span
                                style={{ 
                                    fontFamily: "'Great Vibes', cursive",
                                    fontSize: '1.25em',
                                    filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.8)) drop-shadow(0 0 25px rgba(255,255,255,0.4))',
                                    transform: 'rotate(-5deg)',
                                    display: 'inline-block',
                                    marginRight: '0.75rem',
                                }}
                            >
                                &
                            </span>
                            <span>MISSION</span>
                        </h2>
                        <div className='space-y-4 sm:space-y-5 md:space-y-6'>
                            <div className='relative w-full overflow-hidden'>
                                <Image
                                    src='/about/long-red-card.png'
                                    alt='Vision card background'
                                    width={1200}
                                    height={280}
                                    quality={100}
                                    className='w-full h-auto'
                                />
                                <div className='absolute inset-0 z-20 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[220px_1fr] items-center gap-4 sm:gap-6 md:gap-10 lg:gap-12 px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 md:py-8'>
                                    <h3 className='font-westmeath text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white text-left md:text-center pt-2 md:pt-0'>
                                        Vision
                                    </h3>
                                    <p className='font-raleway text-sm sm:text-base md:text-lg lg:text-2xl leading-relaxed text-white/95 text-left pt-2 md:pt-0'>
                                        With a 5-year vision, we aim to create a
                                        platform for impactful discussions,
                                        inspire innovative solutions, and
                                        enhance the quality of potential
                                        students through the making of &apos;the
                                        right environment&apos; ourselves.
                                    </p>
                                </div>
                            </div>

                            <div className='relative w-full overflow-hidden'>
                                <Image
                                    src='/about/long-yellow-card.png'
                                    alt='Mission card background'
                                    width={1200}
                                    height={280}
                                    quality={100}
                                    className='w-full h-auto'
                                />
                                <div className='absolute inset-0 z-20 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-[1fr_200px] lg:grid-cols-[1fr_220px] items-center gap-4 sm:gap-6 md:gap-10 lg:gap-12 px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 md:py-8'>
                                    <p className='font-raleway text-sm sm:text-base md:text-lg lg:text-2xl leading-relaxed text-white/95 text-left pt-2 md:pt-0'>
                                        To build a sustainable legacy by
                                        leveraging Telkom&apos;s potential
                                        resources, fostering collaboration
                                        across disciplines, and addressing
                                        relevant local issues to shape an ideal
                                        society.
                                    </p>
                                    <h3 className='font-westmeath text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white text-left md:text-center pt-2 md:pt-0'>
                                        Mission
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className='relative z-10 w-full min-h-screen bg-transparent text-white py-20 mt-20'>
                    <div className='pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2'>
                        <div className='w-[140vw] max-w-none'>
                            <Image
                                src='/about/red-ellipse.webp'
                                alt='Red ellipse decoration conductors'
                                width={2800}
                                height={1500}
                                quality={100}
                                className='w-full h-auto'
                            />
                        </div>
                    </div>

                    <motion.div
                        className='pointer-events-none absolute right-0 top-[-260px] z-0'
                        style={{
                            y: mistY,
                            x: mistX,
                            translateX: '50%',
                        }}
                    >
                        <Image
                            src='/about/Mist.webp'
                            alt='Mist decoration'
                            width={1200}
                            height={800}
                            priority={false}
                            quality={100}
                            className='w-[85vw] max-w-[1020px] h-auto'
                        />
                    </motion.div>

                    <div className='relative z-10 max-w-6xl mx-auto px-4 md:px-14'>
                        <h2 className='font-westmeath text-5xl md:text-6xl text-center mb-12'>
                            OUR CONDUCTORS
                        </h2>
                    </div>

                    <div className='relative w-full py-12 overflow-hidden'>
                        <div
                            className='w-full overflow-x-hidden cursor-grab active:cursor-grabbing'
                            onMouseDown={handleDragStart}
                            onMouseUp={handleDragEnd}
                            onMouseLeave={handleDragEnd}
                            onTouchStart={handleDragStart}
                            onTouchEnd={handleDragEnd}
                        >
                            <div
                                className={`flex items-center gap-0 will-change-transform ${
                                    isAnimating ? 'transition-transform duration-500 ease-out' : ''
                                }`}
                                style={{
                                    transform: `translateX(calc(50vw - 170px - ${activeCard * 340}px))`,
                                }}
                            >
                                {conductorCards.map((card, index) => {
                                    const isActive = index === activeCard;
                                    return (
                                        <button
                                            key={`${card.title}-${index}`}
                                            type='button'
                                            onClick={() => {
                                                const total = baseConductorCards.length;
                                                const normalizedIndex = index % total;
                                                const targetIndex = normalizedIndex + total;
                                                let delta = targetIndex - activeCard;
                                                if (delta > total / 2) delta -= total;
                                                if (delta < -total / 2) delta += total;
                                                if (delta !== 0) navigateCard(delta);
                                            }}
                                            className={`relative h-[500px] w-[340px] shrink-0 overflow-hidden rounded-3xl cursor-pointer select-none ${
                                                isAnimating ? 'transition-all duration-500' : ''
                                            } ${
                                                isActive
                                                    ? 'scale-100 brightness-100 z-10'
                                                    : 'scale-90 brightness-50'
                                            }`}
                                        >
                                            <Image
                                                src='/about/small-yellow-card.webp'
                                                alt={`${card.title} conductor card`}
                                                fill
                                                quality={100}
                                                className='object-cover'
                                            />
                                            <div
                                                className={`absolute inset-0 ${
                                                    isAnimating ? 'transition-colors duration-500' : ''
                                                } ${isActive ? 'bg-black/10' : 'bg-black/60'}`}
                                            />
                                            <div className='relative z-10 flex h-full flex-col items-start justify-start px-8 pt-10'>
                                                <span className='text-left font-westmeath text-5xl md:text-6xl text-white leading-[1.1] whitespace-pre-line'>
                                                    {card.title}
                                                </span>
                                                <p className='mt-8 text-left font-raleway text-xl md:text-2xl leading-relaxed text-white/95'>
                                                    {card.desc}
                                                </p>
                                            </div>
                                        </button>
                                    );
                                })}
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