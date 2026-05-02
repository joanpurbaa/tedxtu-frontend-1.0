"use client";
import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    }
};

export function AboutUsSection() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const ellipseConfig = {
        size: "2000px",      
        topOffset: "-108%",  
        opacity: 0.85,       
        blur: "radial-gradient(circle, black 30%, transparent 75%)" 
    };

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
                        top: ellipseConfig.topOffset 
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
                            WebkitMaskImage: ellipseConfig.blur
                        }}
                        quality={100}
                        priority
                    />
                </div>
            </div>

            {/* Content z-[3] agar tetap di atas ellipse */}
            <motion.div
                className='relative z-[3] max-w-4xl w-full flex flex-col items-center justify-center text-center'
                variants={staggerContainer}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
            >
                <motion.h2
                    variants={fadeInUp}
                    className='font-westmeath text-4xl md:text-5xl lg:text-6xl text-white mb-6 tracking-wider uppercase'
                >
                    ABOUT US
                </motion.h2>

                <motion.p
                    variants={fadeInUp}
                    className='font-raleway text-base md:text-xl text-gray-300 mb-10 leading-relaxed max-w-3xl'
                >
                    Lorem ipsum dolor sit amet consectetur adipiscing elit. Adipiscing elit quisque faucibus ex sapien vitae pellentesque. Vitae pellentesque sem placerat in id cursus mi.
                </motion.p>

                <motion.div variants={fadeInUp}>
                    <Link 
                        href='/about' 
                        className='relative group flex items-center justify-center w-[220px] h-[65px] md:w-[320px] md:h-[62px] transition-transform hover:scale-105 active:scale-95'
                    >
                        <Image
                            src='/about/get-ticket-button.png'
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
        </section>
    );
}

export default AboutUsSection;