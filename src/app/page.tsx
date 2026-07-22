import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import AboutUsSection from '@/components/sections/landing/AboutUsSection';
import EventSection from '@/components/sections/landing/EventSection';
import FaqSection from '@/components/sections/landing/FaqSection';
import { HeroSection } from '@/components/sections/landing/HeroSection';

export default function Home() {
    return (
        <>
            <Navbar />
            <HeroSection />
            <AboutUsSection />
            <EventSection />
            <FaqSection />
            <Footer />
        </>
    );
}
