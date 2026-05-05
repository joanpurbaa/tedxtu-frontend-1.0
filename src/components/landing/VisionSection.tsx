"use client"
import { ElementsCard } from '../ElementsCard';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export function VisionSection() {
    // State untuk animasi scroll
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2
    });

    // State untuk animasi hover pada kartu
    const [hoverVision, setHoverVision] = useState(false);
    const [hoverMission, setHoverMission] = useState(false);

    // State untuk menyimpan posisi scroll untuk efek parallax
    const [scrollY, setScrollY] = useState(0);
    
    // Ref untuk elemen dekoratif
    const decorRef1 = useRef<HTMLDivElement>(null);
    const decorRef2 = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Handler untuk efek parallax saat scroll
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        // Efek animasi untuk elemen dekoratif
        const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
            if (decorRef1.current && decorRef2.current) {
                const x = e.clientX / window.innerWidth;
                const y = e.clientY / window.innerHeight;
                
                decorRef1.current.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
                decorRef2.current.style.transform = `translate(${-x * 15}px, ${-y * 15}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <section
            id='about'
            className='flex flex-col justify-center items-center px-4 md:px-6 lg:px-8 py-16 relative overflow-hidden'
            ref={ref}
        >
            {/* Elemen dekoratif background */}
            <div 
                ref={decorRef1}
                className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-red-500/5 blur-3xl animate-float-slow"
                style={{
                    animationDelay: '0s',
                    transform: `translateY(${scrollY * 0.03}px)`
                }}
            />
            
            <div 
                ref={decorRef2}
                className="absolute -bottom-32 -right-20 w-80 h-80 rounded-full bg-amber-500/5 blur-3xl animate-float-slow"
                style={{
                    animationDelay: '1.5s',
                    transform: `translateY(${-scrollY * 0.02}px)`
                }}
            />

            <div className='container flex flex-col items-center relative z-10'>
                {/* Heading dengan animasi fade-in dan slide-up */}
                <h2 
                    className={`
                        inline-flex items-center font-bold text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl relative
                        transition-all duration-1000 ease-out
                        ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                    `}
                >
                    <span className="relative">
                        Vision
                        <span className={`
                            absolute -bottom-2 left-0 w-full h-1 bg-red-500 transform scale-x-0 origin-left 
                            transition-transform duration-1000 delay-500
                            ${inView ? 'scale-x-100' : 'scale-x-0'}
                        `} />
                    </span>
                    <span className='flex items-center font-[family-name:var(--font-playfair-display)] lg:text-3xl italic font-normal mx-4 lg:mx-4 inline-block animate-pulse-slow'>
                        And
                    </span>
                    <span className="relative">
                        Mission
                        <span className={`
                            absolute -bottom-2 left-0 w-full h-1 bg-black transform scale-x-0 origin-left 
                            transition-transform duration-1000 delay-700
                            ${inView ? 'scale-x-100' : 'scale-x-0'}
                        `} />
                    </span>
                </h2>

                {/* Cards dengan staggered animation */}
                <div className='flex flex-col space-y-5 w-full mt-14'>
                    <div 
                        className={`
                            transform transition-all duration-1000 ease-out
                            ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}
                        `}
                        onMouseEnter={() => setHoverVision(true)}
                        onMouseLeave={() => setHoverVision(false)}
                    >
                        <ElementsCard
                            variant='red'
                            title='Vision'
                            content='With a 5-year vision, we aim to create a platform for impactful discussions, inspire innovative solutions, and enhance the quality of potential students through the making of the right environment ourselves.'
                            className={`
                                transform transition-all duration-500
                                ${hoverVision ? 'scale-105 shadow-lg' : 'scale-100'}
                            `}
                        />
                        
                        {/* Animated particles for Vision card */}
                        {hoverVision && (
                            <div className="absolute pointer-events-none">
                                {[...Array(5)].map((_, i) => (
                                    <div 
                                        key={i}
                                        className="absolute w-2 h-2 rounded-full bg-red-200 animate-float"
                                        style={{
                                            left: `${Math.random() * 100}%`,
                                            top: `${Math.random() * 100}%`,
                                            animationDuration: `${3 + Math.random() * 4}s`,
                                            animationDelay: `${i * 0.2}s`,
                                            opacity: 0.7
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <div 
                        className={`
                            transform transition-all duration-1000 delay-300 ease-out
                            ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}
                        `}
                        onMouseEnter={() => setHoverMission(true)}
                        onMouseLeave={() => setHoverMission(false)}
                    >
                        <ElementsCard
                            variant='black'
                            title='Mission'
                            content="To build a sustainable legacy by leveraging Telkom's potential resources, fostering collaboration across disciplines, and addressing relevant local issues to shape an ideal society."
                            className={`
                                transform transition-all duration-500
                                ${hoverMission ? 'scale-105 shadow-lg' : 'scale-100'}
                            `}
                        />
                        
                        {/* Animated particles for Mission card */}
                        {hoverMission && (
                            <div className="absolute pointer-events-none">
                                {[...Array(5)].map((_, i) => (
                                    <div 
                                        key={i}
                                        className="absolute w-2 h-2 rounded-full bg-amber-200 animate-float"
                                        style={{
                                            left: `${Math.random() * 100}%`,
                                            top: `${Math.random() * 100}%`,
                                            animationDuration: `${3 + Math.random() * 4}s`,
                                            animationDelay: `${i * 0.2}s`,
                                            opacity: 0.7
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}