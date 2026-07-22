'use client';

import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import BackToTopButton from '@/components/ui/backToTopButton';
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    type Variants,
} from 'framer-motion';

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

function FloatingOrnament({
    src,
    alt,
    className,
    delay,
    size,
    active,
}: FloatingOrnamentProps) {
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
                x: {
                    duration: 5.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay,
                },
                rotate: {
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay,
                },
            }}
            className={className}
        >
            <Image
                src={src}
                alt={alt}
                width={size}
                height={size}
                priority
                quality={75}
                className='w-14 h-14 md:w-[120px] md:h-[120px]'
            />
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

    const rawMistY = useTransform(
        conductorScrollYProgress,
        [0, 1],
        ['-10%', '10%'],
    );
    const rawMistX = useTransform(
        conductorScrollYProgress,
        [0, 1],
        ['6%', '-6%'],
    );
    const mistY = useSpring(rawMistY, { stiffness: 40, damping: 18 });
    const mistX = useSpring(rawMistX, { stiffness: 40, damping: 18 });

    const baseConductorCards = [
        {
            title: 'IA',
            desc: 'The backbone of our organization. Keeping the team grounded, the spirit alive, and every document in order.',
        },
        {
            title: 'LICENSEE &\nCO-LICENSEE',
            desc: 'The conductors of it all. Leading the symphony from the front, steering every note toward one shared vision.',
        },
        {
            title: 'PNE',
            desc: 'The architects behind every external event. From planning to execution, they craft experiences worth remembering.',
        },
        {
            title: 'LNO',
            desc: 'No spotlight without a stage. LnO ensures every venue, every item, and every detail is exactly where it needs to be.',
        },
        {
            title: 'PNF',
            desc: 'Building bridges beyond the stage. They manage our finances, secure our sponsors, and strengthen our community ties.',
        },
        {
            title: 'MNE',
            desc: "Our digital front row. From the website to every post you've seen — MnE shapes how the world sees us.",
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
            'touches' in e
                ? e.touches[0].clientX
                : (e as React.MouseEvent).clientX;
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
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                @font-face {
                    font-family: 'Great Vibes';
                    src: url('/font/GreatVibes-Regular.ttf') format('truetype');
                    font-weight: normal; font-style: normal; font-display: swap;
                }
            `,
                }}
            />
            <Navbar />
            <main className='relative w-full overflow-x-clip bg-black'>
                <section className='relative w-full min-h-[100dvh] flex items-center justify-center overflow-visible bg-black'>
                    <div className='pointer-events-none absolute inset-0 bg-black' />

                    <motion.div
                        aria-hidden='true'
                        className='pointer-events-none absolute left-1/2 top-1/2'
                        style={{ x: '-50%', y: '-50%' }}
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: redEllipseFaded ? flickerOpacity : 1,
                        }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                    >
                        <div className='w-[140vw] max-w-none'>
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
                    </motion.div>

                    <div className='relative text-center px-4'>
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
                                    quality={75}
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
                        className='absolute top-[18%] left-[14%] md:top-[21%] md:left-[15%] -translate-x-1/2 -translate-y-1/2 pointer-events-none'
                        delay={0.1}
                        size={120}
                        active={introComplete}
                    />
                    <FloatingOrnament
                        src='/about/trumpet.webp'
                        alt='Trumpet decoration'
                        className='absolute top-[18%] right-[14%] md:top-[21%] md:right-[15%] translate-x-1/2 -translate-y-1/2 pointer-events-none'
                        delay={0.2}
                        size={120}
                        active={introComplete}
                    />
                    <FloatingOrnament
                        src='/about/gramophone.svg'
                        alt='Turn table decoration'
                        className='absolute bottom-[18%] left-[14%] md:bottom-[21%] md:left-[15%] -translate-x-1/2 translate-y-1/2 pointer-events-none'
                        delay={0.3}
                        size={120}
                        active={introComplete}
                    />
                    <FloatingOrnament
                        src='/about/crown.webp'
                        alt='Crown decoration'
                        className='absolute bottom-[18%] right-[14%] md:bottom-[21%] md:right-[15%] translate-x-1/2 translate-y-1/2 pointer-events-none'
                        delay={0.4}
                        size={120}
                        active={introComplete}
                    />
                </section>

                <section className='relative w-full overflow-visible bg-transparent text-white px-4 md:px-14 py-12 md:py-16 md:min-h-screen mb-12 md:mb-24'>
                    <motion.div
                        className='pointer-events-none absolute left-0 top-[50%]'
                        style={{
                            translateY: '-50%',
                            translateX: '-60%',
                        }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{
                            once: true,
                            amount: 0.1,
                            margin: '-20% 0px -20% 0px',
                        }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                    >
                        <Image
                            src='/about/yellow-ellipse.webp'
                            alt='Yellow ellipse decoration left'
                            width={900}
                            height={900}
                            priority={false}
                            quality={75}
                            className='w-[160vw] max-w-[1800px] h-auto'
                        />
                    </motion.div>

                    <motion.div
                        className='pointer-events-none absolute right-0 top-[50%]'
                        style={{
                            translateY: '-50%',
                            translateX: '60%',
                        }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{
                            once: true,
                            amount: 0.1,
                            margin: '-20% 0px -20% 0px',
                        }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                    >
                        <Image
                            src='/about/yellow-ellipse.webp'
                            alt='Yellow ellipse decoration right'
                            width={900}
                            height={900}
                            priority={false}
                            quality={75}
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
                                &quot;Creating the Symphony&quot;
                            </motion.h3>
                            <motion.p
                                className='font-raleway text-base md:text-3xl leading-9 text-white/80'
                                variants={entranceUp}
                                initial='hidden'
                                whileInView='visible'
                                viewport={{ once: true, amount: 0.35 }}
                                transition={{
                                    duration: 0.85,
                                    ease: 'easeOut',
                                    delay: 0.12,
                                }}
                            >
                                A symphony is never born from a single hand. It
                                takes every note, every instrument, every voice
                                — working in harmony toward something greater
                                than itself. Creating the Symphony is our
                                reminder that ideas, like music, are most
                                powerful when they&apos;re built together. This
                                is where it all begins.
                            </motion.p>
                        </div>
                    </div>
                </section>

                <div
                    className='pointer-events-none absolute z-10 -left-[11%]'
                    style={{ top: '45%', transform: 'translateY(-50%)' }}
                >
                    <Image
                        src='/about/golden-note.webp'
                        alt='Golden note decoration'
                        width={523}
                        height={597}
                        priority={false}
                        quality={75}
                        className='w-[41.8vw] max-w-[523px] h-auto'
                        style={{ transform: 'rotate(-53.68deg)' }}
                    />
                </div>

                <section
                    ref={conductorRef}
                    className='relative z-10 w-full bg-transparent text-white px-4 sm:px-6 md:px-14 py-6 sm:py-8 md:py-12 md:min-h-screen mb-12 md:mb-24'
                >
                    <div className='max-w-6xl mx-auto'>
                        <h2 className='font-westmeath text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center mb-8 sm:mb-10 md:mb-14 flex items-center justify-center gap-3 flex-wrap'>
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

                        <div className='space-y-6 md:space-y-8'>
                            {/* --- VISION CARD --- */}
                            <div className='relative w-full rounded-[2.5rem] md:rounded-[3rem] overflow-hidden p-6 sm:p-8 md:p-10 lg:p-12'>
                                {/* Background Image Mobile - ditarik sedikit agar border bawaan SVG pas di tepi */}
                                <div className='absolute -inset-1 md:hidden z-0'>
                                    <Image
                                        src='/about/Vision Section.svg'
                                        alt='Vision background mobile'
                                        fill
                                        sizes='100vw'
                                        className='object-fill'
                                        priority
                                    />
                                </div>

                                {/* Background Image Desktop */}
                                <div className='hidden md:block absolute inset-0 z-0'>
                                    <Image
                                        src='/about/long-red-card.webp'
                                        alt='Vision background desktop'
                                        fill
                                        sizes='100vw'
                                        className='object-cover'
                                        priority
                                    />
                                </div>

                                {/* Content Layer */}
                                <div className='relative z-10 grid grid-cols-1 md:grid-cols-[180px_1fr] lg:grid-cols-[220px_1fr] items-center gap-3 sm:gap-4 md:gap-8 lg:gap-12'>
                                    <h3 className='font-westmeath text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white text-left md:text-center uppercase tracking-wider'>
                                        Vision
                                    </h3>
                                    <p className='font-raleway text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-white/95 text-left'>
                                        With a 5-year vision, we aim to create a
                                        platform for impactful discussions,
                                        inspire innovative solutions, and
                                        enhance the quality of potential
                                        students through the making of &apos;the
                                        right environment&apos; ourselves.
                                    </p>
                                </div>
                            </div>

                            {/* --- MISSION CARD --- */}
                            <div className='relative w-full rounded-[2.5rem] md:rounded-[3rem] overflow-hidden p-6 sm:p-8 md:p-10 lg:p-12'>
                                {/* Background Image Mobile */}
                                <div className='absolute -inset-1 md:hidden z-0'>
                                    <Image
                                        src='/about/Mission Section.svg'
                                        alt='Mission background mobile'
                                        fill
                                        sizes='100vw'
                                        className='object-fill'
                                        priority
                                    />
                                </div>

                                {/* Background Image Desktop */}
                                <div className='hidden md:block absolute inset-0 z-0'>
                                    <Image
                                        src='/about/long-yellow-card.webp'
                                        alt='Mission background desktop'
                                        fill
                                        sizes='100vw'
                                        className='object-cover'
                                        priority
                                    />
                                </div>

                                {/* Content Layer */}
                                <div className='relative z-10 grid grid-cols-1 md:grid-cols-[1fr_180px] lg:grid-cols-[1fr_220px] items-center gap-3 sm:gap-4 md:gap-8 lg:gap-12'>
                                    <p className='order-last md:order-first font-raleway text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-white/95 text-left'>
                                        To build a sustainable legacy by
                                        leveraging Telkom&apos;s potential
                                        resources, fostering collaboration
                                        across disciplines, and addressing
                                        relevant local issues to shape an ideal
                                        society.
                                    </p>
                                    <h3 className='order-first md:order-last font-westmeath text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white text-left md:text-center uppercase tracking-wider'>
                                        Mission
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className='relative w-full bg-transparent text-white py-12 md:py-16 md:min-h-screen'>
                    <div className='pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
                        <div className='w-[140vw] max-w-none'>
                            <Image
                                src='/about/red-ellipse.webp'
                                alt='Red ellipse decoration conductors'
                                width={2800}
                                height={1500}
                                quality={75}
                                className='w-full h-auto'
                            />
                        </div>
                    </div>

                    <motion.div
                        className='pointer-events-none absolute right-0 top-[-260px]'
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
                            quality={75}
                            className='w-[85vw] max-w-[1020px] h-auto'
                        />
                    </motion.div>

                    <div className='relative max-w-6xl mx-auto px-4 md:px-14'>
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
                                    isAnimating
                                        ? 'transition-transform duration-500 ease-out'
                                        : ''
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
                                                const total =
                                                    baseConductorCards.length;
                                                const normalizedIndex =
                                                    index % total;
                                                const targetIndex =
                                                    normalizedIndex + total;
                                                let delta =
                                                    targetIndex - activeCard;
                                                if (delta > total / 2)
                                                    delta -= total;
                                                if (delta < -total / 2)
                                                    delta += total;
                                                if (delta !== 0)
                                                    navigateCard(delta);
                                            }}
                                            className={`relative h-[500px] w-[340px] shrink-0 overflow-hidden rounded-3xl cursor-pointer select-none ${
                                                isAnimating
                                                    ? 'transition-all duration-500'
                                                    : ''
                                            } ${
                                                isActive
                                                    ? 'scale-100 brightness-100'
                                                    : 'scale-90 brightness-50'
                                            }`}
                                        >
                                            <Image
                                                src='/about/small-yellow-card.webp'
                                                alt={`${card.title} conductor card`}
                                                fill
                                                sizes='340px'
                                                quality={75}
                                                className='object-cover'
                                            />
                                            <div
                                                className={`absolute inset-0 ${
                                                    isAnimating
                                                        ? 'transition-colors duration-500'
                                                        : ''
                                                } ${isActive ? 'bg-black/10' : 'bg-black/60'}`}
                                            />
                                            <div className='relative flex h-full flex-col items-start justify-start px-8 pt-10'>
                                                <span className='text-left font-westmeath text-5xl md:text-6xl text-white leading-[1.1] whitespace-pre-line'>
                                                    {card.title}
                                                </span>
                                                <p className='mt-8 text-left font-raleway text-2xl md:text-2xl leading-relaxed text-white/95'>
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
            <BackToTopButton />
            <Footer />
        </>
    );
}
