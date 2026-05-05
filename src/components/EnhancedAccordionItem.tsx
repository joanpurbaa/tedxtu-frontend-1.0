'use client'
import React, { useEffect, useRef } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { motion, useAnimation, useInView } from "framer-motion";

interface Faq {
    question: string;
    answer: string;
}

export default function EnhancedAccordionItem({ faq, index, isExpanded, setExpanded }: { faq: Faq; index: number; isExpanded: string | null; setExpanded: React.Dispatch<React.SetStateAction<string | null>> }) {
  const isEven = index % 2 === 0;
    const gradient = isEven
        ? 'bg-gradient-to-r from-[#951900] to-[#CE2406]'
        : 'bg-gradient-to-r from-[#2E2E2E] to-[#8E8E8E]';
    const bgImage = isEven
        ? '/faq/gold.png'
        : '/faq/red.png';
    const textColor = isEven ? 'text-black' : 'text-white';
    
    const itemRef = useRef(null);
    const isInView = useInView(itemRef, { once: true, amount: 0.3 });
    const controls = useAnimation();
    
    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [controls, isInView]);

  return (
        <motion.div
            ref={itemRef}
            initial="hidden"
            animate={controls}
            variants={{
                hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
                visible: { 
                    opacity: 1, 
                    x: 0,
                    transition: { 
                        duration: 0.6, 
                        delay: index * 0.1,
                        ease: "easeOut" as const
                    }
                }
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            <AccordionItem
                value={`item-${index}`}
                className="relative rounded-[30px] sm:rounded-[40px] md:rounded-[48px] lg:rounded-[60px] overflow-hidden mb-6"
            >
                <motion.div
                    className={`p-[3px] rounded-[30px] sm:rounded-[40px] md:rounded-[48px] lg:rounded-[60px] ${gradient}`}
                    whileHover={{ 
                        boxShadow: isEven 
                            ? "0 0 15px rgba(255, 193, 7, 0.5)" 
                            : "0 0 15px rgba(220, 53, 69, 0.5)" 
                    }}
                >
                    <motion.div
                        className={`rounded-[30px] sm:rounded-[40px] md:rounded-[48px] lg:rounded-[60px] px-6 py-2 lg:px-16 lg:py-6 transition-all duration-200 shadow-[0_4px_13.1px_rgba(0,0,0,0.6)] ${textColor}`}
                        style={{
                            backgroundImage: `url(${bgImage})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                        }}
                        animate={{
                            boxShadow: isExpanded === `item-${index}` 
                                ? "0 10px 25px rgba(0, 0, 0, 0.8)" 
                                : "0 4px 13.1px rgba(0, 0, 0, 0.6)"
                        }}
                    >
                        <AccordionTrigger
                            className="px-6 py-4 hover:no-underline group"
                            isDark={!isEven}
                        >
                            <span className={`text-sm md:text-2xl font-black block ${textColor} transition-all duration-300 group-hover:translate-x-2`}>
                                {faq.question}
                            </span>
                        </AccordionTrigger>
                        <AccordionContent className={`px-6 pb-4 ${textColor}`}>
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ 
                                    opacity: isExpanded === `item-${index}` ? 1 : 0,
                                    y: isExpanded === `item-${index}` ? 0 : -10
                                }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                            >
                                {faq.answer}
                            </motion.div>
                        </AccordionContent>
                    </motion.div>
                </motion.div>
            </AccordionItem>
        </motion.div>
    );
}