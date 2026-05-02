'use client';
import Image from 'next/image';
import Link from 'next/link';
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

export function MerchSection() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const merchItems = [
        '/merch/keychain-2026.png',
        '/merch/shirt-2026.png',
        '/merch/hat-2026.png',
        '/merch/lanyard-2026.png',
    ];

    const duplicatedItems = [...merchItems, ...merchItems];

    const ellipseConfig = {
        size: "1700px",      
        opacity: 1,        
        blur: "radial-gradient(circle, black 20%, transparent 80%)" 
    };

    return (
        <section
            id='merch'
            ref={ref}
            className='relative w-full min-h-screen flex flex-col items-center justify-center bg-black px-4 py-20'
            style={{ overflow: 'visible' }}
        >
            {/* 1. VIGNETTE LAYER (z-5) */}
            <div className='absolute inset-0 z-[5] pointer-events-none overflow-hidden'>
                <div className='absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-black via-black/70 to-transparent' />
                <div className='absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-black via-black/70 to-transparent' />
            </div>

            {/* 2. YELLOW ELLIPSE LAYER (z-15)
                 Berada di bawah gallery event (z-20) tapi di atas mist (z-10)
                 Bisa extend ke section atas seperti mist
            */}
            <div
                className='absolute inset-0 pointer-events-none flex justify-end'
                style={{
                    overflow: 'visible',
                    zIndex: 15, 
                }}
            >
                <div 
                    className='relative flex-shrink-0 translate-x-1/2' 
                    style={{ 
                        width: ellipseConfig.size, 
                        height: ellipseConfig.size,
                        top: '-110%' 
                    }}
                >
                    <Image
                        src='/about/yellow-ellipse.webp'
                        alt='Yellow ellipse decoration'
                        fill
                        className='object-contain'
                        style={{
                            opacity: ellipseConfig.opacity,
                            maskImage: ellipseConfig.blur,
                            WebkitMaskImage: ellipseConfig.blur
                        }}
                        quality={100}
                    />
                </div>
            </div>

            {/* 3. CONTENT & GALLERY LAYER (z-50) */}
            <motion.div
                className='relative z-[50] w-full flex flex-col items-center justify-center'
                variants={staggerContainer}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
            >
                <div className="relative mb-36 md:mb-48 px-10">
                    <motion.div 
                        variants={fadeInUp}
                        className="absolute -top-12 -left-16 md:-top-20 md:-left-52 w-10 h-10 md:w-20 md:h-20"
                        style={{ rotate: "-18deg" }}
                    >
                        <Image src="/about/crown.webp" alt="Crown" fill className="object-contain" />
                    </motion.div>

                    <motion.h2
                        variants={fadeInUp}
                        className='font-westmeath text-4xl md:text-5xl lg:text-7xl text-white tracking-[0.1em] uppercase text-center relative z-10'
                    >
                        OUR MERCH
                    </motion.h2>

                    <motion.div 
                        variants={fadeInUp}
                        className="absolute -bottom-16 -right-16 md:-bottom-24 md:-right-52 w-12 h-12 md:w-24 md:h-24 rotate-[10deg]"
                    >
                        <Image src="/about/trumpet.webp" alt="Trumpet" fill className="object-contain" />
                    </motion.div>
                </div>

                <div className='w-full overflow-hidden'>
                    <motion.div
                        className='flex gap-8 md:gap-16 w-max py-4'
                        animate={{ x: [0, "-50%"] }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    >
                        {duplicatedItems.map((item, index) => (
                            <div
                                key={index}
                                className='flex-shrink-0 w-64 h-64 md:w-80 md:h-80 relative hover:scale-105 transition-transform'
                            >
                                <Image
                                    src={item}
                                    alt={`Merch item ${index}`}
                                    fill
                                    className='object-contain'
                                    quality={100}
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>

           {/* 4. SEE MORE BUTTON */}
            <motion.div 
                className='absolute bottom-6 right-8 md:bottom-10 md:right-20 z-[50]'
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.5 }}
            >
                <Link href="/merch" className="relative group flex items-center justify-center w-[220px] h-[65px] md:w-[320px] md:h-[62px] transition-transform hover:scale-105 active:scale-95">
                    <Image 
                        src="/about/get-ticket-button.png"
                        alt="See More Button"
                        fill
                        className="object-contain"
                        priority
                    />
                    <span className="relative z-10 font-westmeath text-white text-lg md:text-xl leading-none uppercase tracking-tight -mt-1 md:-mt-2">
                        SEE MORE
                    </span>
                </Link>
            </motion.div>
        </section>
    );
}

export default MerchSection;