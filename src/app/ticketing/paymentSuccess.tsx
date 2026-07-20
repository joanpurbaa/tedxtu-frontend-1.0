'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Image from 'next/image';

export default function PaymentSuccessPage() {
    return (
        <>
            <Navbar />

            <main className='relative min-h-screen overflow-x-hidden bg-black text-white pt-20 sm:pt-24 flex flex-col'>
                {/* TOP RIGHT ELLIPSE */}
                <div className='pointer-events-none fixed right-[-42rem] top-[-42rem] h-[94rem] w-[94rem]'>
                    <Image
                        src='/about/yellow-ellipse.webp'
                        alt=''
                        fill
                        priority
                        className='object-contain'
                    />
                </div>

                {/* BOTTOM LEFT ELLIPSE */}
                <div className='pointer-events-none fixed bottom-[-42rem] left-[-42rem] h-[94rem] w-[94rem]'>
                    <Image
                        src='/about/yellow-ellipse.webp'
                        alt=''
                        fill
                        priority
                        className='object-contain'
                    />
                </div>

                <section className='relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-[760px] flex-1 flex-col items-center justify-center px-6 py-10 text-center sm:min-h-[calc(100vh-6rem)]'>
                    {/* TITLE */}
                    <h1
                        className='
              text-center
              font-title
              text-3xl
              uppercase
              text-white
              sm:text-4xl
              lg:text-5xl
              tracking-tight
            '
                    >
                        Thank You For Ordering
                    </h1>

                    {/* DESCRIPTION */}
                    <p
                        className='
              mt-4
              max-w-[620px]
              text-center
              font-raleway
              text-base
              sm:text-lg
              leading-relaxed
              text-white/90
            '
                    >
                        Our team will verify your proof of transfer within a few
                        minutes.
                        <br />
                        The e-ticket will be sent to your WhatsApp number.
                    </p>

                    {/* INFO CARD */}
                    <div
                        className='
              mt-6
              w-full
              rounded-[24px]
              border
              border-[#C58A1C]
              bg-black/25
              px-10
              py-6
              text-center
              backdrop-blur-3xl
              shadow-[0_20px_50px_rgba(0,0,0,0.3)]
            '
                    >
                        <div className='grid grid-cols-1 gap-y-4 sm:grid-cols-[140px_1fr] sm:justify-items-center sm:gap-x-6 sm:gap-y-4'>
                            <div className='font-raleway text-lg sm:text-xl text-white/80'>
                                Order ID
                            </div>

                            <div className='font-raleway text-lg sm:text-xl font-bold text-white tracking-wide'>
                                TEDX-70OEZ
                            </div>

                            <div className='font-raleway text-lg sm:text-xl text-white/80'>
                                Category
                            </div>

                            <div className='font-raleway text-lg sm:text-xl text-white'>
                                Presale
                            </div>

                            <div className='font-raleway text-lg sm:text-xl text-white/80'>
                                Status
                            </div>

                            <div className='font-raleway text-lg sm:text-xl font-semibold text-[#D9A21B]'>
                                Waiting for Verification
                            </div>
                        </div>
                    </div>

                    {/* BUTTON */}
                    <Link
                        href='/event'
                        className='
              mt-6
              inline-flex
              h-[54px]
              w-[260px]
              items-center
              justify-center
              rounded-full
              bg-[#980B00]
              font-title
              text-lg
              uppercase
              text-white
              transition
              hover:brightness-110
              cursor-pointer
              shadow-lg
            '
                    >
                        Back To Event Page
                    </Link>
                </section>
            </main>

            <Footer />
        </>
    );
}
