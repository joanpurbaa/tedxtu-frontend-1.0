'use client';

import {
    HeroSection,
    FaqSection,
    VisionSection,
    AboutSection,
    EventSection,
} from '@/components/landing';
import Footer from './FooterSection';
import Navbar from '../Navbar';
import BackToTopButton from '../BackToTopButton';

export function ClientHomePage() {
    return (
        <div className='min-h-screen bg-[#000000] bg-cover bg-top bg-no-repeat relative overflow-x-hidden'>
            <div>
                <Navbar />

                <div className='absolute -right-56 h-[30%] w-[30%] z-10' />

                <HeroSection />
                <VisionSection />
                <AboutSection />
                <EventSection />
                <FaqSection />
                <Footer />
                <BackToTopButton />
            </div>
        </div>
    );
}