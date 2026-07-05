'use client';

import { useEffect, useRef } from 'react';
import {
    HeroSection,
    FaqSection,
    AboutUsSection,
    EventSection,
    MerchSection,
} from '@/components/landing';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Footer from './FooterSection';
import Navbar from '../Navbar';
import BackToTopButton from '../BackToTopButton';

export function ClientHomePage() {
    const countdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        gsap.registerPlugin(ScrollTrigger);

        const countdownElement = countdownRef.current;

        if (!countdownElement) return;

        gsap.set(countdownElement, {
            yPercent: -100,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            opacity: 0,
        });

        ScrollTrigger.create({
            trigger: document.body,
            start: '100px top',
            end: '101px top',
            onEnter: () => {
                gsap.to(countdownElement, {
                    yPercent: 0,
                    opacity: 1,
                    duration: 0.5,
                    ease: 'elastic.out(0.5, 0.4)',
                });
            },
            onLeaveBack: () => {
                gsap.to(countdownElement, {
                    yPercent: -100,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.in',
                });
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <div className='min-h-screen bg-[#000000] bg-cover bg-top bg-no-repeat relative overflow-x-hidden'>
            <div>
                <Navbar />
                <HeroSection />
                <AboutUsSection />
                <EventSection />
                {/* <MerchSection /> */}
                <FaqSection />
                <Footer />
                <BackToTopButton />
            </div>
        </div>
    );
}
