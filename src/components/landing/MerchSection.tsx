'use client';
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

export function MerchSection() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const merchItems = [
        '/merch/shirt-2026.png',
        '/merch/shirt-2026.png',
        '/merch/keychain-2026.png',
        '/merch/hat-20206.png',
    ];

    // Duplicate items for seamless scrolling
    const duplicatedItems = [...merchItems, ...merchItems];

    return (
        <section
            id='merch'
            ref={ref}
            className='relative w-full min-h-screen flex items-center justify-center bg-black px-4 py-20'
        >
            {/* Content Container */}
            <motion.div
                className='relative z-10 w-full flex flex-col items-center justify-center'
                variants={staggerContainer}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
            >
                {/* Title */}
                <motion.h2
                    variants={fadeInUp}
                    className='font-westmeath text-4xl md:text-5xl lg:text-6xl text-white mb-16 tracking-wider uppercase'
                >
                    OUR MERCH
                </motion.h2>

                {/* Carousel Container */}
                <div className='w-full overflow-hidden'>
                    <motion.div
                        className='flex gap-8 md:gap-12'
                        animate={{ x: [0, -50 * 4 * 16] }} // Adjust based on item count
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    >
                        {duplicatedItems.map((item, index) => (
                            <div
                                key={index}
                                className='flex-shrink-0 w-64 h-64 md:w-80 md:h-80 relative'
                            >
                                <Image
                                    src={item}
                                    alt={`Merch item ${(index % merchItems.length) + 1}`}
                                    fill
                                    className='object-contain'
                                    quality={100}
                                    priority={index < 4}
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
