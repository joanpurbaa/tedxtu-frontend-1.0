'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BackToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            // Show button when page is scrolled down 500px
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-40 group"
                    aria-label="Back to top"
                >
                    <div className="relative">
                        {/* Animated background ring */}
                        <div className="absolute inset-0 bg-red-500 rounded-full blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300" />

                        {/* Main button */}
                        <div className="relative bg-black border-2 border-red-500 rounded-full p-3 shadow-lg group-hover:bg-red-500 transition-all duration-300 group-hover:scale-110">
                            <ArrowUp className="h-6 w-6 text-red-500 group-hover:text-white transition-colors duration-300" />
                        </div>

                        {/* Pulse animation on hover */}
                        <div className="absolute inset-0 rounded-full border-2 border-red-500 animate-ping group-hover:block hidden" />
                    </div>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
