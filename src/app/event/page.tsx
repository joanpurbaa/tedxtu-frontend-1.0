'use client';
import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import useCountdown from '@/hooks/useCountdown';
import Gallery from './Gallery';
import Speakers from './Speakers';
import InteractiveActivities from './InteractiveActivities';
import VenueInfo from './VenueInfo';
import TicketSelection from './TicketSelection';
import Footer from '@/components/landing/FooterSection';
import BackToTopButton from '@/components/BackToTopButton';

const EVENT_START_DATE = '2027-01-16T08:00:00+07:00';

function formatCountdownUnit(value: number) {
    return value.toString().padStart(2, '0');
}

const EventPage = () => {
    const [isVisible, setIsVisible] = React.useState(false);
    const { totalHours, minutes, seconds } = useCountdown(EVENT_START_DATE);
    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;

    React.useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <>
            <main id='hero' className='relative w-full min-h-screen flex flex-col bg-black overflow-hidden'>
                <Navbar />

                <div className='absolute inset-0 z-0'>
                    <Image
                        src='/speakers/heroBackground.svg'
                        alt='Hero background'
                        fill
                        className='object-cover'
                        priority
                    />
                </div>
                <div className='absolute inset-0 z-[1] pointer-events-none'>
                    <div className='absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black via-black/70 to-transparent' />
                    <div className='absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/90 to-transparent' />
                    <div className='absolute inset-x-0 bottom-0 h-16 bg-black' />
                </div>

                <div className='relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8'>
                    <div
                        className={`
                            text-center transition-all duration-1000 ease-out
                            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                        `}
                    >
                        <h1 className='font-westmeath text-white'>
                            <div className='flex items-center justify-center gap-2 sm:gap-4 flex-wrap'>
                                <span className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-wide'>
                                    Main
                                </span>
                                <Image
                                    src='/about/music-note.webp'
                                    alt='Music note'
                                    width={80}
                                    height={80}
                                    quality={100}
                                    className='w-3 sm:w-4 md:w-5 lg:w-6 h-auto -rotate-[15deg]'
                                />
                                <span className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-wide'>
                                    Event
                                </span>
                            </div>
                            <div className='mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide'>
                                TED<span className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl'>x</span>TELKOM UNIVERSITY
                            </div>
                            <div className='mt-2 text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide'>
                                2026
                            </div>
                        </h1>

                        <div className='mt-24 sm:mt-28 flex items-start justify-center gap-3 sm:gap-6 md:gap-8'>
                            {
                                [
                                    { value: days, label: 'Days' },
                                    { value: hours, label: 'Hours' },
                                    { value: minutes, label: 'Minutes' },
                                    { value: seconds, label: 'Seconds' },
                                ].map((unit, index, arr) => (
                                    <React.Fragment key={unit.label}>
                                        <div className="flex flex-col items-center">
                                            <span className="font-westmeath text-2xl font-bold text-white sm:text-4xl md:text-5xl">
                                                {formatCountdownUnit(unit.value)}
                                            </span>
                                            <span className="mt-1 font-raleway text-[10px] uppercase tracking-[0.15em] text-white/60 sm:text-xs">
                                                {unit.label}
                                            </span>
                                        </div>
                                        {index < arr.length - 1 && (
                                            <span className="font-westmeath text-2xl font-bold text-white sm:text-4xl md:text-5xl">
                                                :
                                            </span>
                                        )}
                                    </React.Fragment>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </main>
            <Speakers />
            <InteractiveActivities />
            <VenueInfo />
            <TicketSelection />
            <Gallery />
            <Footer />
            <BackToTopButton />
        </>
    );
};

export default EventPage;
