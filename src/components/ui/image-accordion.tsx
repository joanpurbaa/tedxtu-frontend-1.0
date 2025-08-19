'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';

interface ImageAccordionProps {
  title: string;
  children: React.ReactNode;
  closedHeaderImage: string;
  openHeaderImage: string;
  contentImage: string;
  className?: string;
}

const ImageAccordion = ({
  title,
  children,
  closedHeaderImage,
  openHeaderImage,
  contentImage,
  className,
}: ImageAccordionProps) => {
  const [open, setOpen] = React.useState(false);
  const [imageWidth, setImageWidth] = React.useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = React.useState(false);
  const imageRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const iconRef = React.useRef<HTMLDivElement>(null);
  const headerImageRef = React.useRef<HTMLDivElement>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  // Track image width to make content the same width
  React.useEffect(() => {
    if (imageRef.current) {
      const updateWidth = () => {
        if (imageRef.current) {
          setImageWidth(imageRef.current.offsetWidth);
        }
      };

      // Set initial width
      updateWidth();

      // Update width on window resize
      window.addEventListener('resize', updateWidth);
      return () => window.removeEventListener('resize', updateWidth);
    }
  }, []);

  // Check if content is scrollable when accordion opens
  React.useEffect(() => {
    if (open && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const checkScrollable = () => {
        const isScrollable = container.scrollHeight > container.clientHeight;
        setShowScrollIndicator(isScrollable);
      };

      // Check after content is rendered
      setTimeout(checkScrollable, 100);

      const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = container;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;
        if (isAtBottom) {
          setShowScrollIndicator(false);
        } else {
          setShowScrollIndicator(container.scrollHeight > container.clientHeight);
        }
      };

      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [open, children]);

  // GSAP animations
  React.useEffect(() => {
    if (headerImageRef.current) {
      // Animate header image transition
      if (open) {
        gsap.to(headerImageRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
          onComplete: () => {
            if (headerImageRef.current) {
              gsap.fromTo(
                headerImageRef.current,
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
              );
            }
          },
        });
      } else {
        gsap.fromTo(
          headerImageRef.current,
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
        );
      }
    }

    // Animate content appearance/disappearance
    if (contentRef.current) {
      if (open) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.1 }
        );
      } else {
        gsap.to(contentRef.current, {
          opacity: 0,
          y: -30,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    }

    // Animate icon rotation and scale
    if (iconRef.current) {
      if (open) {
        gsap.fromTo(
          iconRef.current,
          { rotation: 0, scale: 0.8 },
          { rotation: 180, scale: 1, duration: 0.4, ease: "power2.out" }
        );
      } else {
        gsap.fromTo(
          iconRef.current,
          { rotation: 180, scale: 1 },
          { rotation: 0, scale: 0.8, duration: 0.4, ease: "power2.out" }
        );
      }
    }
  }, [open]);

  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      className={cn('w-full', className)}
      onValueChange={(value) => setOpen(value === 'item-1')}
    >
      <AccordionPrimitive.Item value="item-1" className="relative">
        <AccordionPrimitive.Header className="w-full">
          <AccordionPrimitive.Trigger className="w-full group">
            <div className="relative w-full overflow-hidden" ref={imageRef}>
              {/* Header Image */}
              <div className="relative z-10" ref={headerImageRef}>
                <Image
                  src={open ? openHeaderImage : closedHeaderImage}
                  alt={title}
                  width={1000}
                  height={200}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                  priority
                />
              </div>

              {/* Header Content Overlay */}
              <div className="absolute inset-0 flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-20 pointer-events-none">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase z-50 font-cinzel">
                  {title}
                </h2>

                <div
                  ref={iconRef}
                  className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-3xl sm:text-4xl md:text-5xl rounded-full pointer-events-auto z-50"
                >
                  {open ? (
                    <span className="">⊖</span>
                  ) : (
                    <span className="">⊕</span>
                  )}
                </div>
              </div>
            </div>
          </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>

        {/* Accordion Content - with same width as the image */}
        <AccordionPrimitive.Content
          className="overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down -mt-32 sm:-mt-40 md:-mt-48 lg:-mt-52"
          style={{ width: imageWidth > 0 ? `${imageWidth}px` : '100%' }}
        >
          <div className="relative">
            {/* Content Image */}
            <div className="relative">
              <Image
                src={contentImage}
                alt="Content background"
                width={1000}
                height={600}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block'
                }}
              />




              {/* Content Overlay */}
              <div className="absolute inset-0 p-4 sm:p-6 md:p-8 mt-16 sm:mt-20 md:mt-24 lg:mt-32">
                {/* Scrollable content area */}
                <div className="h-full overflow-hidden">
                  <div
                    ref={(el) => {
                      contentRef.current = el;
                      scrollContainerRef.current = el;
                    }}
                    className="text-white text-justify font-[family-name:var(--font-raleway)] text-sm sm:text-base h-full overflow-y-auto pr-2 custom-scrollbar"
                  >
                    {children}
                  </div>
                  {/* Dynamic scroll fade indicator */}
                  {showScrollIndicator && (
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none">
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white/60 text-xs animate-bounce">
                        Scroll for more
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    </AccordionPrimitive.Root>
  );
};

export { ImageAccordion };
