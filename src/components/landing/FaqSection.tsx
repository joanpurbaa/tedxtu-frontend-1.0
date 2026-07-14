'use client'
import React, { useState } from "react";
import Image from 'next/image';
import { motion } from "framer-motion";

interface FaqItem {
    question: string;
    answer: string;
}

const faqData: FaqItem[] = [
    {
        question: 'APA ITU TEDx TELKOM UNIVERSITY?',
        answer: 'TEDx Telkom University adalah sebuah organisasi yang didirikan oleh mahasiswa Telkom University untuk berbagi ide-ide inovatif dan inspiratif melalui format TEDx.',
    },
    {
        question: 'BAGAIMANA CARA MENDAFTAR?',
        answer: 'Pendaftaran biasanya dibuka melalui kanal resmi kami. Pastikan kamu memantau Instagram @tedxtelkomuniversity untuk informasi terbaru mengenai pendaftaran speaker maupun volunteer.',
    },
    {
        question: 'APA MANFAAT MENGIKUTI ACARA INI?',
        answer: 'Kamu akan mendapatkan wawasan baru dari berbagai perspektif speaker, memperluas jejaring profesional, dan menjadi bagian dari komunitas global yang berfokus pada penyebaran ide-ide berharga.',
    },
];

const MorphingIcon = ({ isOpen }: { isOpen: boolean }) => {
    return (
        <div className="relative w-10 h-10 flex items-center justify-center border-2 border-white rounded-full">
            <div className="absolute w-5 h-[2px] bg-white rounded-full" />
            <motion.div
                initial={false}
                animate={{ 
                    rotate: isOpen ? 90 : 0,
                    opacity: isOpen ? 0 : 1 
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute w-[2px] h-5 bg-white rounded-full"
            />
        </div>
    );
};

const FaqCard = ({ faq, index, isOpen, onToggle }: { 
    faq: FaqItem, index: number, isOpen: boolean, onToggle: () => void 
}) => {
    const isEven = index % 2 === 0;
    const bgImage = isEven ? "/faq/faq-yellow-card.webp" : "/faq/faq-red-card.webp";
    const borderColor = isEven ? "border-[#8A0E04]" : "border-[#DCA23E]";
    const bgFallback = isEven ? "#D4930F" : "#7A0A04";

    return (
        <div
            onClick={onToggle}
            className={`relative mb-6 cursor-pointer border-[4px] ${borderColor} overflow-hidden w-full hover:scale-[1.01] active:scale-[0.99] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]`}
            style={{ 
                backgroundColor: bgFallback,
                // FIX: Gunakan radius yang lebih kecil saat terbuka agar tidak terlihat aneh/goofy
                borderRadius: isOpen ? '48px' : '100px', 
            }}
        >
            {/* Background Texture Overlay */}
            <div
                className="absolute z-0"
                style={{
                    inset: '-15px',
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            />

            <div className={`relative z-10 px-8 md:px-12 lg:px-16 transition-all duration-500 ${isOpen ? 'py-10' : 'py-5'}`}>
                <div className="flex items-center justify-between gap-6">
                    <h3 className="text-lg md:text-xl font-normal text-white uppercase tracking-wider leading-tight font-westmeath">
                        {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                        <MorphingIcon isOpen={isOpen} />
                    </div>
                </div>

                <div
                    style={{
                        maxHeight: isOpen ? '500px' : '0px',
                        opacity: isOpen ? 1 : 0,
                        overflow: 'hidden',
                        transition: isOpen
                            ? 'max-height 0.6s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease-in 0.1s'
                            : 'max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease-out',
                    }}
                >
                    <div className="pt-6 mt-4 border-t border-white/20">
                        <p className="text-white text-sm md:text-lg leading-relaxed font-normal font-raleway">
                            {faq.answer}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export function FaqSection() {
    const [openIndices, setOpenIndices] = useState<number[]>([0]);

    const toggleFaq = (index: number) => {
        setOpenIndices((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        );
    };

    const bgConfig = {
        ellipseSize: "1700px", 
        noteSize: "550px",
    };

    return (
        <section className="relative min-h-screen bg-black flex flex-col justify-center items-center px-4 py-24 overflow-visible z-10">
            <style dangerouslySetInnerHTML={{ __html: `
                @font-face {
                    font-family: 'Great Vibes';
                    src: url('/font/GreatVibes-Regular.ttf') format('truetype');
                    font-weight: normal; font-style: normal; font-display: swap;
                }
                @font-face {
                    font-family: 'Westmeath';
                    src: url('/font/Westmeath.ttf') format('truetype');
                    font-weight: normal; font-style: normal; font-display: swap;
                }
            `}} />

            {/* --- BACKGROUND LAYER (Z-0) --- */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div 
                    className="absolute -left-[1%] md:-left-[55%]"
                    style={{ 
                        width: bgConfig.ellipseSize, 
                        height: bgConfig.ellipseSize,
                        top: "-104%", 
                    }}
                >
                    <div className="relative w-full h-full">
                        <Image
                            src='/about/red-ellipse.webp'
                            alt='Red ellipse decoration'
                            fill
                            className='object-contain'
                            quality={100}
                            priority
                        />
                    </div>
                </div>

                <div 
                    className="absolute -left-[100%] md:left-[-16%]"
                    style={{
                        width: bgConfig.noteSize,
                        height: bgConfig.noteSize,
                        top: "-25%", 
                    }}
                >
                     <div className="relative w-full h-full">
                        <Image
                            src='/faq/giant-golden-note.webp'
                            alt='Music note decoration'
                            fill
                            className='object-contain'
                            quality={100}
                        />
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-[75vh] z-2 bg-gradient-to-t from-[#8A0E04]/90 via-[#8A0E04]/5 to-transparent" />
            </div>

            {/* --- CONTENT LAYER (Z-10) --- */}
            <div className="w-full max-w-4xl mx-auto relative z-10 mt-20">
                <div className="text-center mb-20 select-none flex flex-col items-center">
                    <h2 className="font-westmeath text-4xl md:text-5xl lg:text-7xl text-white tracking-wider uppercase font-normal leading-[0.8]">
                        FREQUENTLY
                    </h2>
                    
                    <div className="flex items-baseline justify-center gap-3 md:gap-5 mt-4">
                        <span
                            className="text-5xl md:text-7xl lg:text-8xl text-white lowercase"
                            style={{ 
                                fontFamily: "'Great Vibes', cursive",
                                filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.8)) drop-shadow(0 0 25px rgba(255,255,255,0.4))',
                                transform: 'rotate(-5deg) translateY(5px)'
                            }}
                        >
                            asked
                        </span>
                        <h2 className="font-westmeath text-4xl md:text-5xl lg:text-7xl text-white tracking-wider uppercase font-normal leading-none">
                            QUESTIONS
                        </h2>
                    </div>
                </div>

                <div className="flex flex-col w-full">
                    {faqData.map((faq, index) => (
                        <FaqCard
                            key={index}
                            faq={faq}
                            index={index}
                            isOpen={openIndices.includes(index)}
                            onToggle={() => toggleFaq(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FaqSection;