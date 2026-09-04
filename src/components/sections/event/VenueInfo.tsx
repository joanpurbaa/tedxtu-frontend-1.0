import Image from 'next/image';
import { Calendar, Clock, ExternalLink, MapPin } from 'lucide-react';

const VenueInfo = () => {
	return (
        <section className='relative overflow-hidden bg-black px-4 pt-28 pb-24 sm:px-6 sm:pt-36 sm:pb-32 lg:px-8'>
            <div className='pointer-events-none absolute -right-80 -top-32 h-[48rem] w-[48rem] sm:-right-96 sm:-top-40 sm:h-[64rem] sm:w-[64rem]'>
                <Image
                    src='/about/red-ellipse.webp'
                    alt=''
                    fill
                    sizes='64rem'
                    className='object-contain'
                />
                <div
                    className='absolute inset-0'
                    style={{
                        maskImage: "url('/about/red-ellipse.webp')",
                        WebkitMaskImage: "url('/about/red-ellipse.webp')",
                        maskSize: 'contain',
                        WebkitMaskSize: 'contain',
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        WebkitMaskPosition: 'center',
                    }}
                >
                    <Image
                        src='/speakers/backgroundTexture.webp'
                        alt=''
                        fill
                        sizes='64rem'
                        className='object-cover opacity-20 mix-blend-overlay'
                    />
                </div>
                <div className='absolute left-[58%] top-1/2 h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 -rotate-[38deg] opacity-45'>
                    <Image
                        src='/about/golden-note.webp'
                        alt=''
                        fill
                        sizes='350px'
                        className='object-contain'
                    />
                </div>
            </div>

            <div className='pointer-events-none absolute -left-80 -bottom-72 h-[58rem] w-[58rem] sm:-left-96 sm:-bottom-[21rem] sm:h-[76rem] sm:w-[76rem]'>
                <Image
                    src='/about/red-ellipse.webp'
                    alt=''
                    fill
                    sizes='76rem'
                    className='object-contain'
                />
                <div
                    className='absolute inset-0'
                    style={{
                        maskImage: "url('/about/red-ellipse.webp')",
                        WebkitMaskImage: "url('/about/red-ellipse.webp')",
                        maskSize: 'contain',
                        WebkitMaskSize: 'contain',
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        WebkitMaskPosition: 'center',
                    }}
                >
                    <Image
                        src='/speakers/backgroundTexture.webp'
                        alt=''
                        fill
                        sizes='76rem'
                        className='object-cover opacity-20 mix-blend-overlay'
                    />
                </div>
                <div className='absolute left-[42%] top-[55%] h-[36%] w-[36%] -translate-x-1/2 -translate-y-1/2 opacity-45'>
                    <Image
                        src='/speakers/goldenMusic.svg'
                        alt=''
                        fill
                        sizes='450px'
                        className='object-contain'
                    />
                </div>
            </div>

            <div
                className='pointer-events-none absolute inset-x-0 bottom-0 h-40 sm:h-56'
                style={{
                    backgroundImage:
                        'linear-gradient(to bottom, transparent 0%, black 100%)',
                }}
            />

            <div className='relative mx-auto max-w-6xl'>
                <div className='mx-auto max-w-2xl text-center'>
                    <h2 className='font-westmeath text-3xl uppercase tracking-wide text-white sm:text-4xl lg:text-5xl'>
                        Venue Information
                    </h2>
                    <p className='mt-3 font-raleway text-sm text-white/70 sm:text-base'>
                        Get ready to experience the Main Event TEDxTelkom
                        University
                    </p>
                </div>

                <h3 className='mt-14 text-center font-westmeath text-3xl tracking-[0.1em] text-white sm:mt-16 sm:text-4xl lg:text-5xl'>
                    Gedung Damar Telkom University
                </h3>

                <div className='mt-10 grid gap-8 lg:grid-cols-2 lg:items-center'>
                    <div className='relative aspect-video w-full max-w-full overflow-hidden rounded-2xl sm:aspect-[4/3] lg:aspect-square'>
                        <iframe
                            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d990.0728673275585!2d107.62956163570743!3d-6.974897593563218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e9ae8c500001%3A0xe3f57105baec7023!2sGedung%20Damar%20(K)%2C%20Telkom%20University!5e0!3m2!1sid!2sid!4v1784514546441!5m2!1sid!2sid'
                            className='absolute inset-0 h-full w-full rounded-2xl'
                            style={{ border: 0 }}
                            allowFullScreen
                            loading='lazy'
                            referrerPolicy='strict-origin-when-cross-origin'
                        ></iframe>
                    </div>

                    <div className='min-w-0 space-y-6 font-raleway'>
                        <div className='flex items-start gap-3'>
                            <MapPin className='mt-1 h-5 w-5 shrink-0 text-amber-300' />
                            <div className='min-w-0'>
                                <p className='font-semibold text-white'>
                                    Address:
                                </p>
                                <p className='break-words text-white/70'>
                                    K, K,, Sukapura, Kec. Dayeuhkolot, Kabupaten
                                    Bandung, Jawa Barat 40257
                                </p>
                            </div>
                        </div>

                        <div className='flex items-start gap-3'>
                            <Clock className='mt-1 h-5 w-5 shrink-0 text-amber-300' />
                            <div>
                                <p className='font-semibold text-white'>
                                    Open Gate:
                                </p>
                                <p className='text-white/70'>12:00 WIB</p>
                            </div>
                        </div>

                        <div className='flex items-start gap-3'>
                            <Calendar className='mt-1 h-5 w-5 shrink-0 text-amber-300' />
                            <div>
                                <p className='font-semibold text-white'>
                                    Event Date:
                                </p>
                                <p className='text-white/70'>
                                    October 4, 2026
                                </p>
                            </div>
                        </div>

                        <a
                            href='https://maps.app.goo.gl/prdpW3aqufeTAeb37'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white transition duration-300 hover:scale-[1.02]'
                        >
                            <Image
                                src='/speakers/Texture.webp'
                                alt=''
                                fill
                                sizes='300px'
                                className='object-cover'
                            />
                            <span className='relative z-10'>
                                View on Google Maps
                            </span>
                            <ExternalLink className='relative z-10 h-4 w-4' />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VenueInfo;
