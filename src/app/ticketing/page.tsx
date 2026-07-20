'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import PaymentPage from './paymentPage';
import PaymentSuccessPage from './paymentSuccess';

type FormValues = {
    fullName: string;
    email: string;
    phone: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialFormValues: FormValues = {
    fullName: '',
    email: '',
    phone: '',
};

const validateForm = (values: FormValues) => {
    const errors: FormErrors = {};

    if (values.fullName.trim().length < 3) {
        errors.fullName = 'Full name must be at least 3 characters.';
    }

    if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) {
        errors.email = 'Enter a valid email address.';
    }

    if (!/^08\d{8,13}$/.test(values.phone.trim())) {
        errors.phone =
            'Phone number must start with 08 and contain 10-15 digits.';
    }

    return errors;
};

const formatTime = (seconds: number) => {
    const safeSeconds = Math.max(0, seconds);

    const minutes = Math.floor(safeSeconds / 60);
    const remainingSeconds = safeSeconds % 60;

    return `${minutes.toString().padStart(2, '0')} : ${remainingSeconds
        .toString()
        .padStart(2, '0')}`;
};

export default function TicketingPage() {
    const [timeLeft, setTimeLeft] = useState(7 * 60);
    const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [step, setStep] = useState<'checkout' | 'payment' | 'success'>(
        'checkout',
    );
    const [orderId, setOrderId] = useState<string | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;

        setFormValues((prev) => ({
            ...prev,
            [id]: value,
        }));

        setFormErrors((prev) => {
            if (!prev[id as keyof FormValues]) {
                return prev;
            }

            const nextValues = {
                ...formValues,
                [id]: value,
            };

            const nextErrors = validateForm(nextValues);

            return {
                ...prev,
                [id]: nextErrors[id as keyof FormValues],
            };
        });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const nextErrors = validateForm(formValues);
        setFormErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) return;

        const res = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formValues),
        });
        const data = await res.json();
        setOrderId(data.orderId);
        setStep('payment');
    };

    if (step === 'payment') {
        return (
            <PaymentPage
                orderId={orderId!}
                onConfirm={() => setStep('success')}
            />
        );
    }

    if (step === 'success') {
        return <PaymentSuccessPage />;
    }

    return (
        <>
            <Navbar />

            <main className='relative min-h-screen overflow-x-hidden bg-black text-white pt-24 sm:pt-28'>
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

                <section className='relative z-10 mx-auto flex w-full max-w-[900px] flex-col px-6 py-6 pb-16'>
                    {/* HEADER */}
                    <div className='mb-6 flex items-end justify-between gap-4'>
                        <div>
                            <h1 className='font-title text-5xl uppercase leading-none lg:text-6xl'>
                                Checkout Ticket
                            </h1>

                            <p className='mt-3 font-[family-name:var(--font-raleway)] text-xl text-white/75'>
                                complete the payment
                            </p>
                        </div>

                        {/* TIMER */}
                        <div className='flex h-[46px] min-w-[120px] items-center justify-center rounded-xl bg-[#980B00] px-4'>
                            <span className='font-raleway text-xl font-bold tracking-wider leading-none text-white'>
                                {formatTime(timeLeft)}
                            </span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} noValidate>
                        {/* FORM */}
                        <div className='flex-1 rounded-[38px] border border-white/15 bg-black/25 px-10 py-8 pb-20 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-3xl transition duration-300 focus-within:border-[#C58A1C]/80 focus-within:ring-2 focus-within:ring-[#C58A1C]/70 focus-within:ring-offset-0'>
                            <h2 className='mb-8 pb-4 text-center font-title text-4xl uppercase'>
                                Personal Data
                            </h2>

                            <div className='space-y-6'>
                                {/* FULL NAME */}
                                <div>
                                    <label
                                        htmlFor='fullName'
                                        className='mb-3 block font-title text-[1.4rem] uppercase'
                                    >
                                        1. Full Name
                                    </label>

                                    <input
                                        id='fullName'
                                        type='text'
                                        value={formValues.fullName}
                                        onChange={handleChange}
                                        placeholder='Type your full name'
                                        className='h-[60px] w-full rounded-2xl border border-white/10 bg-white/5 px-6 text-base font-raleway text-white outline-none backdrop-blur-md transition duration-200 placeholder:font-[family-name:var(--font-raleway)] placeholder:text-white/85 focus:border-[#C58A1C]/80 focus:ring-2 focus:ring-[#C58A1C]/60'
                                    />
                                    {formErrors.fullName ? (
                                        <p className='mt-2 font-raleway text-sm text-[#FFB4B4]'>
                                            {formErrors.fullName}
                                        </p>
                                    ) : null}
                                </div>

                                {/* EMAIL */}
                                <div>
                                    <label
                                        htmlFor='email'
                                        className='mb-3 block font-title text-[1.4rem] uppercase'
                                    >
                                        2. Email
                                    </label>

                                    <input
                                        id='email'
                                        type='email'
                                        value={formValues.email}
                                        onChange={handleChange}
                                        placeholder='name@gmail.com'
                                        className='h-[60px] w-full rounded-2xl border border-white/10 bg-white/5 px-6 text-base font-raleway text-white outline-none backdrop-blur-md transition duration-200 placeholder:font-[family-name:var(--font-raleway)] placeholder:text-white/85 focus:border-[#C58A1C]/80 focus:ring-2 focus:ring-[#C58A1C]/60'
                                    />
                                    {formErrors.email ? (
                                        <p className='mt-2 font-raleway text-sm text-[#FFB4B4]'>
                                            {formErrors.email}
                                        </p>
                                    ) : null}
                                </div>

                                {/* PHONE */}
                                <div>
                                    <label
                                        htmlFor='phone'
                                        className='mb-3 block font-title text-[1.4rem] uppercase'
                                    >
                                        3. Phone Number
                                    </label>

                                    <input
                                        id='phone'
                                        type='tel'
                                        value={formValues.phone}
                                        onChange={handleChange}
                                        placeholder='08xxxxxxxxxx'
                                        className='h-[60px] w-full rounded-2xl border border-white/10 bg-white/5 px-6 text-base font-raleway text-white outline-none backdrop-blur-md transition duration-200 placeholder:font-[family-name:var(--font-raleway)] placeholder:text-white/85 focus:border-[#C58A1C]/80 focus:ring-2 focus:ring-[#C58A1C]/60'
                                    />
                                    {formErrors.phone ? (
                                        <p className='mt-2 font-raleway text-sm text-[#FFB4B4]'>
                                            {formErrors.phone}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        {/* BUTTON */}
                        <div className='mt-5 flex justify-end'>
                            <button
                                type='submit'
                                className='h-[60px] w-[210px] rounded-full bg-[#980B00] font-title text-xl uppercase text-white transition hover:brightness-110'
                            >
                                Next
                            </button>
                        </div>
                    </form>
                </section>
            </main>

            <Footer />
        </>
    );
}
