// 'use client';

import { redirect } from 'next/navigation';

// import DivisionCard from '@/components/DivisionCard';
// import { ElementsButton } from '@/components/ElementsButton';
// import EnhancedAccordionItem from '@/components/EnhancedAccordionItem';
// import Navbar from '@/components/layout/Navbar';
// import { Accordion } from '@radix-ui/react-accordion';
// import Image from 'next/image';
// import { useRef, useState } from 'react';
// import { motion } from 'framer-motion';
// import {
//     ChevronLeft,
//     ChevronRight,
//     Users,
//     Code,
//     Palette,
//     Megaphone,
//     BarChart,
// } from 'lucide-react';
// import Footer from '@/components/landing/FooterSection';
// import BackToTopButton from '@/components/BackToTopButton';

// const DIVISIONS = [
//     {
//         name: 'VCL',
//         description:
//             'Manages technical setup, vendor coordination, inventory, and trasportation based on event needs and timelines.',
//     },
//     {
//         name: 'PnF',
//         description:
//             'Oversees sponsor relations and financial management for the event and ensures effective partnerships, accurate budgeting, and smooth financial operations.',
//     },
//     {
//         name: 'MnD',
//         description:
//             'Handles content creation, event documentation, and website management to ensure strong digital presence and smooth media operations.',
//     },
//     {
//         name: 'EComm',
//         description:
//             ' Responsible for coordinating event setups and ensure smooth execution by organizing materials, presentations, and providing support to speakers.',
//     },
//     {
//         name: 'AIS',
//         description:
//             'Handles audience engagement, feedback, and data analysis, while also supporting internal communication, training, and staff satisfaction.',
//     },
// ];

// // const FAQ = [
// //     {
// //         question: 'Apa itu TEDx Telkom University?',
// //         answer: 'Lorem Ipsum dolor amet Lorem Ipsum dolor amet Lorem Ipsum dolor amet Lorem Ipsum dolor amet   Lorem Ipsum dolor amet Lorem Ipsum dolor amet Lorem Ipsum dolor amet Lorem Ipsum dolor amet    Lorem Ipsum dolor amet Lorem Ipsum dolor amet Lorem Ipsum dolor amet Lorem Ipsum dolor amet     Lorem Ipsum dolor amet Lorem Ipsum dolor amet Lorem Ipsum dolor amet Lorem Ipsum dolor amet    ',
// //     },
// //     {
// //         question: 'Kapan Acara Ini Dilaksanakan?',
// //         answer: 'Lorem Ipsum dolor amet Lorem Ipsum dolor amet Lorem Ipsum dolor amet Lorem Ipsum dolor amet   Lorem Ipsum dolor amet Lorem Ipsum dolor amet Lorem Ipsum dolor amet Lorem Ipsum dolor amet    Lorem Ipsum dolor amet Lorem Ipsum dolor amet Lorem Ipsum dolor amet Lorem Ipsum dolor amet     Lorem Ipsum dolor amet Lorem Ipsum dolor amet Lorem Ipsum dolor amet Lorem Ipsum dolor amet    ',
// //     },
// //     {
// //         question: 'Siapa Saja yang Bisa Mengikuti Acara Ini?',
// //         answer: 'Lorem Ipsum dolor amet Lorem Ipsum dolor amet Lorem Ipsum dolor amet Lorem Ipsum dolor amet   Lorem Ipsum dolor amet Lorem Ipsum dolor amet Lorem Ipsum dolor amet Lorem Ipsum dolor amet    Lorem Ipsum dolor amet Lorem Ipsum dolor amet Lorem Ipsum dolor amet Lorem Ipsum dolor amet     Lorem Ipsum dolor amet Lorem Ipsum dolor amet Lorem Ipsum dolor amet Lorem Ipsum dolor amet    ',
// //     },
// //     {
// //         question: 'Bagaimana Cara Mendaftar?',
// //         answer: 'Lorem Ipsum dolor amet Lorem Ipsum dolor amet Lorem Ipsum dolor amet Lorem Ipsum dolor amet   Lorem Ipsum dolor amet Lorem Ipsum dolor amet Lorem Ipsum dolor amet Lorem Ipsum dolor amet    Lorem Ipsum dolor amet Lorem Ipsum dolor amet Lorem Ipsum dolor amet Lorem Ipsum dolor amet     Lorem Ipsum dolor amet Lorem Ipsum dolor amet Lorem Ipsum dolor amet Lorem Ipsum dolor amet    ',
// //     },
// //     {
// //         question: 'Apa Manfaat Mengikuti Acara Ini?',
// //         answer: 'Lorem Ipsum dolor amet Lorem Ipsum dolor amet Lorem Ipsum dolor amet Lorem Ipsum dolor amet   Lorem Ipsum dolor amet Lorem Ipsum dolor amet Lorem Ipsum dolor amet Lorem Ipsum dolor amet    Lorem Ipsum dolor amet Lorem Ipsum dolor amet Lorem Ipsum dolor amet Lorem Ipsum dolor amet     Lorem Ipsum dolor amet Lorem Ipsum dolor amet Lorem Ipsum dolor amet Lorem Ipsum dolor amet    ',
// //     },
// // ];

// export default function Recuitment() {
//     const [expanded, setExpanded] = useState<string | undefined>(undefined);
//     const cardWrapperRef = useRef<HTMLDivElement>(null);

//     function scrollLeft() {
//         if (cardWrapperRef.current) {
//             cardWrapperRef.current.scrollBy({
//                 left: -300,
//                 behavior: 'smooth',
//             });
//         }
//     }

//     function scrollRight() {
//         if (cardWrapperRef.current) {
//             cardWrapperRef.current.scrollBy({
//                 left: 300,
//                 behavior: 'smooth',
//             });
//         }
//     }

//     return (
//         <main className='min-h-screen relative overflow-x-hidden'>
//             <nav className='fixed w-full z-50'>
//                 <Navbar />
//             </nav>

//             {/* hero */}
//             <div className='relative flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 w-full h-screen bg-[url("/recruitment-bg.png")] bg-cover bg-center'>
//                 {/* Decorative elements */}
//                 <motion.div
//                     animate={{
//                         y: ['0%', '-20%', '0%'],
//                         rotate: ['10deg', '0deg', '10deg'],
//                     }}
//                     transition={{
//                         repeat: Infinity,
//                         duration: 5,
//                         ease: 'easeInOut',
//                     }}
//                     className='absolute -bottom-10 left-[-25px] z-20 hidden sm:block'
//                 >
//                     <Image
//                         alt='daisy'
//                         src={'/recruitment-flower/daisy.svg'}
//                         width={191}
//                         height={197}
//                         className='w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48'
//                     />
//                 </motion.div>

//                 <Image
//                     alt='flower collection'
//                     src={'/recruitment-flower/flower-collection.png'}
//                     width={116}
//                     height={73}
//                     className='absolute right-[10%] sm:right-[20%] md:right-[30%] lg:right-[40%] top-[20%] sm:top-[25%] m-auto w-16 h-10 sm:w-20 sm:h-12 md:w-24 md:h-16 lg:w-28 lg:h-18'
//                 />

//                 <motion.div
//                     animate={{ scale: [0.5, 1, 0.9, 1, 0.9, 1, 0.5] }}
//                     transition={{ duration: 10, repeat: Infinity }}
//                     className='absolute top-[-10px] right-[-25px] hidden sm:block'
//                 >
//                     <Image
//                         alt='marigold'
//                         src={'/recruitment-flower/marigold.png'}
//                         width={188}
//                         height={148}
//                         className='rotate-[-120deg] w-24 h-20 sm:w-32 sm:h-24 md:w-40 md:h-32 lg:w-48 lg:h-36'
//                     />
//                 </motion.div>

//                 {/* Main content */}
//                 <div className='flex flex-col justify-center items-center gap-4 sm:gap-6 md:gap-8 z-10 text-center max-w-4xl mx-auto'>
//                     <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-center leading-tight'>
//                         Yes, you are the next generation
//                     </h1>
//                     <p className='font-[raleway] text-center text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto px-4 leading-relaxed'>
//                         Join us to be part of the biggest student organization
//                         in Indonesia.
//                         <br className='hidden sm:block' />
//                         We are looking for the best talents to join our team.
//                     </p>
//                 </div>

//                 {/* CTA Buttons */}
//                 <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8 sm:mt-12 z-10 w-full max-w-md mx-auto px-4'>
//                     <ElementsButton className='w-full sm:w-auto'>
//                         <a href='https://www.instagram.com/tedxtelkomuniversity'>
//                             Join us
//                         </a>
//                     </ElementsButton>
//                     <ElementsButton
//                         variant={'gold'}
//                         className='w-full sm:w-auto'
//                     >
//                         More info
//                     </ElementsButton>
//                 </div>
//             </div>

//             {/* Timeline */}
//             <div className='relative h-screen mt-24'>
//                 <Image
//                     alt='sewing machine'
//                     src={'/sewing-machine.png'}
//                     width={923}
//                     height={705}
//                     className='absolute inset-0 m-auto'
//                 />
//                 <h2 className='text-5xl font-black text-center'>
//                     Oprec Timeline
//                 </h2>
//                 <motion.div
//                     initial={{ y: 60, opacity: 0 }}
//                     animate={{
//                         y: [60, 0, -70, 0, 10, 0],
//                         opacity: 1,
//                     }}
//                     transition={{
//                         duration: 5,
//                         repeat: Infinity,
//                         repeatType: 'reverse',
//                         ease: 'easeInOut',
//                     }}
//                     className='absolute inset-0 flex items-center justify-center'
//                 >
//                     <span className='text-6xl md:text-8xl font-bold text-center text-white-800 drop-shadow-lg'>
//                         Coming Soon
//                     </span>
//                 </motion.div>
//             </div>

//             {/* Division */}
//             <div className='flex flex-col gap-10 mb-44'>
//                 <div>
//                     <h2 className='text-5xl font-black text-center'>
//                         Our Departement
//                     </h2>
//                     <p className='text-center text-xl max-w-[800px] mx-auto'>
//                         We are looking for the best talents to join our team. We
//                         have 5 divisions that you can choose from.
//                     </p>
//                 </div>
//                 <div
//                     ref={cardWrapperRef}
//                     className='flex gap-6 overflow-x-scroll no-scrollbar mt-10 snap-x'
//                 >
//                     {DIVISIONS.map((div, index) => (
//                         <DivisionCard
//                             key={index}
//                             title={div.name}
//                             description={div.description}
//                             className='snap-center'
//                         />
//                     ))}
//                 </div>
//                 <div className='flex justify-end gap-4 px-8'>
//                     <ChevronLeft onClick={scrollLeft} />
//                     <ChevronRight onClick={scrollRight} />
//                 </div>
//             </div>

//             {/* FAQ */}
//             {/* <div className='flex flex-col gap-12 px-16 pb-20'>
//                 <h2 className='text-5xl font-black text-center'>
//                     Frequently
//                     <br />
//                     <span className='italic text-xl font-bold'>Asked</span>{' '}
//                     Question
//                 </h2>
//                 <Accordion
//                     type='single'
//                     collapsible
//                     value={expanded}
//                     onValueChange={setExpanded}
//                 >
//                     {FAQ.map((faq, index) => (
//                         <EnhancedAccordionItem
//                             key={index}
//                             faq={faq}
//                             index={index}
//                             isExpanded={expanded}
//                             setExpanded={setExpanded}
//                         />
//                     ))}
//                 </Accordion>
//             </div> */}
//             <Footer />
//             <BackToTopButton />
//         </main>
//     );
// }
export default function recruitment() {
    redirect('/');
}
