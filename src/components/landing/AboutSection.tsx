"use client"
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ImageAccordion } from '../ui/image-accordion';
import { motion } from 'framer-motion';

// Import your image assets
import licenseeClosedBg from '../../../public/about/licensee-closed.png';
import staffClosedBg from '../../../public/about/staff-closed.png';
import staffOpenBg from '../../../public/about/staff-opened.png';
import contentBg from '../../../public/about/content-bg.png';

export function AboutSection() {
    // Animation hooks for scroll-triggered animations
    const [mainRef, mainInView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const [accordionRefs] = useState({
        licensee: useInView({ triggerOnce: true, threshold: 0.1 }),
        execProd: useInView({ triggerOnce: true, threshold: 0.1 }),
        pno: useInView({ triggerOnce: true, threshold: 0.1 }),
        marketing: useInView({ triggerOnce: true, threshold: 0.1 }),
        ens: useInView({ triggerOnce: true, threshold: 0.1 })
    });

    const [scrollY, setScrollY] = useState(0);

    // Refs for decorative elements
    const decorRef1 = useRef<HTMLDivElement>(null);
    const decorRef2 = useRef<HTMLDivElement>(null);
    const decorRef3 = useRef<HTMLDivElement>(null);

    // Mouse position for interactive effects
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // Scroll handler for parallax effects
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        // Mouse movement handler for interactive animations
        const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
            setMousePosition({
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight
            });

            if (decorRef1.current && decorRef2.current && decorRef3.current) {
                decorRef1.current.style.transform = `translate(${e.clientX * 0.01}px, ${e.clientY * 0.01}px)`;
                decorRef2.current.style.transform = `translate(${-e.clientX * 0.02}px, ${-e.clientY * 0.02}px)`;
                decorRef3.current.style.transform = `translate(${e.clientX * 0.015}px, ${-e.clientY * 0.015}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // Animation variants for framer-motion
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };



    return (
        <section
            id='about'
            className='min-h-screen flex flex-col justify-center items-center px-4 md:px-6 lg:px- py-16 relative overflow-hidden'
            ref={mainRef}
        >
            {/* Decorative floating elements */}
            <div
                ref={decorRef1}
                className="absolute top-20 -left-20 w-72 h-72 rounded-full bg-red-500/5 blur-3xl animate-float-slow"
                style={{
                    animationDelay: '0s',
                    transform: `translateY(${scrollY * 0.02}px)`
                }}
            />

            <div
                ref={decorRef2}
                className="absolute -bottom-40 right-20 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl animate-float-slow"
                style={{
                    animationDelay: '1.5s',
                    transform: `translateY(${-scrollY * 0.03}px)`
                }}
            />

            <div
                ref={decorRef3}
                className="absolute top-1/2 -right-32 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl animate-float-slow"
                style={{
                    animationDelay: '3s',
                    transform: `translateY(${scrollY * 0.01}px)`
                }}
            />

            {/* Floating particles */}
            {mainInView && (
                <>
                    {[...Array(10)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 rounded-full bg-amber-400/40 animate-float"
                            style={{
                                left: `${10 + Math.random() * 80}%`,
                                top: `${10 + Math.random() * 80}%`,
                                animationDuration: `${6 + Math.random() * 8}s`,
                                animationDelay: `${i * 0.5}s`
                            }}
                        />
                    ))}
                </>
            )}

            <div className='container flex flex-col items-center relative z-10'>
                {/* Animated heading */}
                <motion.h2
                    className='inline-flex items-center font-bold text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl relative'
                    initial={{ opacity: 0, y: 20 }}
                    animate={mainInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="relative">
                        About Us
                        <motion.span
                            className="absolute -bottom-2 left-0 w-full h-1 bg-red-500"
                            initial={{ scaleX: 0 }}
                            animate={mainInView ? { scaleX: 1 } : { scaleX: 0 }}
                            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                            style={{ transformOrigin: "left" }}
                        />
                    </span>
                </motion.h2>

                {/* Full width accordion at the top with staggered animation */}

                {/* Two-column grid layout for additional accordions */}
                <motion.div
                    className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 w-full mt-4 sm:mt-6'
                    variants={staggerContainer}
                    initial="hidden"
                    animate={mainInView ? "visible" : "hidden"} /*  */
                >
                    {/* Left Column */}
                    <div className='flex flex-col space-y-4 sm:space-y-6'>
                        <motion.div
                            variants={fadeInUp}
                            className="transform transition-all duration-500 hover:scale-[1.02] hover:shadow-xl"
                            ref={accordionRefs.execProd.ref}
                        >
                            <ImageAccordion
                                title="Licensee."
                                closedHeaderImage={staffClosedBg.src}
                                openHeaderImage={staffOpenBg.src}
                                contentImage={contentBg.src}
                                className="accordion-animate"
                            >
                                <p className="mb-4">
                                    Licensee is responsible for obtaining and maintaining the TEDx licensee, leading event planning, managing the team, curating speakers, ensuring content quality, and fostering a lasting community. All while complying with TED guidelines to deliver an impactful experience.
                                </p>
                            </ImageAccordion>
                        </motion.div>
                        <motion.div
                            variants={fadeInUp}
                            className="transform transition-all duration-500 hover:scale-[1.02] hover:shadow-xl"
                            ref={accordionRefs.pno.ref}
                        >
                            <ImageAccordion
                                title="PNO"
                                closedHeaderImage={staffClosedBg.src}
                                openHeaderImage={staffOpenBg.src}
                                contentImage={contentBg.src}
                                className="accordion-animate"
                            >
                                <p className="mb-4">
                                    Partnership and Operations TEDx is responsible for managing partnerships, coordinating event logistics, handling budgets, and ensuring a seamless experience for partners and participants.
                                </p>
                                <h3 className="text-xl font-semibold mb-2">Sponsor & Partnership</h3>
                                <p className="mb-4">
                                    Coordinate sponsor deliverables and benefits, ensure all partnerships align with TEDx values, maintain timely and professional communication with sponsors, and assist the manager in drafting and personalizing sponsor outreach materials.
                                </p>
                                <h3 className="text-xl font-semibold mb-2">Finance</h3>
                                <p className="mb-4">
                                    Handle payment processes for vendors and sponsors, track and record ticket sales and associated costs, and organize invoices, receipts, and other necessary financial records.
                                </p>

                                <h3 className="text-xl font-semibold mb-2">Venue & Consumption</h3>
                                <p className="mb-4">
                                    Research and assess venues for suitability, accessibility, and technical needs. Set up and test audio-visual equipment, coordinate with security, oversee setup, manage clean-up, and ensure timely food distribution with selected catering vendors.
                                </p>
                                <h3 className="text-xl font-semibold mb-2">Logistic</h3>
                                <p className="mb-4">
                                    Develop a logistics plan covering timing, location, and event requirements. Identify and rent or purchase necessary equipment, assign vehicles for specific tasks, and oversee logistics execution during the event. Handle post-event logistics by collecting, packing, and storing resources.
                                </p>

                            </ImageAccordion>
                        </motion.div>
                    </div>

                    {/* Right Column */}
                    <div className='flex flex-col space-y-4 sm:space-y-6'>


                        <motion.div
                            variants={fadeInUp}
                            className="transform transition-all duration-500 hover:scale-[1.02] hover:shadow-xl"
                            ref={accordionRefs.execProd.ref}
                        >
                            <ImageAccordion
                                title="Executive Prod."
                                closedHeaderImage={staffClosedBg.src}
                                openHeaderImage={staffOpenBg.src}
                                contentImage={contentBg.src}
                                className="accordion-animate"
                            >
                                <p className="mb-4">
                                    Executive Producer will lead all production and planning for the day of the event. They oversee all of the roles happening on the day of your event related to content production, stage management, technology, and video.
                                </p>
                                <h3 className="text-xl font-semibold mb-2">Event</h3>
                                <p className="mb-4">
                                    Assist with the setup and breakdown of event spaces according to guidelines, coordinate event activities and presentations, address questions and concerns, resolve any issues that arise, and distribute event materials such as programs, handouts, and refreshments.
                                </p>
                                <h3 className="text-xl font-semibold mb-2">Communication</h3>
                                <p className="mb-4">
                                    Support the Communication Manager in executing the communication strategy, provide administrative assistance, create Terms of Reference (TOR) documents, reach out to potential speakers and negotiate their participation, and develop and administer post-event surveys to collect feedback from attendees and speakers.
                                </p>
                            </ImageAccordion>
                        </motion.div>

                        <motion.div
                            variants={fadeInUp}
                            className="transform transition-all duration-500 hover:scale-[1.02] hover:shadow-xl"
                            ref={accordionRefs.ens.ref}
                        >
                            <ImageAccordion
                                title="ENS"
                                closedHeaderImage={staffClosedBg.src}
                                openHeaderImage={staffOpenBg.src}
                                contentImage={contentBg.src}
                                className="accordion-animate"
                            >
                                <h3 className="text-xl font-semibold mb-2">Audience</h3>
                                <p className="mb-4">
                                    Design and implement audience engagement strategies, oversee audience service operations, analyze data to identify trends, manage feedback, and collaborate with departments to improve the audience experience. </p>
                                <h3 className="text-xl font-semibold mb-2">Internal Sustainability</h3>
                                <p className="mb-4">
                                    Support internal team engagement and well-being, implement communication strategies and feedback systems, assist with training and development, and help evaluate and report on staff satisfaction.   </p>
                                <h3 className="text-xl font-semibold mb-2">Marketing</h3>
                                <p className="mb-4">
                                    Create content briefs and manage TikTok and Instagram for TEDx Telkom University, handle social media and copywriting, ensure task alignment with workflow, and collaborate on short video content creation.  </p>
                                <h3 className="text-xl font-semibold mb-2">Documentation</h3>
                                <p className="mb-4">
                                    Prepare and operate event documentation equipment, ensure SOP compliance, assist with editing, and produce audio-visual content like bumpers, teasers, and after-movies.</p>
                                <h3 className="text-xl font-semibold mb-2">Website</h3>
                                <p className="mb-4">
                                    Develop the website based on the brief, ensure domain, hosting, and tool compatibility, maintain security, and manage website operations.</p>
                            </ImageAccordion>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Animated accent shapes */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden">
                <svg
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    className="w-full h-12 text-amber-500/10 rotate-180"
                    style={{ transform: `translateY(${scrollY * 0.05}px) rotate(180deg)` }}
                >
                    <path
                        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                        className="fill-current"
                    />
                </svg>
            </div>

            {/* Custom styled cursor effect for interactivity */}
            <div
                className="fixed w-12 h-12 rounded-full bg-gradient-to-r from-red-400 to-amber-400 opacity-20 pointer-events-none z-50 mix-blend-screen blur-md"
                style={{
                    left: typeof window !== 'undefined' ? `${mousePosition.x * window.innerWidth}px` : '0px',
                    top: typeof window !== 'undefined' ? `${mousePosition.y * window.innerHeight}px` : '0px',
                    transform: 'translate(-50%, -50%)'
                }}
            />
        </section>
    );
}
