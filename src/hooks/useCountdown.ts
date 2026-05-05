import { useEffect, useMemo, useState } from 'react';

export type CountdownTimeLeft = {
    totalHours: number;
    minutes: number;
    seconds: number;
    isFinished: boolean;
};

function getTimeLeft(targetTime: number): CountdownTimeLeft {
    const difference = Math.max(targetTime - Date.now(), 0);

    return {
        totalHours: Math.floor(difference / (1000 * 60 * 60)),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isFinished: difference <= 0,
    };
}

export default function useCountdown(deadline: Date | string) {
    const targetTime = useMemo(() => new Date(deadline).getTime(), [deadline]);

    const [timeLeft, setTimeLeft] = useState<CountdownTimeLeft>({
        totalHours: 0,
        minutes: 0,
        seconds: 0,
        isFinished: false,
    });

    useEffect(() => {
        const updateCountdown = () => {
            setTimeLeft(getTimeLeft(targetTime));
        };

        updateCountdown();

        const timer = window.setInterval(updateCountdown, 1000);

        return () => window.clearInterval(timer);
    }, [targetTime]);

    return timeLeft;
}