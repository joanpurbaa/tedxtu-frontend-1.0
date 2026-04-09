'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function About() {
    const baseConductorCards = [
        'IA',
        'LICENSEE & CO-LICENSEE',
        'PNE',
        'LNO',
        'PNE',
        'MNE',
    ];
    
    const conductorCards = [...baseConductorCards, ...baseConductorCards, ...baseConductorCards];
    
    const middleIndex = baseConductorCards.length;
    const [activeCard, setActiveCard] = useState(middleIndex);
    const [dragStart, setDragStart] = useState<number | null>(null);
    const [isAnimating, setIsAnimating] = useState(true);
    const isTransitioningRef = useRef(false);

    useEffect(() => {
        const total = baseConductorCards.length;
        const firstIndex = total;
        const lastIndex = total * 2 - 1;

        if (activeCard > lastIndex) {
            // Infinite scroll ke depan: jump ke position pertama tanpa animasi setelah transition selesai
            const timeout = setTimeout(() => {
                setIsAnimating(false);
                setActiveCard(firstIndex + (activeCard - (lastIndex + 1)));
                setTimeout(() => setIsAnimating(true), 50);
            }, 500);

            return () => clearTimeout(timeout);
        } else if (activeCard < firstIndex) {
            // Infinite scroll ke belakang: jump ke position terakhir tanpa animasi setelah transition selesai
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
        }, 600); // Slightly longer to match transition duration + buffer
    };

    const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        setDragStart(clientX);
    };

    const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
        if (dragStart === null) return;

        const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as React.MouseEvent).clientX;
        const diff = dragStart - clientX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                // Swiped left, go to next
                navigateCard(1);
            } else {
                // Swiped right, go to prev
                navigateCard(-1);
            }
        }

        setDragStart(null);
    };

    return (
        <>
            <Navbar />
            <main className='relative overflow-x-hidden overflow-y-clip bg-black'>
            <div
                className='pointer-events-none absolute left-1/2 top-[45vh] z-0 -translate-x-1/2 -translate-y-1/2'
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
            </div>
            <section className='relative z-20 w-full min-h-[100dvh] flex items-center justify-center overflow-visible bg-transparent'>
                <div className='absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2'>
                    <Image
                        src='/about/mask.webp'
                        alt='Mask decoration'
                        width={120}
                        height={120}
                        priority
                        quality={100}
                    />
                </div>
                <div className='absolute top-1/4 right-1/4 translate-x-1/2 -translate-y-1/2'>
                    <Image
                        src='/about/trumpet.webp'
                        alt='Trumpet decoration'
                        width={120}
                        height={120}
                        priority
                        quality={100}
                    />
                </div>
                <div className='absolute bottom-1/4 left-1/4 -translate-x-1/2 translate-y-1/2'>
                    <Image
                        src='/about/turn-table.webp'
                        alt='Turn table decoration'
                        width={120}
                        height={120}
                        priority
                        quality={100}
                    />
                </div>
                <div className='absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2' style={{ transform: 'translateX(50%) translateY(50%) rotate(20deg)' }}>
                    <Image
                        src='/about/crown.webp'
                        alt='Crown decoration'
                        width={120}
                        height={120}
                        priority
                        quality={100}
                    />
                </div>
                <div className='relative z-10 text-center'>
                    <div className='flex items-center justify-center gap-8'>
                        <span className='font-westmeath text-6xl md:text-7xl text-white font-bold'>ABOUT</span>
                        <Image
                            src='/about/music-note.webp'
                            alt='Music note'
                            width={30}
                            height={30}
                            priority
                            quality={100}
                            style={{ transform: 'rotate(18deg)' }}
                        />
                        <span className='font-westmeath text-6xl md:text-7xl text-white font-bold'>US</span>
                    </div>
                </div>
            </section>
            <section className='relative z-10 w-full min-h-screen overflow-visible bg-transparent text-white px-4 md:px-14 py-20'>
                <div className='pointer-events-none absolute left-0 top-[60%] -translate-y-1/2 -translate-x-[58%] z-0'>
                    <Image
                        src='/about/yellow-ellipse.webp'
                        alt='Yellow ellipse decoration left'
                        width={900}
                        height={900}
                        priority={false}
                        quality={100}
                        className='w-[160vw] max-w-[1920px] h-auto'
                    />
                </div>
                <div className='pointer-events-none absolute right-0 top-[60%] -translate-y-1/2 translate-x-[58%] z-0'>
                    <Image
                        src='/about/yellow-ellipse.webp'
                        alt='Yellow ellipse decoration right'
                        width={900}
                        height={900}
                        priority={false}
                        quality={100}
                        className='w-[160vw] max-w-[1920px] h-auto'
                    />
                </div>

                <div className='relative z-10 max-w-6xl mx-auto'>
                    <h2 className='font-westmeath text-5xl md:text-6xl text-center mb-12'>OUR THEME</h2>
                    <div className='max-w-4xl mx-auto text-center space-y-12'>
                        <h3
                            className='font-westmeath text-5xl md:text-6xl bg-clip-text text-transparent'
                            style={{
                                backgroundImage:
                                    'linear-gradient(180deg, #DCA23E 0%, #DCA23E 65%, #B45A22 85%, #8A0E04 100%)',
                            }}
                        >
                            "LOREM IPSUM DOLOR SIT AMET"
                        </h3>
                        <p className='font-raleway text-xl md:text-2xl leading-9 text-white/80'>
                            Lorem ipsum dolor sit amet consectetur adipiscing elit. Adipiscing elit quisque faucibus ex sapien vitae pellentesque. Vitae pellentesque sem placerat in id cursus mi. Cursus mi pretium tellus duis convallis tempus leo. Tempus leo eu aenean sed diam urna tempor. Urna tempor pulvinar vivamus fringilla lacus nec metus.
                        </p>
                    </div>
                </div>
            </section>

            <div className='pointer-events-none absolute -left-[11%] z-20' style={{ top: '45%', transform: 'translateY(-50%)' }}>
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
            <section className='relative z-20 w-full min-h-screen bg-transparent text-white px-3 sm:px-6 md:px-14 py-6 sm:py-8 md:py-12'>
                <div className='max-w-6xl mx-auto'>
                    <h2 className='font-westmeath text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center mb-6 sm:mb-8 md:mb-12'>VISION & MISSION</h2>
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
                                    With a 5-year vision, we aim to create a platform for impactful discussions, inspire innovative solutions, and enhance the quality of potential students through the making of ‘the right environment’ ourselves.
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
                                    To build a sustainable legacy by leveraging Telkom&apos;s potential resources, fostering collaboration across disciplines, and addressing relevant local issues to shape an ideal society.
                                </p>
                                <h3 className='font-westmeath text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white text-left md:text-center pt-2 md:pt-0'>
                                    Mission
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='relative z-10 w-full min-h-screen bg-transparent text-white px-4 md:px-14 py-20 mt-20'>
                <div
                    className='pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2'
                >
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
                <div className='pointer-events-none absolute right-0 top-[-300px] z-[5] translate-x-[30%] overflow-hidden'>
                    <Image
                        src='/about/Mist.webp'
                        alt='Mist decoration'
                        width={1200}
                        height={800}
                        priority={false}
                        quality={100}
                        className='w-[85vw] max-w-[1020px] h-auto'
                    />
                </div>

                <div className='relative z-10 max-w-6xl mx-auto'>
                    <h2 className='font-westmeath text-5xl md:text-6xl text-center mb-12'>OUR CONDUCTORS</h2>
                </div>

                <div className='relative w-screen left-1/2 -translate-x-1/2 py-12 overflow-hidden'>
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
                                        key={`${card}-${index}`}
                                        type='button'
                                        onClick={() => {
                                            const total = baseConductorCards.length;
                                            const normalizedIndex = index % total;
                                            const targetIndex = normalizedIndex + total;

                                            let delta = targetIndex - activeCard;

                                            // Shortest path logic
                                            if (delta > total / 2) delta -= total;
                                            if (delta < -total / 2) delta += total;

                                            if (delta !== 0) navigateCard(delta);
                                        }}
                                        className={`relative h-[470px] w-[340px] shrink-0 overflow-hidden rounded-3xl cursor-pointer select-none ${
                                            isAnimating ? 'transition-all duration-500' : ''
                                        } ${
                                            isActive
                                                ? 'scale-100 brightness-100 z-10'
                                                : 'scale-90 brightness-50'
                                        }`}
                                    >
                                        <Image
                                            src='/about/small-yellow-card.webp'
                                            alt={`${card} conductor card`}
                                            fill
                                            quality={100}
                                            className='object-cover'
                                        />
                                        <div
                                            className={`absolute inset-0 ${
                                                isAnimating ? 'transition-colors duration-500' : ''
                                            } ${isActive ? 'bg-black/5' : 'bg-black/50'}`}
                                        />
                                        <div className='relative z-10 flex h-full flex-col items-start justify-start px-8 pt-8'>
                                            <span className='text-left font-westmeath text-6xl md:text-7xl font-bold text-white leading-tight'>
                                                {card}
                                            </span>
                                            <p className='mt-8 max-w-[280px] text-left font-raleway text-2xl leading-9 text-white/90'>
                                                Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.
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
        </>
    );
}
