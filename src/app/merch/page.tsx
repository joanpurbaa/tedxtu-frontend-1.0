'use client';

import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import { motion, useAnimation, useInView } from 'framer-motion';
import Footer from '@/components/landing/FooterSection';

const merch = [
    {
        name: 'T-Shirt',
        price: 'Rp75.000',
        img: '/merch/tshirt.png'
    },
    {
        name: 'Baseball Cap',
        price: 'Rp62.000',
        img: '/merch/baseballCap.png'
    },
    {
        name: 'Acrylic Keychain',
        price: 'Rp15.000',
        img: '/merch/keychain.png'
    },
    {
        name: 'Sticker Sheet',
        price: 'Rp9.000',
        img: '/merch/stickerPack.png'
    },
    {
        name: 'Hand Fan',
        price: 'Rp8.000',
        img: '/merch/handfan.png'
    },
    {
        name: 'Fabric Kit',
        price: 'Rp22.000',
        img: '/merch/fabricKit.png'
    },
    {
        name: 'Bobbin\'s Kit',
        price: 'Rp78.000',
        img: '/merch/bobbinskit.png'
    },
    {
        name: 'Stitches Kit',
        price: 'Rp82.000',
        img: '/merch/stitchesKit.png'
    },
    {
        name: 'Tapestry Kit',
        price: 'Rp144.000',
        img: '/merch/tapestryKit.png'
    },
];

// Decorative elements
const decorElements = [
    { src: "/hero/v1.png", top: "5%", left: "2%", size: "w-12 h-12 sm:w-16 sm:h-16" },
    { src: "/hero/v3.png", top: "15%", right: "5%", size: "w-16 h-16 sm:w-20 sm:h-20" },
    { src: "/hero/v6.png", bottom: "20%", left: "8%", size: "w-14 h-14 sm:w-16 sm:h-16" },
    { src: "/hero/v7.png", bottom: "20%", right: "5%", size: "w-12 h-12 sm:w-14 sm:h-14" },
];

// Floating element component
interface FloatingElementProps {
    src: string;
    style: React.CSSProperties;
    size: string;
    delay?: number;
}

const FloatingElement = ({ src, style, size, delay = 0 }: FloatingElementProps) => (
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
            ease: "easeInOut",
            delay: delay * 0.5,
        }}
    >
        <Image src={src} alt="" width={64} height={64} className="w-full h-full" />
    </motion.div>
);

export default function Merch() {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        setIsVisible(true);

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (
        <main className='min-h-screen bg-[url(/merch-background.png)] bg-cover bg-center relative overflow-hidden pt-20'>
            {/* Darker background overlay with shadow */}
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80" />
                <div className="absolute inset-0 shadow-2xl shadow-black/60" />
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-amber-200/30 animate-float"
                        style={{
                            left: `${10 + Math.random() * 80}%`,
                            top: `${10 + Math.random() * 80}%`,
                            animationDelay: `${i * 0.5}s`,
                            animationDuration: `${6 + Math.random() * 10}s`
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
                        top: elem.top || "auto",
                        left: elem.left || "auto",
                        right: elem.right || "auto",
                        bottom: elem.bottom || "auto"
                    }}
                    size={elem.size}
                    delay={index}
                />
            ))}

            <nav className='relative z-20 w-full'>
                <Navbar />
            </nav>

            <div className='relative z-10 px-4 sm:px-6 lg:px-8 py-10 sm:py-16'>
                {/* Animated heading */}
                <motion.div
                    className='text-center mb-12 sm:mb-16 md:mb-20'
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.h2
                        className='font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl relative'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        <span className="relative">
                            Our MERCHANDISE
                            <motion.span
                                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-amber-400 to-red-500"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                                style={{ transformOrigin: "center" }}
                            />
                        </span>
                    </motion.h2>

                    <motion.p
                        className='mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    >
                        Discover our exclusive TEDxTelkomUniversity merchandise collection
                    </motion.p>
                </motion.div>

                {/* Merchandise flex layout */}
                <div className='flex flex-col flex-wrap md:flex-row items-center md:items-stretch justify-center mt-[70px] gap-8 md:gap-10 lg:gap-12 md:px-14'>
                    {merch.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.6,
                                delay: 0.8 + (index * 0.1),
                                ease: "easeOut"
                            }}
                            whileHover={{
                                scale: 1.02,
                                y: -8,
                                transition: { duration: 0.3, ease: "easeOut" }
                            }}
                            className="group"
                        >
                            <Card className='relative w-[280px] h-[460px] border-0 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl hover:shadow-amber-500/20 transition-all duration-500'>
                                {/* Card glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-transparent to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                                {/* Card border glow */}
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-400/30 via-transparent to-red-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[1px]">
                                    <div className="absolute inset-0 rounded-3xl bg-black/80" />
                                </div>

                                {/* Image container with enhanced styling */}
                                <div className='relative h-[280px] p-6 pt-8'>
                                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-t-3xl" />
                                    <div className="relative h-full w-full bg-white/90 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                                        <Image
                                            src={item.img}
                                            alt={item.name}
                                            width={280}
                                            height={280}
                                            className='object-contain w-full h-full p-4 group-hover:scale-105 transition-transform duration-500'
                                        />
                                        {/* Image overlay effect */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                </div>

                                {/* Content section */}
                                <div className='relative p-6 pt-4 flex flex-col justify-between h-[180px]'>
                                    <div className='space-y-2'>
                                        <h3 className='font-bold text-xl text-white group-hover:text-amber-300 transition-colors duration-300'>
                                            {item.name}
                                        </h3>
                                        <div className="flex items-center space-x-2">
                                            <span className='text-2xl font-black text-amber-400 group-hover:text-amber-300 transition-colors duration-300'>
                                                {item.price}
                                            </span>
                                            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                                        </div>
                                    </div>

                                    {/* Enhanced CTA button */}
                                    <div className='mt-4 mb-10'>
                                        <div className='relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-800/80 to-gray-600/80 p-[2px] shadow-lg group-hover:shadow-amber-500/25 transition-shadow duration-300'>
                                            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-red-500/20 to-amber-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            <Button className='relative w-full h-12 bg-gradient-to-r from-white to-gray-100 text-red-600 font-black text-sm rounded-2xl hover:from-amber-50 hover:to-white transition-all duration-300 transform group-hover:scale-[1.02] shadow-lg'>
                                                <a
                                                    href="https://www.instagram.com/p/DITpgTwzoO-/?img_index=1"
                                                    target='_blank'
                                                    rel="noopener noreferrer"
                                                    className="w-full h-full flex items-center justify-center"
                                                >
                                                    Get this merch
                                                </a>
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Decorative corner elements */}
                                <div className="absolute top-4 right-4 w-3 h-3 bg-amber-400/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute bottom-4 left-4 w-2 h-2 bg-red-500/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100" />
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
