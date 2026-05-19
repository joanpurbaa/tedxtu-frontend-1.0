'use client';
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { motion, Variants } from "framer-motion";

const speakers = [
  {
    id: 1,
    name: "Dr. Gamma Kosala, S.Si.",
    role: "Researcher & Educator in AI Informatics Lecturer",
    imageUrl: "/speakers/s1.png",
  },
  {
    id: 2,
    name: "Kori DyahWiratikta, M.Psi., Psikolog",
    role: "Clinical Psychologist & Mental Health Advocate",
    imageUrl: "/speakers/s2.png",
  },
  {
    id: 3,
    name: "Dionisius Mehaga Bangun Djayasaputra",
    role: "Illustrator & Visual Storyteller",
    imageUrl: "/speakers/s3.png",
  },
  {
    id: 4,
    name: "Ni Putu Tanya Hapsari Wulandari",
    role: "Young Entrepreneur & Outstanding Student Telkom University Class of 2024",
    imageUrl: "/speakers/s4.png",
  },
  {
    id: 5,
    name: "Muhamad Arvin Zulfikar",
    role: "Chairman of Genbi Telkom University Outstanding Student Information Systems 2023.",
    imageUrl: "/speakers/s5.png",
  },
];

const vectorPositions = [
  { top: "12%", left: "5%" },
  { top: "38%", left: "60%" },
  { top: "70%", left: "20%" },
];

const fImagePositions = [
  { top: "15%", left: "75%" },
  { top: "58%", left: "35%" },
  { top: "80%", left: "65%" },
];

export const SpeakersSection = () => {
  const [currentSpeakerIndex, setCurrentSpeakerIndex] = useState(0);
  const visibleSpeakers = 3; // Number of speakers visible at once in the slider

  // Auto-rotate speakers for slider effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSpeakerIndex((prevIndex) =>
        (prevIndex + 1) % (speakers.length - visibleSpeakers + 1)
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Animation variants for different elements
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const floatingAnimation: Variants = {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  const rotatingAnimation: Variants = {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: {
        duration: 30,
        repeat: Infinity,
        ease: "linear" as const
      }
    }
  };

  const pulseAnimation: Variants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  // Card hover animation
  const cardHoverAnimation = {
    rest: { scale: 1, boxShadow: "0px 0px 0px rgba(0,0,0,0)" },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.section
      className="relative w-full overflow-hidden py-16 bg-[#000000]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background */}
      <img
      /*src="/speakers/vector.png"
      alt="Background"
      className="absolute inset-0 w-full h-full object-cover z-0"*/
      />

      {/* Vector backgrounds with floating animation */}
      {vectorPositions.map((position, index) => (
        <motion.img
          key={index}
          className="absolute w-[195px] h-[218px] object-cover"
          style={{ top: position.top, left: position.left }}
          alt="Vector"
          src="speakers/vector-3.png"
          variants={floatingAnimation}
          initial="initial"
          animate="animate"
          transition={{ delay: index * 0.5 }}
        />
      ))}

      {/* F images with slow rotation */}
      {fImagePositions.map((position, index) => (
        <motion.img
          key={index}
          className="absolute w-[166px] object-cover"
          style={{
            top: position.top,
            left: position.left,
            height: "auto",
            width: "auto",
          }}
          alt="F"
          src="speakers/vector-2.png"
          variants={index % 2 === 0 ? rotatingAnimation : pulseAnimation}
          initial="initial"
          animate="animate"
          transition={{ delay: index * 0.3 }}
        />
      ))}

      {/* Section Heading with animation */}
      <motion.h1
        className="relative z-10 text-white text-4xl md:text-5xl text-center font-black font-cinzel mb-12"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        Our SPEAKERS
      </motion.h1>

      {/* Speaker Cards - Two display options */}
      <div className="relative z-10">
        {/* Mobile & Small Screens: Horizontal Slider */}
        <motion.div
          className="md:hidden relative overflow-hidden px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex space-x-4 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
            {speakers.map((speaker, index) => (
              <motion.div
                key={speaker.id}
                className="snap-center flex-shrink-0"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <SpeakerCard speaker={speaker} />
              </motion.div>
            ))}
          </div>
          {/* Slider indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {speakers.map((_, index) => (
              <motion.div
                key={index}
                className={`h-2 rounded-full ${index === currentSpeakerIndex ? 'w-4 bg-white' : 'w-2 bg-gray-500'}`}
                animate={{ scale: index === currentSpeakerIndex ? 1.2 : 1 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Desktop: Grid Layout */}
        <motion.div
          className="hidden md:grid grid-cols-3 gap-y-10 gap-x-4 px-4 place-items-center"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {speakers.map((speaker) => (
            <motion.div
              key={speaker.id}
              variants={fadeInUp}
            >
              <SpeakerCard speaker={speaker} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

// Separated SpeakerCard component for cleaner code
interface Speaker {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
}

const SpeakerCard = ({ speaker }: { speaker: Speaker }) => {
  return (
    <motion.div
      className="relative"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <motion.div
        variants={{
          rest: { y: 0 },
          hover: { y: -10, transition: { duration: 0.3 } }
        }}
      >
        <Card
          className="relative bg-[#591303] rounded-xl overflow-hidden w-full max-w-[180px] mx-auto"
        >
          <CardContent className="p-0 relative h-60 bg-[url('/-pngtree-closeup-of-textured-vintage-beige-15570655-1.png')] bg-cover bg-center flex items-center justify-center">
            {/* Vector overlay behind speaker */}
            <motion.img
              src="/speakers/vector-1.png"
              alt="Vector Behind"
              className="absolute w-full h-full object-cover z-0"
              variants={{
                rest: { scale: 1 },
                hover: { scale: 1.05, transition: { duration: 0.4 } }
              }}
            />

            {/* Speaker Image Container with Gradient */}
            <motion.div
              className="relative z-10 h-full flex items-end justify-center"
              variants={{
                rest: { scale: 1 },
                hover: { scale: 1.08, transition: { duration: 0.4 } }
              }}
            >
              {/* Speaker Image */}
              <img
                src={speaker.imageUrl}
                alt={speaker.name}
                className="h-full w-auto object-contain"
              />

              {/* Gradient overlay on speaker image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none" />
            </motion.div>

          </CardContent>

          {/* Speaker Text */}
          <motion.div
            className="absolute bottom-3 w-full text-center text-white z-20"
            variants={{
              rest: { opacity: 0.9 },
              hover: { opacity: 1, transition: { duration: 0.3 } }
            }}
          >
            <p className="font-black text-sm">{speaker.name}</p>
            <p className="text-[10px] font-[raleway]">{speaker.role}</p>
          </motion.div>
        </Card>
      </motion.div>
    </motion.div>
  );
};
