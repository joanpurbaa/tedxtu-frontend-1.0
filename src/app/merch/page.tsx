'use client';

<<<<<<< Updated upstream
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Footer from '@/components/Footer';
import BackToTopButton from '@/components/BackToTopButton';

const merch = [
    { name: 'T-Shirt', price: 100000, img: '/merch/tshirt.png' },
    { name: 'Shirt 2026', price: 100000, img: '/merch/shirt-2026.png' },
    { name: 'Baseball Cap', price: 100000, img: '/merch/baseballCap.png' },
    { name: 'Hat 2026', price: 100000, img: '/merch/hat-2026.png' },
    { name: 'Keychain', price: 100000, img: '/merch/keychain.png' },
    { name: 'Keychain 2026', price: 100000, img: '/merch/keychain-2026.png' },
    { name: 'Lanyard 2026', price: 100000, img: '/merch/lanyard-2026.png' },
    { name: 'Hand Fan', price: 100000, img: '/merch/handfan.png' },
    { name: 'Sticker Pack', price: 100000, img: '/merch/stickerPack.png' },
    { name: 'Bobbins Kit', price: 100000, img: '/merch/bobbinskit.png' },
    { name: 'Fabric Kit', price: 100000, img: '/merch/fabricKit.png' },
    { name: 'Stitches Kit', price: 100000, img: '/merch/stitchesKit.png' },
    { name: 'Tapestry Kit', price: 100000, img: '/merch/tapestryKit.png' },
];

export default function Merch() {
    return (
        <section className='merchBackground'>
            <Navbar />
            <main className='relative overflow-x-hidden overflow-y-clip'>
                <div className='pointer-events-none absolute left-1/2 top-[45vh] z-0 -translate-x-1/2 -translate-y-1/2'>
                    <div className='w-[100vw] max-w-none'>
                        <Image
                            src='/about/red-ellipse.webp'
                            alt='Red ellipse decoration'
                            width={2800}
                            height={1500}
                            priority
                            quality={100}
                            className='w-full h-auto'
                        />
                    </div>
                </div>

                <section className='relative z-20 w-full min-h-[100dvh] flex items-center justify-center overflow-visible bg-transparent'>
                    <div className='absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2'>
                        <Image
                            src='/about/mask.webp'
                            alt='Mask decoration'
                            width={120}
                            height={120}
                            priority
                            quality={100}
                        />
                    </div>
                    <div className='absolute top-1/4 right-1/4 translate-x-1/2 -translate-y-1/2'>
                        <Image
                            src='/about/trumpet.webp'
                            alt='Trumpet decoration'
                            width={120}
                            height={120}
                            priority
                            quality={100}
                        />
                    </div>
                    <div className='absolute bottom-1/4 left-1/4 -translate-x-1/2 translate-y-1/2'>
                        <Image
                            src='/about/turn-table.webp'
                            alt='Turn table decoration'
                            width={120}
                            height={120}
                            priority
                            quality={100}
                        />
                    </div>
                    <div
                        className='absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2'
                        style={{
                            transform:
                                'translateX(50%) translateY(50%) rotate(20deg)',
                        }}
                    >
                        <Image
                            src='/about/crown.webp'
                            alt='Crown decoration'
                            width={120}
                            height={120}
                            priority
                            quality={100}
                        />
                    </div>

                    <div className='relative z-10 text-center'>
                        <div className='relative z-10 text-center'>
                            <div className='flex items-center justify-center gap-8'>
                                <span className='font-westmeath text-6xl md:text-7xl text-white font-bold'>
                                    OUR
                                </span>
                                <Image
                                    src='/about/music-note.webp'
                                    alt='Music note'
                                    width={30}
                                    height={30}
                                    priority
                                    quality={100}
                                    style={{ transform: 'rotate(18deg)' }}
                                />
                                <span className='font-westmeath text-6xl md:text-7xl text-white font-bold'>
                                    MERCHANDISE
                                </span>
                            </div>
                        </div>
                        <p className='font-raleway text-lg md:text-xl text-white/80 max-w-2xl mx-auto mt-5'>
                            Take a piece of the symphony home with you.
                            TEDxTelkom University merchandise is more than just
                            a souvenir — it's a statement. Wear the story, carry
                            the idea.
                        </p>
                    </div>
                </section>

                <section className='relative z-10 w-full bg-transparent text-white px-4 sm:px-6 md:px-14 py-20'>
                    {/* <div className='pointer-events-none absolute right-0 top-1/2 z-0 -translate-y-1/2 translate-x-[55%]'>
                        <div className='w-[120vw] max-w-none'>
                            <Image
                                src='/about/red-ellipse.webp'
                                alt='Red ellipse decoration'
                                width={2800}
                                height={1500}
                                priority={false}
                                quality={100}
                                className='w-full h-auto'
=======
import { useEffect, useMemo, useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Footer from '@/components/landing/FooterSection';

const merch = [
    {
        name: 'T-Shirt',
        price: 'Rp75.000',
        img: '/merch/tshirt.png',
    },
    {
        name: 'Baseball Cap',
        price: 'Rp62.000',
        img: '/merch/baseballCap.png',
    },
    {
        name: 'Acrylic Keychain',
        price: 'Rp15.000',
        img: '/merch/keychain.png',
    },
    {
        name: 'Sticker Sheet',
        price: 'Rp9.000',
        img: '/merch/stickerPack.png',
    },
    {
        name: 'Hand Fan',
        price: 'Rp8.000',
        img: '/merch/handfan.png',
    },
    {
        name: 'Fabric Kit',
        price: 'Rp22.000',
        img: '/merch/fabricKit.png',
    },
    {
        name: "Bobbin's Kit",
        price: 'Rp78.000',
        img: '/merch/bobbinskit.png',
    },
    {
        name: 'Stitches Kit',
        price: 'Rp82.000',
        img: '/merch/stitchesKit.png',
    },
    {
        name: 'Tapestry Kit',
        price: 'Rp144.000',
        img: '/merch/tapestryKit.png',
    },
];

const decorElements = [
    { src: '/hero/v1.png', top: '5%', left: '2%', size: 'w-12 h-12 sm:w-16 sm:h-16' },
    { src: '/hero/v3.png', top: '15%', right: '5%', size: 'w-16 h-16 sm:w-20 sm:h-20' },
    { src: '/hero/v6.png', bottom: '20%', left: '8%', size: 'w-14 h-14 sm:w-16 sm:h-16' },
    { src: '/hero/v7.png', bottom: '20%', right: '5%', size: 'w-12 h-12 sm:w-14 sm:h-14' },
];

const particles = [
    { left: '12%', top: '18%', delay: '0s', duration: '7s' },
    { left: '24%', top: '36%', delay: '0.5s', duration: '9s' },
    { left: '36%', top: '22%', delay: '1s', duration: '8s' },
    { left: '48%', top: '62%', delay: '1.5s', duration: '10s' },
    { left: '60%', top: '28%', delay: '2s', duration: '7s' },
    { left: '72%', top: '52%', delay: '2.5s', duration: '9s' },
    { left: '84%', top: '20%', delay: '3s', duration: '8s' },
    { left: '18%', top: '72%', delay: '3.5s', duration: '10s' },
    { left: '30%', top: '80%', delay: '4s', duration: '7s' },
    { left: '54%', top: '76%', delay: '4.5s', duration: '9s' },
    { left: '68%', top: '70%', delay: '5s', duration: '8s' },
    { left: '88%', top: '82%', delay: '5.5s', duration: '10s' },
];

interface FloatingElementProps {
    src: string;
    style: React.CSSProperties;
    size: string;
    delay?: number;
}

const FloatingElement = ({ src, style, size, delay = 0 }: FloatingElementProps) => {
    return (
        <motion.div
            className={`absolute ${size} pointer-events-none z-10`}
            style={style}
            animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0],
            }}
            transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: delay * 0.5,
            }}
        >
            <Image
                src={src}
                alt=''
                width={64}
                height={64}
                className='h-full w-full'
            />
        </motion.div>
    );
};

export default function Merch() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const titleAnimation = useMemo(
        () => ({
            opacity: isVisible ? 1 : 0,
            y: isVisible ? 0 : 30,
        }),
        [isVisible]
    );

    return (
        <main className='relative min-h-screen overflow-hidden bg-[url(/merch-background.png)] bg-cover bg-center pt-20'>
            {/* Darker background overlay with shadow */}
            <div className='absolute inset-0 bg-black/60' />

            <div className='pointer-events-none absolute inset-0 z-0'>
                <div className='absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80' />
                <div className='absolute inset-0 shadow-2xl shadow-black/60' />
            </div>

            {/* Floating particles */}
            <div className='pointer-events-none absolute inset-0'>
                {particles.map((particle, index) => (
                    <motion.div
                        key={index}
                        className='absolute h-1 w-1 rounded-full bg-amber-200/30 sm:h-2 sm:w-2'
                        style={{
                            left: particle.left,
                            top: particle.top,
                            animationDelay: particle.delay,
                            animationDuration: particle.duration,
                        }}
                        animate={{
                            y: [0, -18, 0],
                            opacity: [0.25, 0.7, 0.25],
                        }}
                        transition={{
                            duration: Number.parseInt(particle.duration),
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: index * 0.2,
                        }}
                    />
                ))}
            </div>

            {/* Floating decorative elements */}
            {decorElements.map((elem, index) => (
                <FloatingElement
                    key={index}
                    src={elem.src}
                    style={{
                        top: elem.top || 'auto',
                        left: elem.left || 'auto',
                        right: elem.right || 'auto',
                        bottom: elem.bottom || 'auto',
                    }}
                    size={elem.size}
                    delay={index}
                />
            ))}

            <nav className='relative z-20 w-full'>
                <Navbar />
            </nav>

            <div className='relative z-10 px-4 py-10 sm:px-6 sm:py-16 lg:px-8'>
                {/* Animated heading */}
                <motion.div
                    className='mb-12 text-center sm:mb-16 md:mb-20'
                    initial={{ opacity: 0, y: 30 }}
                    animate={titleAnimation}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <motion.h2
                        className='relative font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                    >
                        <span className='relative inline-flex items-center justify-center gap-3 sm:gap-4 md:gap-5'>
                            <span>OUR</span>

                            <Image
                                src='/merch/note-icon.png'
                                alt=''
                                width={30.32}
                                height={66}
                                className='h-8 w-8 object-contain sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14'
                                priority
                            />

                            <span>MERCHANDISE</span>

                            <motion.span
                                className='absolute -bottom-2 left-1/2 h-1 w-24 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-red-500'
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                                style={{ transformOrigin: 'center' }}
>>>>>>> Stashed changes
                            />
                        </div>
                    </div> */}

<<<<<<< Updated upstream
                    <div className='mx-auto relative z-10'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-y-16 place-items-center'>
                            {merch.map((item, index) => (
                                <div
                                    key={index}
                                    className='flex flex-col items-start w-60'
                                >
                                    <div className='relative w-60 h-60 flex justify-center items-center rounded-3xl overflow-hidden mb-3'>
                                        <Image
                                            src={item.img}
                                            alt={item.name}
                                            fill
                                            quality={100}
                                            className='object-cover object-center'
                                        />
                                    </div>
                                    <div className='text-left'>
                                        <h3 className='font-westmeath text-2xl text-white font-bold'>
                                            {item.name}
                                        </h3>
                                        <p
                                            className='font-westmeath text-xl mt-2'
                                            style={{ color: '#DCA23E' }}
                                        >
                                            Rp
                                            {item.price.toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='pointer-events-none absolute -left-[450] bottom-0 z-[5] overflow-hidden blur-md'>
                        <Image
                            src='/about/Mist.webp'
                            alt='Mist decoration'
                            width={1200}
                            height={800}
                            priority={false}
                            quality={100}
                            className='w-[85vw] max-w-[1020px] h-auto'
                        />
                    </div>
                    <div className='pointer-events-none absolute -right-[350px] bottom-0 z-[5] overflow-hidden blur-md'>
                        <Image
                            src='/about/Mist.webp'
                            alt='Mist decoration'
                            width={1200}
                            height={800}
                            priority={false}
                            quality={100}
                            className='w-[85vw] max-w-[1020px] h-auto'
                        />
                    </div>
                </section>
            </main>
            <Footer />
            <BackToTopButton />
        </section>
=======
                    <motion.p
                        className='mx-auto mt-6 max-w-2xl text-base text-gray-300 sm:text-lg md:text-xl'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                    >
                        Discover our exclusive TEDxTelkomUniversity merchandise collection
                    </motion.p>
                </motion.div>

                {/* Merchandise flex layout */}
                <div className='mt-[70px] flex flex-col flex-wrap items-center justify-center gap-8 md:flex-row md:items-stretch md:gap-10 md:px-14 lg:gap-12'>
                    {merch.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.6,
                                delay: 0.8 + index * 0.1,
                                ease: 'easeOut',
                            }}
                            whileHover={{
                                scale: 1.02,
                                y: -8,
                                transition: { duration: 0.3, ease: 'easeOut' },
                            }}
                            className='group'
                        >
                            <Card className='relative h-[460px] w-[280px] overflow-hidden rounded-3xl border-0 bg-gradient-to-br from-white/15 to-white/5 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:shadow-amber-500/20'>
                                {/* Card glow effect */}
                                <div className='absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-400/20 via-transparent to-red-500/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

                                {/* Card border glow */}
                                <div className='absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-400/30 via-transparent to-red-500/30 p-[1px] opacity-0 transition-opacity duration-500 group-hover:opacity-100'>
                                    <div className='absolute inset-0 rounded-3xl bg-black/80' />
                                </div>

                                {/* Image container with enhanced styling */}
                                <div className='relative h-[280px] p-6 pt-8'>
                                    <div className='absolute inset-0 rounded-t-3xl bg-gradient-to-b from-white/20 to-transparent' />

                                    <div className='relative h-full w-full overflow-hidden rounded-2xl bg-white/90 shadow-lg transition-shadow duration-300 group-hover:shadow-xl'>
                                        <Image
                                            src={item.img}
                                            alt={item.name}
                                            width={280}
                                            height={280}
                                            className='h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105'
                                        />

                                        {/* Image overlay effect */}
                                        <div className='absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                                    </div>
                                </div>

                                {/* Content section */}
                                <div className='relative flex h-[180px] flex-col justify-between p-6 pt-4'>
                                    <div className='space-y-2'>
                                        <h3 className='text-xl font-bold text-white transition-colors duration-300 group-hover:text-amber-300'>
                                            {item.name}
                                        </h3>

                                        <div className='flex items-center space-x-2'>
                                            <span className='text-2xl font-black text-amber-400 transition-colors duration-300 group-hover:text-amber-300'>
                                                {item.price}
                                            </span>

                                            <div className='h-2 w-2 animate-pulse rounded-full bg-amber-400' />
                                        </div>
                                    </div>

                                    {/* Enhanced CTA button */}
                                    <div className='mb-10 mt-4'>
                                        <div className='relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-800/80 to-gray-600/80 p-[2px] shadow-lg transition-shadow duration-300 group-hover:shadow-amber-500/25'>
                                            <div className='absolute inset-0 bg-gradient-to-r from-amber-400/20 via-red-500/20 to-amber-400/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />

                                            <Button className='relative h-12 w-full rounded-2xl bg-gradient-to-r from-white to-gray-100 text-sm font-black text-red-600 shadow-lg transition-all duration-300 hover:from-amber-50 hover:to-white group-hover:scale-[1.02]'>
                                                <a
                                                    href='https://www.instagram.com/p/DITpgTwzoO-/?img_index=1'
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                    className='flex h-full w-full items-center justify-center'
                                                >
                                                    Get this merch
                                                </a>
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Decorative corner elements */}
                                <div className='absolute right-4 top-4 h-3 w-3 rounded-full bg-amber-400/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                                <div className='absolute bottom-4 left-4 h-2 w-2 rounded-full bg-red-500/60 opacity-0 transition-opacity delay-100 duration-300 group-hover:opacity-100' />
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>

            <Footer />
        </main>
>>>>>>> Stashed changes
    );
}