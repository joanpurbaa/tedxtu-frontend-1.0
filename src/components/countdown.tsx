'use client';

import useCountdown from '@/hooks/useCountdown';
import { cn } from '@/lib/utils';

// Ubah Tanggal Sesaui dengan Tanggal mulai Acara nya
const EVENT_START_DATE = '2026-05-18T08:00:00+07:00';

type CountdownProps = {
    targetDate?: Date | string;
    className?: string;
};

function formatTime(value: number) {
    return value.toString().padStart(2, '0');
}

export default function Countdown({
    targetDate = EVENT_START_DATE,
    className,
}: CountdownProps) {
    const { totalHours, minutes, seconds, isFinished } =
        useCountdown(targetDate);

    // return (
    //     <section
    //         aria-label='Event countdown'
    //         className={cn(
    //             'fixed left-0 right-0 top-0 z-50 flex w-full items-center justify-center overflow-hidden bg-[url(/countdown-background.png)] bg-cover bg-center bg-no-repeat px-4 text-center shadow-[0_10px_24px_rgba(0,0,0,0.65)] py-5',
    //             className,
    //         )}
    //     >
    //         {/* <div className='absolute inset-x-0 bottom-0 h-3 bg-black/80 sm:h-5' /> */}

    //         <p className='relative z-10 font-raleway text-xs font-black uppercase tracking-[0.12em] text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.85)] sm:text-base md:text-lg'>
    //             {isFinished ? (
    //                 'OUR EVENT HAS STARTED! COME TO THE VENUE FOR OTS'
    //             ) : (
    //                 <>
    //                     <span>WILL BE START IN : </span>

    //                     <time
    //                         dateTime={new Date(targetDate).toISOString()}
    //                         className='text-[#FFB41E]'
    //                     >
    //                         {totalHours}H {formatTime(minutes)}M{' '}
    //                         {formatTime(seconds)}S
    //                     </time>
    //                 </>
    //             )}
    //         </p>
    //     </section>
    // );
}
