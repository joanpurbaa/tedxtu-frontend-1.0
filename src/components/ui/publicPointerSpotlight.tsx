'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const INTERACTIVE_SELECTOR =
    'a, button, input, select, textarea, summary, [role="button"], [tabindex]:not([tabindex="-1"])';

export default function PublicPointerSpotlight() {
    const pathname = usePathname();
    const spotlightRef = useRef<HTMLDivElement>(null);
    const frameRef = useRef<number | null>(null);
    const pointerRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (pathname.startsWith('/admin')) {
            return;
        }

        const spotlight = spotlightRef.current;
        if (!spotlight) {
            return;
        }

        const setPosition = (x: number, y: number) => {
            pointerRef.current = { x, y };
            if (frameRef.current !== null) {
                return;
            }

            frameRef.current = window.requestAnimationFrame(() => {
                const { x: nextX, y: nextY } = pointerRef.current;
                spotlight.style.transform = `translate3d(${nextX}px, ${nextY}px, 0)`;
                frameRef.current = null;
            });
        };

        const handlePointerMove = (event: PointerEvent) => {
            setPosition(event.clientX, event.clientY);
            spotlight.classList.add('public-pointer-spotlight-visible');
        };

        const handlePointerOver = (event: PointerEvent) => {
            const target = event.target;
            if (!(target instanceof Element)) {
                return;
            }

            const isInteractive = Boolean(target.closest(INTERACTIVE_SELECTOR));
            spotlight.classList.toggle(
                'public-pointer-spotlight-active',
                isInteractive,
            );
        };

        const handlePointerLeave = () => {
            spotlight.classList.remove('public-pointer-spotlight-visible');
        };

        window.addEventListener('pointermove', handlePointerMove, {
            passive: true,
        });
        window.addEventListener('pointerover', handlePointerOver, {
            passive: true,
        });
        document.documentElement.addEventListener('pointerleave', handlePointerLeave);

        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerover', handlePointerOver);
            document.documentElement.removeEventListener(
                'pointerleave',
                handlePointerLeave,
            );
            if (frameRef.current !== null) {
                window.cancelAnimationFrame(frameRef.current);
            }
        };
    }, [pathname]);

    if (pathname.startsWith('/admin')) {
        return null;
    }

    return (
        <>
            <div ref={spotlightRef} className='public-pointer-spotlight' />
        </>
    );
}
