'use client';
import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import useCountdown from '@/hooks/useCountdown';
import Gallery from '../../../components/sections/event/Gallery';
import InteractiveActivities from '../../../components/sections/event/InteractiveActivities';
import BackToTopButton from '@/components/ui/backToTopButton';
import Footer from '@/components/layout/Footer';
import Speakers from '@/components/sections/event/Speakers';
import VenueInfo from '@/components/sections/event/VenueInfo';
import TicketSelection from '@/components/sections/event/TicketSelection';
import { EVENT_START_DATE } from '@/lib/eventDate';

// Memoized so the hero countdown's 1s tick (isolated in HeroCountdown below)
// never triggers a re-render of these heavy, image/animation-heavy sections.
const MemoSpeakers = React.memo(Speakers);
const MemoInteractiveActivities = React.memo(InteractiveActivities);
const MemoVenueInfo = React.memo(VenueInfo);
const MemoTicketSelection = React.memo(TicketSelection);
const MemoGallery = React.memo(Gallery);

function formatCountdownUnit(value: number) {
    return value.toString().padStart(2, '0');
}

const COUNTDOWN_UNITS = ['Days', 'Hours', 'Minutes', 'Seconds'] as const;

// Isolated so the 1s countdown tick only re-renders this small block,
// instead of the whole page (hero + Speakers + InteractiveActivities + VenueInfo + TicketSelection + Gallery).
const HeroCountdown = () => {
    const { totalHours, minutes, seconds } = useCountdown(EVENT_START_DATE);
    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;
    const values = [days, hours, minutes, seconds];

    return (
        <div className='mt-24 sm:mt-28 flex items-start justify-center gap-3 sm:gap-6 md:gap-8'>
            {COUNTDOWN_UNITS.map((label, index) => (
                <React.Fragment key={label}>
                    <div className='flex flex-col items-center'>
                        <div className='relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl sm:h-20 sm:w-20 md:h-24 md:w-24'>
                            <Image
                                src='/speakers/Texture.svg'
                                alt=''
                                fill
                                sizes='96px'
                                className='object-cover'
                            />
                            <span className='relative z-10 font-westmeath text-2xl font-bold text-white sm:text-4xl md:text-5xl'>
                                {formatCountdownUnit(values[index])}
                            </span>
                        </div>
                        <span className='mt-3 font-raleway text-[10px] uppercase tracking-[0.15em] text-white sm:text-xs'>
                            {label}
                        </span>
                    </div>
                    {index < COUNTDOWN_UNITS.length - 1 && (
                        <span className='flex h-14 items-center font-westmeath text-2xl font-bold text-white sm:h-20 sm:text-4xl md:h-24 md:text-5xl'>
                            :
                        </span>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

const EventPage = () => {
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        setIsVisible(true);
    }, []);

    React.useEffect(() => {
        if (!window.location.hash) return;
        const id = window.location.hash.slice(1);
        const target = document.getElementById(id);
        if (!target) return;
        const timeout = setTimeout(() => {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <>
            <main
                id='hero'
                className='relative w-full min-h-screen flex flex-col bg-black overflow-hidden'
            >
                <Navbar />

                <div className='absolute inset-0 z-0 overflow-hidden'>
                    <Image
                        src='/speakers/heroBackground.webp'
                        alt='Hero background'
                        fill
                        sizes='100vw'
                        className='scale-110 object-cover blur-[3px] sm:blur-[6px]'
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
                                    quality={75}
                                    className='w-3 sm:w-4 md:w-5 lg:w-6 h-auto -rotate-[15deg]'
                                />
                                <span className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-wide'>
                                    Event
                                </span>
                            </div>
                            <div className='mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide'>
                                TED
                                <span className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl'>
                                    x
                                </span>
                                TELKOM UNIVERSITY
                            </div>
                            <div className='mt-2 text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide'>
                                2026
                            </div>
                        </h1>

                        <HeroCountdown />
                    </div>
                </div>
            </main>
            <MemoSpeakers />
            <MemoInteractiveActivities />
            <MemoVenueInfo />
            <MemoTicketSelection />
            <MemoGallery />
            <Footer />
            <BackToTopButton />
        </>
    );
};

export default EventPage;
