'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, X } from 'lucide-react';

const galleryImages = [
  '/gallery/gallery-1.webp',
  '/gallery/gallery-2.webp',
  '/gallery/gallery-3.webp',
  '/gallery/gallery-4.webp',
  '/gallery/gallery-5.webp',
  '/gallery/gallery-6.webp',
  '/gallery/gallery-7.webp',
  '/gallery/gallery-8.webp',
  '/gallery/gallery-9.webp',
  '/gallery/gallery-10.webp',
  '/gallery/gallery-11.webp',
  '/gallery/gallery-12.webp',
];

const topRow = galleryImages.slice(0, 6);
const bottomRow = galleryImages.slice(6, 12);

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="relative w-full overflow-hidden bg-black pt-12 pb-24 sm:pt-16 sm:pb-32 md:pt-20 md:pb-40">
      <div className="absolute inset-0 opacity-15">
        <Image src="/speakers/Texture.svg" alt="" fill sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />

      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[50rem] w-[80rem] -translate-x-1/2 translate-y-1/2 sm:h-[65rem] sm:w-[104rem] md:h-[80rem] md:w-[128rem]">
        <Image src="/about/red-ellipse.webp" alt="" fill sizes="128rem" className="object-fill" />
        <div
          className="absolute inset-0"
          style={{
            maskImage: "url('/about/red-ellipse.webp')",
            WebkitMaskImage: "url('/about/red-ellipse.webp')",
            maskSize: '100% 100%',
            WebkitMaskSize: '100% 100%',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
            maskPosition: 'center',
            WebkitMaskPosition: 'center',
          }}
        >
          <div
            className="h-full w-full opacity-20 mix-blend-overlay"
            style={{
              backgroundImage: "url('/speakers/backgroundTexture.svg')",
              backgroundRepeat: 'repeat',
              backgroundSize: '48rem 48rem',
            }}
          />
        </div>
      </div>

      <div className="relative">
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute -right-44 -top-8 h-48 w-48 -rotate-[50deg] opacity-45 sm:-right-60 sm:-top-10 sm:h-64 sm:w-64 md:-right-80 md:-top-12 md:h-80 md:w-80">
            <Image src="/about/golden-note.webp" alt="" fill sizes="320px" className="object-contain" />
          </div>
          <h2 className="mb-14 font-westmeath text-2xl uppercase tracking-wide text-white sm:mb-20 sm:text-3xl md:mb-24 md:text-4xl lg:text-5xl">
            Gallery from Main Event
          </h2>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div className="overflow-hidden">
            <div className="flex w-max animate-marquee-left gap-4 sm:gap-6 hover:[animation-play-state:paused]">
              {[...topRow, ...topRow].map((src, idx) => (
                <button
                  key={`top-${idx}`}
                  onClick={() => setSelectedImage(src)}
                  className="relative h-36 w-52 shrink-0 overflow-hidden rounded-xl shadow-2xl sm:h-44 sm:w-64 md:h-52 md:w-72"
                >
                  <Image src={src} alt="" fill sizes="288px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="flex w-max animate-marquee-right gap-4 sm:gap-6 hover:[animation-play-state:paused]">
              {[...bottomRow, ...bottomRow].map((src, idx) => (
                <button
                  key={`bottom-${idx}`}
                  onClick={() => setSelectedImage(src)}
                  className="relative h-36 w-52 shrink-0 overflow-hidden rounded-xl shadow-2xl sm:h-44 sm:w-64 md:h-52 md:w-72"
                >
                  <Image src={src} alt="" fill sizes="288px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex justify-center sm:mt-20 md:mt-24">
          <a
            href="https://flic.kr/s/aHBqjCg6hx"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 font-westmeath text-sm uppercase tracking-[0.1em] text-white transition-all duration-300 hover:scale-[1.02] hover:bg-amber-300 sm:px-8 sm:text-base"
          >
            <span>View Full Gallery</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-5xl">
            <Image
              src={selectedImage}
              alt=""
              width={1200}
              height={800}
              className="h-auto max-h-[90vh] w-full rounded-lg object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 rounded-full bg-white/20 p-2 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/30 sm:top-4 sm:right-4"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
