'use client';
import Link from 'next/link';
import Image from 'next/image';
import {
    motion,
    Variants,
    useScroll,
    useTransform,
    type MotionValue,
} from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useMemo, useRef } from 'react';

type WordItem = string | { text: string; highlight?: boolean };

function ScrollBlurWord({
    children,
    progress,
    range,
    highlight,
}: {
    children: string;
    progress: MotionValue<number>;
    range: [number, number];
    highlight?: boolean;
}) {
    const opacity = useTransform(progress, range, [0.15, 1]);
    const blurPx = useTransform(progress, range, [8, 0]);
    const filter = useTransform(blurPx, (v) => `blur(${v}px)`);

    return (
        <motion.span
            style={{ opacity, filter }}
            className={
                highlight
                    ? 'inline-block mx-1 px-2 py-0.5 rounded-md bg-red-400/10 border border-red-400 text-red-400 font-medium whitespace-nowrap'
                    : 'inline-block'
            }
        >
            {children}
        </motion.span>
    );
}

function ScrollBlurParagraph({ words }: { words: WordItem[] }) {
    const ref = useRef<HTMLParagraphElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start 0.9', 'start 0.35'],
    });

    return (
        <p
            ref={ref}
            className='font-raleway text-base md:text-3xl text-gray-300 mb-10 leading-relaxed max-w-4xl'
        >
            {words.map((w, i) => {
                const isObj = typeof w !== 'string';
                const text = isObj ? w.text : w;
                const start = i / words.length;
                const end = start + 1 / words.length;
                return (
                    <span key={i}>
                        <ScrollBlurWord
                            progress={scrollYProgress}
                            range={[start, end]}
                            highlight={isObj ? w.highlight : false}
                        >
                            {text}
                        </ScrollBlurWord>{' '}
                    </span>
                );
            })}
        </p>
    );
}

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: 'easeOut' },
    },
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        },
    },
};

export function AboutUsSection() {
    const aboutWords: WordItem[] = [
        'Every',
        'great',
        { text: 'symphony', highlight: true },
        'begins',
        'with',
        'a',
        { text: 'single note', highlight: true },
        '—',
        'and',
        'so',
        'do',
        'we.',
        'TEDxTelkom',
        'University',
        'is',
        'a',
        'stage',
        'where',
        'bold',
        'ideas',
        'find',
        'their',
        'voice,',
        'where',
        'thinkers,',
        'dreamers,',
        'and',
        'doers',
        'come',
        'together',
        'to',
        'spark',
        'conversations',
        'that',
        'matter.',
        "We don't",
        'just',
        'spread',
        'ideas.',
        'We',
        { text: 'orchestrate them', highlight: true },
        '.',
    ];

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const ellipseConfig = {
        size: '2000px',
        topOffset: '-108%',
        opacity: 0.85,
        blur: 'radial-gradient(circle, black 30%, transparent 75%)',
    };

    const emberParticles = useMemo(
        () =>
            Array.from({ length: 14 }).map((_, i) => ({
                id: i,
                left: Math.random() * 100,
                size: 2 + Math.random() * 4,
                duration: 6 + Math.random() * 6,
                delay: Math.random() * 6,
                drift: (Math.random() - 0.5) * 60,
            })),
        [],
    );

    return (
        <section
            id='about-us'
            ref={ref}
            className='relative w-full min-h-screen flex items-center justify-center bg-black px-4 py-20 overflow-visible'
        >
            {/* z-[2] agar ellipse render di atas vignette hero yang z-[1] */}
            <div className='absolute inset-0 z-[2] pointer-events-none flex justify-center'>
                <div
                    className='relative flex-shrink-0'
                    style={{
                        width: ellipseConfig.size,
                        height: ellipseConfig.size,
                        top: ellipseConfig.topOffset,
                    }}
                >
                    <Image
                        src='/about/red-ellipse.webp'
                        alt='Red ellipse decoration'
                        fill
                        className='object-contain'
                        style={{
                            opacity: ellipseConfig.opacity,
                            maskImage: ellipseConfig.blur,
                            WebkitMaskImage: ellipseConfig.blur,
                        }}
                        quality={100}
                        priority
                    />
                </div>
            </div>

            <div className='relative w-full h-full flex justify-center'>
                <div className='absolute inset-0 z-[1] overflow-hidden pointer-events-none'>
                    {emberParticles.map((p) => (
                        <motion.span
                            key={p.id}
                            className='absolute rounded-full bg-red-500/70 blur-[1px]'
                            style={{
                                left: `${p.left}%`,
                                bottom: '-5%',
                                width: p.size,
                                height: p.size,
                            }}
                            animate={{
                                y: ['0%', '-120vh'],
                                x: [0, p.drift],
                                opacity: [0, 0.9, 0.9, 0],
                            }}
                            transition={{
                                duration: p.duration,
                                delay: p.delay,
                                repeat: Infinity,
                                ease: 'linear',
                            }}
                        />
                    ))}
                </div>

                <motion.div
                    className='relative z-[3] max-w-4xl w-full flex flex-col items-center justify-center text-center'
                    variants={staggerContainer}
                    initial='hidden'
                    animate={inView ? 'visible' : 'hidden'}
                >
                    <motion.h2
                        variants={fadeInUp}
                        className='font-westmeath text-4xl md:text-5xl lg:text-6xl text-white mb-4 tracking-wider uppercase'
                    >
                        ABOUT US
                    </motion.h2>
                    <ScrollBlurParagraph words={aboutWords} />
                    <motion.div variants={fadeInUp}>
                        <Link
                            href='/about'
                            className='relative group flex items-center justify-center w-[220px] h-[65px] md:w-[320px] md:h-[62px] transition-transform hover:scale-105 active:scale-95'
                        >
                            <Image
                                src='/about/get-ticket-button.webp'
                                alt='Get to know us'
                                fill
                                className='object-contain'
                                quality={100}
                            />
                            <span className='relative z-10 font-westmeath text-white text-lg md:text-xl leading-none uppercase tracking-tight -mt-1 md:-mt-2'>
                                get to know us
                            </span>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

export default AboutUsSection;
