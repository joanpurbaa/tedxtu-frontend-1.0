'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Link, Play, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Gallery from './Gallery';
import Speakers from './Speakers';
import TicketSelection from './ticketSelection';
import { ElementsButton } from '@/components/ElementsButton';
import { MapSection, SpeakersSection } from '@/components/landing';
import Footer from '@/components/landing/FooterSection';
import BackToTopButton from '@/components/BackToTopButton';

const EventPage = () => {
    const [isVisible, setIsVisible] = React.useState(false);
    const [isVideoModalOpen, setIsVideoModalOpen] = React.useState(false);

    // Define decorative elements for floating images with responsive sizing
    const decorElements = [
        { src: '/hero/v1.png', top: '10%', left: '5%', size: { base: 25, sm: 30, md: 35, lg: 40 } },
        { src: '/hero/v2.png', top: '1%', right: '15%', size: { base: 30, sm: 35, md: 45, lg: 50 } },
        { src: '/hero/v3.png', bottom: '15%', left: '15%', size: { base: 20, sm: 25, md: 30, lg: 35 } },
        { src: '/hero/v4.png', bottom: '10%', right: '20%', size: { base: 25, sm: 30, md: 40, lg: 45 } },
    ];

    React.useEffect(() => {
        setIsVisible(true);
    }, []);

    // Helper function to get responsive size
    const getResponsiveSize = (sizeObj: { base: number; sm: number; md: number; lg: number }) => {
        if (typeof window === 'undefined') return sizeObj.base;

        const width = window.innerWidth;
        if (width >= 1024) return sizeObj.lg;
        if (width >= 768) return sizeObj.md;
        if (width >= 640) return sizeObj.sm;
        return sizeObj.base;
    };

    type FloatingElementProps = {
        src: string;
        style?: React.CSSProperties;
        size?: { base: number; sm: number; md: number; lg: number } | number;
        delay?: number;
    };

    const FloatingElement: React.FC<FloatingElementProps> = ({ src, style, size = 40, delay = 0 }) => {
        const [currentSize, setCurrentSize] = React.useState(
            typeof size === 'object' ? getResponsiveSize(size) : size
        );

        React.useEffect(() => {
            const handleResize = () => {
                if (typeof size === 'object') {
                    setCurrentSize(getResponsiveSize(size));
                }
            };

            handleResize();
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, [size]);

        return (
            <div
                style={{
                    position: 'absolute',
                    width: currentSize,
                    height: currentSize,
                    pointerEvents: 'none',
                    zIndex: 1,
                    animation: `floatY 6s ease-in-out infinite`,
                    animationDelay: `${delay * 0.5}s`,
                    ...style,
                }}
                className="hidden sm:block"
            >
                <Image src={src} alt="" width={currentSize} height={currentSize} style={{ width: '100%', height: '100%' }} />
            </div>
        );
    };

    const VideoModal = () => {
        if (!isVideoModalOpen) return null;
        return (
            <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
                <div className="relative w-full max-w-4xl">
                    <button
                        onClick={() => setIsVideoModalOpen(false)}
                        className="absolute -top-10 right-0 text-white hover:text-red-500 transition-colors duration-200 z-10"
                    >
                        <X size={32} />
                    </button>
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                        <iframe
                            className="absolute top-0 left-0 w-full h-full rounded-lg"
                            src="https://drive.google.com/file/d/1Kt8TMQKAM338JNtf6U5W1xFCOmavjXu5/preview"
                            allow="autoplay"
                            allowFullScreen
                            title="TEDxTelkomUniversity 2025 After Movie"
                        />
                        <video
                            className="absolute top-0 left-0 w-full h-full rounded-lg hidden"
                            controls
                            poster="/videos/after-movie-poster.jpg"
                        >
                            <source src="https://drive.google.com/uc?export=download&id=1Kt8TMQKAM338JNtf6U5W1xFCOmavjXu5" type="video/mp4" />
                            <source src="/videos/after-movie.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div className="text-center mt-4">
                        <h3 className="text-white text-lg sm:text-xl font-semibold">TEDxTelkomUniversity 2025 - After Movie</h3>
                        <p className="text-gray-300 text-xs sm:text-sm mt-2">Weaving Ourselves Through "Tailoring Your Own Tapestry"</p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <main id='hero' className='bg-black min-h-screen flex flex-col overflow-hidden'>
                <Navbar />
                <TicketSelection />
                <div className='flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8'>
                    <div className='container relative max-w-7xl'>
                        <div
                            className={`
                                absolute inset-0 -z-9 h-[70%] w-[70%] sm:h-[80%] sm:w-[80%] md:h-[85%] md:w-[85%] lg:h-[90%] lg:w-[90%] mx-auto
                                transition-all duration-1000 ease-in-out
                                ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
                            `}
                            style={{
                                transform: 'translateY(-10%)',
                            }}
                        >
                            <Image
                                src='/text-hero-background.png'
                                alt='text background vector'
                                fill
                                className='object-contain'
                            />
                        </div>
                        <div className="absolute inset-0 pointer-events-none">
                            {[...Array(8)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-amber-200/30 animate-float"
                                    style={{
                                        left: `${10 + Math.random() * 80}%`,
                                        top: `${10 + Math.random() * 80}%`,
                                        animationDelay: `${i * 0.5}s`,
                                        animationDuration: `${6 + Math.random() * 10}s`
                                    }}
                                />
                            ))}
                        </div>
                        <div className='mx-auto text-center relative z-10'>
                            <h1 className={`
                                scroll-m-20 font-bold text-xl sm:text-2xl md:text-4xl lg:text-6xl xl:text-7xl relative 
                                font-[family-name:var(--font-cinzel-decorative)]
                                transition-all duration-1000 ease-out
                                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                            `}>
                                <span className='inline-flex items-center font-[family-name:var(--font-cinzel-decorative)] flex-wrap justify-center'>
                                    <span className='whitespace-nowrap'>Main</span>
                                    <span className='flex items-center font-[family-name:var(--font-playfair-display)] text-sm sm:text-base md:text-2xl lg:text-5xl italic font-normal'>
                                        <div className="relative mx-1 sm:mx-2 md:mx-4 lg:mx-6 w-[15px] h-[15px] sm:w-[20px] sm:h-[20px] md:w-[35px] md:h-[35px] lg:w-[80px] lg:h-[80px] xl:w-[120px] xl:h-[120px]">
                                            <Image
                                                src='/flower-ilus.svg'
                                                alt='hero text icon'
                                                width={120}
                                                height={120}
                                                quality={100}
                                                className={`
                                                    inline-block w-full h-full 
                                                    animate-pulse-slow transition-transform duration-700
                                                `}
                                            />
                                        </div>
                                    </span>
                                    <span className='whitespace-nowrap'>Event</span>
                                </span>
                                <br className="sm:hidden" />
                                <span className='inline-flex items-center flex-wrap justify-center mt-2 sm:mt-0'>
                                    <span className='whitespace-nowrap'>TEDxTelkomUniversity</span>
                                    <span className='flex items-center font-[family-name:var(--font-playfair-display)] text-sm sm:text-base md:text-2xl lg:text-5xl italic font-normal'>
                                        <div className="relative mx-1 sm:mx-2 md:mx-4 lg:mx-6 w-[15px] h-[15px] sm:w-[20px] sm:h-[20px] md:w-[35px] md:h-[35px] lg:w-[80px] lg:h-[80px] xl:w-[120px] xl:h-[120px]">
                                            <Image
                                                src='/flower-ilus.svg'
                                                alt='hero text icon'
                                                width={120}
                                                height={120}
                                                quality={100}
                                                className={`
                                                    inline-block w-full h-full
                                                    animate-pulse-slow transition-transform duration-700
                                                    animation-delay-500
                                                `}
                                            />
                                        </div>
                                    </span>
                                    <span className="relative whitespace-nowrap">
                                        2025
                                        <span className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 sm:h-1 bg-amber-500 transform scale-x-0 origin-left transition-transform duration-1000 delay-1000"
                                        />
                                    </span>
                                </span>
                            </h1>
                            {decorElements.map((elem, index) => (
                                <FloatingElement
                                    key={index}
                                    src={elem.src}
                                    style={{
                                        top: elem.top || "auto",
                                        left: elem.left || "auto",
                                        right: elem.right || "auto",
                                        bottom: elem.bottom || "auto"
                                    }}
                                    size={elem.size}
                                    delay={index}
                                />
                            ))}
                            <p className={`
                                mt-4 sm:mt-6 md:mt-8 text-sm sm:text-base md:text-lg lg:text-xl font-[family-name:var(--font-raleway)] italic font-medium
                                transition-all duration-1000 delay-500 ease-out px-4 sm:px-0
                                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                            `}>
                                Weaving Ourselves Through "Tailoring Your Own Tapestry"
                            </p>
                            <div className={`
                                mt-6 sm:mt-8 flex justify-center gap-6
                                transition-all duration-1000 delay-700 ease-out
                                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                            `}>
                                <ElementsButton
                                    variant='red'
                                    className="whitespace-nowrap w-full sm:w-auto sm:min-w-[280px] hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2 px-4 sm:px-6"
                                    onClick={() => setIsVideoModalOpen(true)}
                                >
                                    <Play size={20} />
                                    <span className="text-sm sm:text-base">Watch After Movie</span>
                                </ElementsButton>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-t from-black to-transparent z-10' />
            </main>
            <VideoModal />
            <MapSection />
            <SpeakersSection />
            <Speakers />
            <Gallery />
            <Footer />
            <BackToTopButton />
        </>
    );
};

export default EventPage;
