'use client'
import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Clock, ArrowRight, MapIcon, Navigation, ExternalLink } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

interface MapSectionProps {
  title?: string;
  venueName?: string;
  openTime?: string;
  mapLink?: string;
}

export function MapSection({
    title = "Venue", 
    venueName = "Sri Baduga Museum", 
    openTime = "12.00 WIB", 
    mapLink = "https://maps.google.com/?q=Sri+Baduga+Museum"
}) {
    const [activeView, setActiveView] = useState('map');
    const [isVisible, setIsVisible] = useState(false);

    // Decorative elements
    const decorElements = [
        { icon: <MapPin size={24} />, top: "10%", left: "5%", color: "text-red-500" },
        { icon: <Calendar size={24} />, top: "85%", right: "10%", color: "text-amber-400" },
        { icon: <Clock size={24} />, top: "15%", right: "8%", color: "text-blue-400" },
        { icon: <Navigation size={24} />, bottom: "20%", left: "8%", color: "text-green-400" },
    ];

    // Animation variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" as const }
        }
    };

    const floatVariants: Variants = {
        float: {
            y: [0, -10, 0],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut" as const
            }
        }
    };

    const pulseVariants: Variants = {
        pulse: {
            scale: [1, 1.05, 1],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut" as const
            }
        }
    };

    const fadeInVariants: Variants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.5 }
        }
    };

    // Intersection Observer to trigger animations when in view
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        const section = document.getElementById('venue-section');
        if (section) {
            observer.observe(section);
        }

        return () => {
            if (section) {
                observer.unobserve(section);
            }
        };
    }, []);

    // Function to handle view toggling with animation
    const toggleView = (view: React.SetStateAction<string>) => {
        setActiveView(view);
    };

    // Custom animated button component
    interface AnimatedButtonProps {
        active: boolean;
        icon: React.ReactNode;
        label: string;
        onClick: () => void;
    }

    const AnimatedButton: React.FC<AnimatedButtonProps> = ({ active, icon, label, onClick }) => (
        <motion.button
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                active ? 'bg-[#CE2406] text-white' : 'bg-gray-800 text-gray-300'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
        >
            {icon}
            <span>{label}</span>
            {active && (
                <motion.div
                    className="ml-1"
                    initial={{ opacity: 0, rotate: -45 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ArrowRight size={16} />
                </motion.div>
            )}
        </motion.button>
    );
/*bg-[#0000000]*/
    return (
        <section id="venue-section" className="py-16 relative overflow-hidden bg-[#000000]">
            {/* Decorative floating elements */}
            {decorElements.map((elem, index) => (
                <motion.div
                    key={index}
                    className={`absolute ${elem.color} opacity-70 hidden md:flex items-center justify-center`}
                    style={{
                        top: elem.top || "auto",
                        left: elem.left || "auto",
                        right: elem.right || "auto",
                        bottom: elem.bottom || "auto"
                    }}
                    variants={floatVariants}
                    animate="float"
                    custom={index}
                >
                    <motion.div
                        className="rounded-full bg-black bg-opacity-40 p-3"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.2, duration: 0.5 }}
                    >
                        {elem.icon}
                    </motion.div>
                </motion.div>
            ))}

            {/* Main content container */}
            <motion.div 
                className="container mx-auto px-4"
                variants={containerVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
            >
                {/* Title section with animated elements */}
                <motion.div className="text-center mb-12" variants={containerVariants}>
                    <motion.h2 
                        className="text-white text-4xl md:text-5xl font-bold block"
                        variants={itemVariants}
                    >
                        {title}
                    </motion.h2>
                    
                    <motion.div 
                        className="w-16 h-1 bg-[#CE2406] mx-auto my-4"
                        initial={{ width: 0 }}
                        animate={isVisible ? { width: 64 } : { width: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    />
                    
                    <motion.p 
                        className="text-white text-2xl md:text-3xl"
                        variants={itemVariants}
                    >
                        Get ready to experience the Main Event TEDxTelkom University at
                    </motion.p>
                    
                    <motion.div 
                        className="mt-4"
                        variants={pulseVariants}
                        animate="pulse"
                    >
                        <motion.p 
                            className="text-white text-4xl md:text-5xl font-bold block bg-gradient-to-r from-[#ffffff] to-[#ffffff] bg-clip-text text-transparent" 
                            variants={itemVariants}
                        >
                            {venueName}
                        </motion.p>
                    </motion.div>
                    
                    <motion.div 
                        className="flex items-center justify-center gap-2 mt-4"
                        variants={itemVariants}
                    >
                        <Clock className="text-white" size={20} />
                        <p className="text-white text-2xl md:text-3xl">Open Gate | {openTime}</p>
                    </motion.div>
                </motion.div>

                {/* View toggle buttons */}
                <motion.div 
                    className="flex justify-center gap-4 mb-8"
                    variants={itemVariants}
                >
                    <AnimatedButton 
                        active={activeView === 'map'} 
                        icon={<MapIcon size={18} />} 
                        label="Location" 
                        onClick={() => toggleView('map')} 
                    />
                    <AnimatedButton 
                        active={activeView === 'venue'} 
                        icon={<Navigation size={18} />} 
                        label="Venue View" 
                        onClick={() => toggleView('venue')} 
                    />
                </motion.div>

                {/* Map and venue content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 mt-8">
                    {/* Left panel - always visible but content changes */}
                    <motion.div 
                        className="rounded-lg w-full h-auto overflow-hidden shadow-[0_0_20px_rgba(206,36,6,0.3)]"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                        variants={itemVariants}
                    >
                        {activeView === 'map' ? (
                            <motion.div
                                key="map"
                                variants={fadeInVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                            >
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.6056582749943!2d107.60091337438318!3d-6.937643493062329!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e899f41b0e7d%3A0xc6af38b146fd23ac!2sSri%20Baduga%20Museum!5e0!3m2!1sen!2sid!4v1746176211035!5m2!1sen!2sid" 
                                    width="100%" 
                                    height="600" 
                                    className="border-0"
                                    style={{ minHeight: "300px" }} 
                                    loading="lazy"
                                    title="Sri Baduga Museum Map"
                                    allowFullScreen
                                />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="street-view"
                                variants={fadeInVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                className="h-full min-h-[300px] md:min-h-[600px] bg-gray-800 flex items-center justify-center"
                            >
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!4v1746176311035!6m8!1m7!1sCAoSLEFGMVFpcE1JY1FXbkVnYU80NEY3VnBZS01XZXF4M21LaFJqel9mVTAwWUJr!2m2!1d-6.9374777!2d107.6030977!3f240!4f0!5f0.7820865974627469" 
                                    width="100%" 
                                    height="600" 
                                    className="border-0"
                                    style={{ minHeight: "300px" }} 
                                    loading="lazy"
                                    title="Sri Baduga Museum Street View"
                                    allowFullScreen
                                />
                            </motion.div>
                        )}
                    </motion.div>
                    
                    {/* Right panel - Image or info based on active view */}
                    <motion.div 
                        className="flex flex-col items-center justify-center p-4"
                        variants={itemVariants}
                    >
                        {activeView === 'map' ? (
                            <motion.img 
                                src="/map/map-1.png" 
                                alt="TEDx Stage" 
                                className="max-w-full h-auto object-contain rounded-lg shadow-lg"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                whileHover={{ scale: 1.05 }}
                            />
                        ) : (
                            <motion.div 
                                className="bg-[#1A1A1A] p-6 rounded-lg shadow-lg w-full h-full flex flex-col justify-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h3 className="text-2xl text-white font-bold mb-4">Venue Information</h3>
                                <ul className="space-y-4">
                                    <motion.li 
                                        className="flex items-start gap-3"
                                        whileHover={{ x: 5 }}
                                    >
                                        <MapPin className="text-[#CE2406] mt-1" size={20} />
                                        <div>
                                            <p className="text-white font-medium">Address:</p>
                                            <p className="text-gray-300">Jl. BKR No.185, Cijagra, Kec. Lengkong, Kota Bandung, Jawa Barat 40265</p>
                                        </div>
                                    </motion.li>
                                    <motion.li 
                                        className="flex items-start gap-3"
                                        whileHover={{ x: 5 }}
                                    >
                                        <Clock className="text-[#CE2406] mt-1" size={20} />
                                        <div>
                                            <p className="text-white font-medium">Opening Gate:</p>
                                            <p className="text-gray-300">Sunday: 12.00 WIB</p>
                                        </div>
                                    </motion.li>
                                    <motion.li 
                                        className="flex items-start gap-3"
                                        whileHover={{ x: 5 }}
                                    >
                                        <Calendar className="text-[#CE2406] mt-1" size={20} />
                                        <div>
                                            <p className="text-white font-medium">Event Date:</p>
                                            <p className="text-gray-300">May 4, 2025</p>
                                        </div>
                                    </motion.li>
                                </ul>
                                
                                <motion.a 
                                    href={mapLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="mt-6 flex items-center justify-center gap-2 bg-[#CE2406] text-white py-3 px-6 rounded-full w-full md:w-auto"
                                    whileHover={{ scale: 1.05, backgroundColor: "#951900" }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span>Get Directions</span>
                                    <ExternalLink size={16} />
                                </motion.a>
                            </motion.div>
                        )}
                    </motion.div>
                </div>

                {/* Direction button */}
                <motion.div 
                    className="flex justify-center mt-8"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                >
                    <motion.a 
                        href={mapLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-[#CE2406] text-white py-3 px-6 rounded-full group"
                        whileHover={{ backgroundColor: "#951900" }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span>View on Google Maps</span>
                        <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <ExternalLink size={18} />
                        </motion.div>
                    </motion.a>
                </motion.div>
            </motion.div>
        </section>
    );
}

export default MapSection;