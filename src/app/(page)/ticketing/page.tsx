'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import Image from 'next/image';
import { Suspense, useState, type ChangeEvent, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import PaymentPage from '../../../components/sections/ticketing/paymentPage';
import PaymentSuccessPage from '../../../components/sections/ticketing/paymentSuccess';
import StepProgress from '../../../components/sections/ticketing/StepProgress';

type FormData = {
    email: string;
    fullName: string;
    nickname: string;
    phone: string;
    domisili: string;
    participantStatus: string;
    studentId: string;
    faculty: string;
    institution: string;
    major: string;
    instagram: string;
    linkedin: string;
    tedFamiliarity: string;
    topics: string[];
    topicsOther: string;
    musicLifestyle: string;
    environmentShapes: string;
    artsExpression: string;
    eventTakeaway: string;
    eventAspect: string[];
    eventAspectOther: string;
    consentAccurate: string;
    consentDataProcessing: string;
    consentUpdates: string;
};

const initial: FormData = {
    email: '',
    fullName: '',
    nickname: '',
    phone: '',
    domisili: '',
    participantStatus: '',
    studentId: '',
    faculty: '',
    institution: '',
    major: '',
    instagram: '',
    linkedin: '',
    tedFamiliarity: '',
    topics: [],
    topicsOther: '',
    musicLifestyle: '',
    environmentShapes: '',
    artsExpression: '',
    eventTakeaway: '',
    eventAspect: [],
    eventAspectOther: '',
    consentAccurate: '',
    consentDataProcessing: '',
    consentUpdates: '',
};

const facultyOptions = [
    'Fakultas Ekonomi dan Bisnis (FEB)',
    'Fakultas Komunikasi dan Ilmu Sosial (FKS)',
    'Fakultas Industri Kreatif (FIK)',
    'Fakultas Ilmu Terapan (FIT)',
    'Fakultas Teknik Elektro (FTE)',
    'Fakultas Informatika (FIF)',
    'Fakultas Rekayasa Industri (FRI)',
    'Others',
];

const topicOptions = [
    'Science & Technology Development',
    'Arts, Music & Design',
    'Environment & animal welfare',
    'History, Archaeology & Culture',
    'Politics & Social Issues',
    'Psychology',
    'Education',
    'Others',
];

const aspectOptions = [
    'Inspiration & New Ideas',
    'Networking & Connection',
    'Atmosphere & Ambience',
    'Self-Reflection',
    'Entertainment',
    'Others',
];

const steps = ['identity', 'persona', 'payment', 'consent'] as const;
type Step = (typeof steps)[number] | 'success';

function inputClass() {
    return 'h-[52px] w-full rounded-2xl border border-white/10 bg-white/5 px-5 text-sm font-raleway text-white outline-none backdrop-blur-md transition duration-200 placeholder:text-white/50 focus:border-[#C58A1C]/80 focus:ring-2 focus:ring-[#C58A1C]/60';
}

function textareaClass() {
    return 'min-h-[120px] w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-raleway text-white outline-none backdrop-blur-md transition duration-200 placeholder:text-white/50 focus:border-[#C58A1C]/80 focus:ring-2 focus:ring-[#C58A1C]/60';
}

function SubHeader({ children }: { children?: string | null }) {
    if (!children) return null;
    return (
        <p className='mb-2 font-raleway text-xs text-white/50'>{children}</p>
    );
}

function Field({
    id,
    label,
    subHeader,
    value,
    onChange,
    placeholder,
}: {
    id: string;
    label: string;
    subHeader?: string | null;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}) {
    return (
        <div>
            <label
                htmlFor={id}
                className='mb-2 block font-title text-sm uppercase'
            >
                {label}
            </label>
            <SubHeader>{subHeader}</SubHeader>
            <input
                id={id}
                className={inputClass()}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
}

function Chip({
    active,
    label,
    onClick,
}: {
    active: boolean;
    label: string;
    onClick: () => void;
}) {
    return (
        <button
            type='button'
            onClick={onClick}
            className={`rounded-full border px-4 py-2 text-left text-sm font-raleway transition ${
                active
                    ? 'border-[#C58A1C] bg-[#C58A1C]/20 text-white'
                    : 'border-white/15 bg-white/5 text-white/70 hover:border-white/30'
            }`}
        >
            {label}
        </button>
    );
}

function YesNo({
    value,
    onChange,
}: {
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <div className='flex gap-3'>
            <Chip
                active={value === 'yes'}
                label='Yes'
                onClick={() => onChange('yes')}
            />
            <Chip
                active={value === 'no'}
                label='No'
                onClick={() => onChange('no')}
            />
        </div>
    );
}

function toggle(list: string[], value: string) {
    return list.includes(value)
        ? list.filter((v) => v !== value)
        : [...list, value];
}

function TicketingFlow() {
    const searchParams = useSearchParams();
    const tier = searchParams.get('tier') ?? 'REGULAR';
    const price = searchParams.get('price') ?? '';

    const [step, setStep] = useState<Step>('identity');
    const [form, setForm] = useState<FormData>(initial);
    const [orderId, setOrderId] = useState<string | null>(null);
    const [error, setError] = useState('');

    const set = <K extends keyof FormData>(key: K, value: FormData[K]) =>
        setForm((prev) => ({ ...prev, [key]: value }));

    const onText = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => set(e.target.id as keyof FormData, e.target.value as never);

    const validateIdentity = () => {
        if (!/^\S+@\S+\.\S+$/.test(form.email.trim()))
            return 'Enter a valid email.';
        if (!form.fullName.trim() || form.fullName.trim().length < 3)
            return 'Full name is required.';
        if (!form.nickname.trim()) return 'Nickname is required.';
        if (!/^\+?\d{9,15}$/.test(form.phone.trim()))
            return 'Enter a valid WhatsApp number.';
        if (!form.domisili.trim()) return 'Please fill your domicile.';
        if (!form.participantStatus) return 'Please select your status.';
        if (!form.studentId.trim())
            return 'Fill your Student ID (NIM), or "-" if not applicable.';
        if (!form.faculty) return 'Please select your faculty.';
        if (!form.major.trim())
            return 'Fill Major/Study Programme, or "-" if not applicable.';
        return '';
    };

    const validatePersona = () => {
        if (!form.tedFamiliarity)
            return 'Please answer how familiar you are with TED/TEDx.';
        if (form.topics.length === 0) return 'Pick at least one topic.';
        if (form.topics.includes('Others') && !form.topicsOther.trim())
            return 'Please specify the topic you meant.';
        if (!form.musicLifestyle.trim())
            return 'Please answer the music question.';
        if (!form.environmentShapes.trim())
            return 'Please answer the psychology question.';
        if (!form.artsExpression.trim())
            return 'Please answer the arts question.';
        if (!form.eventTakeaway.trim())
            return 'Please answer the takeaway question.';
        if (form.eventAspect.length === 0) return 'Pick at least one aspect.';
        if (
            form.eventAspect.includes('Others') &&
            !form.eventAspectOther.trim()
        )
            return "Please specify the aspect you're looking forward to.";
        return '';
    };

    const validateConsent = () => {
        if (!form.consentAccurate)
            return 'Please confirm your data is accurate.';
        if (!form.consentDataProcessing)
            return 'Please answer the data processing consent.';
        if (!form.consentUpdates) return 'Please answer the updates consent.';
        return '';
    };

    const next = (e: FormEvent) => {
        e.preventDefault();
        let msg = '';
        if (step === 'identity') msg = validateIdentity();
        if (step === 'persona') msg = validatePersona();
        if (step === 'consent') msg = validateConsent();

        if (msg) {
            setError(msg);
            return;
        }
        setError('');

        if (step === 'identity') setStep('persona');
        else if (step === 'persona') submitCheckout();
        else if (step === 'consent') submitConsent();
    };

    const submitCheckout = async () => {
        const payload = {
            ...form,
            tier,
            price,
        };

        const res = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            setError('Something went wrong, please try again.');
            return;
        }

        const data = await res.json();
        setOrderId(data.orderId);
        setStep('payment');
    };

    const submitConsent = async () => {
        if (!orderId) {
            setError('Something went wrong, please try again.');
            return;
        }

        const res = await fetch('/api/checkout', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                orderId,
                consentAccurate: form.consentAccurate,
                consentDataProcessing: form.consentDataProcessing,
                consentUpdates: form.consentUpdates,
            }),
        });

        if (!res.ok) {
            setError('Something went wrong, please try again.');
            return;
        }

        setStep('success');
    };

    if (step === 'payment' && orderId) {
        return (
            <PaymentPage
                orderId={orderId}
                tier={tier}
                price={price}
                onConfirm={() => setStep('consent')}
            />
        );
    }

    if (step === 'success') {
        return <PaymentSuccessPage />;
    }

    const stepIndex = steps.indexOf(step as (typeof steps)[number]);

    return (
        <>
            <Navbar />

            <main className='relative min-h-screen overflow-x-hidden bg-black text-white pt-24 sm:pt-28'>
                <div className='pointer-events-none fixed right-[-42rem] top-[-42rem] h-[94rem] w-[94rem]'>
                    <Image
                        src='/about/yellow-ellipse.webp'
                        alt=''
                        fill
                        priority
                        className='object-contain'
                    />
                </div>
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
                    <div className='mb-6'>
                        <h1 className='font-title text-5xl uppercase leading-none lg:text-6xl'>
                            Checkout Ticket
                        </h1>
                        <p className='mt-3 font-raleway text-xl text-white/75'>
                            {tier} — {price}
                        </p>
                    </div>

                    <StepProgress activeIndex={stepIndex} />

                    <form onSubmit={next}>
                        <div className='rounded-[38px] border border-white/15 bg-black/25 px-8 py-8 pb-10 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-3xl space-y-6'>
                            {step === 'identity' && (
                                <>
                                    <h2 className='text-center font-title text-3xl uppercase'>
                                        Identities
                                    </h2>

                                    <Field
                                        id='email'
                                        label='Email'
                                        subHeader='We recommend to use your personal Gmail Account to avoid technical problems'
                                        value={form.email}
                                        onChange={onText}
                                        placeholder='e.g., johndoe@gmail.com'
                                    />

                                    <Field
                                        id='fullName'
                                        label='Full Name'
                                        value={form.fullName}
                                        onChange={onText}
                                        placeholder='e.g., John Doe'
                                    />

                                    <Field
                                        id='nickname'
                                        label='What should we call you? (Nickname)'
                                        value={form.nickname}
                                        onChange={onText}
                                        placeholder='e.g., John'
                                    />

                                    <Field
                                        id='phone'
                                        label='Whatsapp Number'
                                        value={form.phone}
                                        onChange={onText}
                                        placeholder='e.g., +6280123456'
                                    />

                                    <Field
                                        id='domisili'
                                        label='Domicilies'
                                        value={form.domisili}
                                        onChange={onText}
                                        placeholder='e.g., Bandung'
                                    />

                                    <div>
                                        <p className='mb-2 font-title text-sm uppercase'>
                                            What is your current status?
                                        </p>
                                        <div className='flex flex-wrap gap-3'>
                                            {[
                                                'Student',
                                                'Fresh Graduate',
                                                'Professional',
                                            ].map((s) => (
                                                <Chip
                                                    key={s}
                                                    active={
                                                        form.participantStatus ===
                                                        s
                                                    }
                                                    label={s}
                                                    onClick={() =>
                                                        set(
                                                            'participantStatus',
                                                            s,
                                                        )
                                                    }
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <Field
                                        id='studentId'
                                        label='Student ID (NIM)'
                                        subHeader='If you are not from Telkom University or not a student, please fill "-"'
                                        value={form.studentId}
                                        onChange={onText}
                                    />

                                    <div>
                                        <label
                                            htmlFor='faculty'
                                            className='mb-2 block font-title text-sm uppercase'
                                        >
                                            Faculty
                                        </label>
                                        <SubHeader>
                                            If you are not from Telkom
                                            University or not a student,
                                            please fill &quot;Others&quot;
                                        </SubHeader>
                                        <select
                                            id='faculty'
                                            value={form.faculty}
                                            onChange={onText}
                                            className={`${inputClass()} appearance-none`}
                                        >
                                            <option value='' disabled>
                                                Select your faculty
                                            </option>
                                            {facultyOptions.map((f) => (
                                                <option key={f} value={f}>
                                                    {f}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <Field
                                        id='institution'
                                        label='Others'
                                        subHeader="Fill your institution/organization if you're not from Telkom University Student"
                                        value={form.institution}
                                        onChange={onText}
                                        placeholder='e.g., Columbia University, Telkom Indonesia, HIMA Antropologi'
                                    />

                                    <Field
                                        id='major'
                                        label='Major/Study Programme'
                                        subHeader='If you are not a student, please fill with "-"'
                                        value={form.major}
                                        onChange={onText}
                                    />

                                    <Field
                                        id='instagram'
                                        label='Could you drop your Instagram Profile Link?'
                                        value={form.instagram}
                                        onChange={onText}
                                        placeholder='e.g., https://www.instagram.com/tedxtelkomuniversity'
                                    />

                                    <Field
                                        id='linkedin'
                                        label='Could you drop your LinkedIn Account Link?'
                                        value={form.linkedin}
                                        onChange={onText}
                                        placeholder='e.g., https://www.likedin.com/company/tedxtelkom-university/'
                                    />
                                </>
                            )}

                            {step === 'persona' && (
                                <>
                                    <h2 className='text-center font-title text-3xl uppercase'>
                                        Let us know you better! 🎶✨
                                    </h2>

                                    <div>
                                        <p className='mb-2 font-title text-sm uppercase'>
                                            How familiar are you with
                                            TED/TEDx?
                                        </p>
                                        <div className='flex flex-col gap-2'>
                                            {[
                                                "I'm completely new to it",
                                                "I've heard of it/watched a few talks before",
                                                "I know the platform well/watch them regularly and a big fan of it",
                                            ].map((o) => (
                                                <Chip
                                                    key={o}
                                                    active={
                                                        form.tedFamiliarity ===
                                                        o
                                                    }
                                                    label={o}
                                                    onClick={() =>
                                                        set('tedFamiliarity', o)
                                                    }
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <p className='mb-2 font-title text-sm uppercase'>
                                            What kind of topics piqued your
                                            interest the most?
                                        </p>
                                        <div className='flex flex-wrap gap-2'>
                                            {topicOptions.map((t) => (
                                                <Chip
                                                    key={t}
                                                    active={form.topics.includes(
                                                        t,
                                                    )}
                                                    label={t}
                                                    onClick={() =>
                                                        set(
                                                            'topics',
                                                            toggle(
                                                                form.topics,
                                                                t,
                                                            ),
                                                        )
                                                    }
                                                />
                                            ))}
                                        </div>
                                        {form.topics.includes('Others') && (
                                            <input
                                                id='topicsOther'
                                                className={`${inputClass()} mt-3`}
                                                value={form.topicsOther}
                                                onChange={onText}
                                                placeholder='Please specify'
                                            />
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor='musicLifestyle'
                                            className='mb-2 block font-title text-sm uppercase'
                                        >
                                            On a scale of &apos;I would only
                                            listen to music twice a day&apos;
                                            to &apos;Music is my whole
                                            personality&apos;. Where do you
                                            fall?
                                        </label>
                                        <SubHeader>
                                            Feel free to mention your favorite
                                            genre of music! 🎶
                                        </SubHeader>
                                        <textarea
                                            id='musicLifestyle'
                                            className={textareaClass()}
                                            value={form.musicLifestyle}
                                            onChange={onText}
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor='environmentShapes'
                                            className='mb-2 block font-title text-sm uppercase'
                                        >
                                            Speaking of psychology, do you
                                            believe who you are today is
                                            because of your own choices, or
                                            is it shaped by the people and
                                            environment around you?
                                        </label>
                                        <textarea
                                            id='environmentShapes'
                                            className={textareaClass()}
                                            value={form.environmentShapes}
                                            onChange={onText}
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor='artsExpression'
                                            className='mb-2 block font-title text-sm uppercase'
                                        >
                                            When it comes to arts, music &
                                            design, do you believe your
                                            emotions can truly be expressed
                                            through them?
                                        </label>
                                        <textarea
                                            id='artsExpression'
                                            className={textareaClass()}
                                            value={form.artsExpression}
                                            onChange={onText}
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor='eventTakeaway'
                                            className='mb-2 block font-title text-sm uppercase'
                                        >
                                            What is the single biggest
                                            takeaway or feeling you hope to
                                            bring home after experiencing the
                                            TEDxTelkomUniversity Main Event
                                            this year?
                                        </label>
                                        <textarea
                                            id='eventTakeaway'
                                            className={textareaClass()}
                                            value={form.eventTakeaway}
                                            onChange={onText}
                                        />
                                    </div>

                                    <div>
                                        <p className='mb-2 font-title text-sm uppercase'>
                                            When attending the
                                            TEDxTelkomUniversity Main Event,
                                            which aspect of the experience
                                            are you looking forward to the
                                            most?
                                        </p>
                                        <div className='flex flex-wrap gap-2'>
                                            {aspectOptions.map((a) => (
                                                <Chip
                                                    key={a}
                                                    active={form.eventAspect.includes(
                                                        a,
                                                    )}
                                                    label={a}
                                                    onClick={() =>
                                                        set(
                                                            'eventAspect',
                                                            toggle(
                                                                form.eventAspect,
                                                                a,
                                                            ),
                                                        )
                                                    }
                                                />
                                            ))}
                                        </div>
                                        {form.eventAspect.includes(
                                            'Others',
                                        ) && (
                                            <input
                                                id='eventAspectOther'
                                                className={`${inputClass()} mt-3`}
                                                value={form.eventAspectOther}
                                                onChange={onText}
                                                placeholder='Please specify'
                                            />
                                        )}
                                    </div>
                                </>
                            )}

                            {step === 'consent' && (
                                <>
                                    <h2 className='text-center font-title text-3xl uppercase'>
                                        Confirmation & Consent
                                    </h2>

                                    <div>
                                        <p className='mb-2 font-raleway text-white/90'>
                                            I hereby confirm that all
                                            information submitted by me has
                                            been double-checked and is true
                                            and accurate.
                                        </p>
                                        <YesNo
                                            value={form.consentAccurate}
                                            onChange={(v) =>
                                                set('consentAccurate', v)
                                            }
                                        />
                                    </div>

                                    <div>
                                        <p className='mb-2 font-raleway text-white/90'>
                                            Do you consent to your data being
                                            processed by TEDx Telkom
                                            University?
                                        </p>
                                        <YesNo
                                            value={form.consentDataProcessing}
                                            onChange={(v) =>
                                                set('consentDataProcessing', v)
                                            }
                                        />
                                    </div>

                                    <div>
                                        <p className='mb-2 font-raleway text-white/90'>
                                            Do you consent to receiving
                                            updates/news from TEDx Telkom
                                            University?
                                        </p>
                                        <YesNo
                                            value={form.consentUpdates}
                                            onChange={(v) =>
                                                set('consentUpdates', v)
                                            }
                                        />
                                    </div>
                                </>
                            )}

                            {error && (
                                <p className='font-raleway text-sm text-[#FFB4B4]'>
                                    {error}
                                </p>
                            )}
                        </div>

                        <div className='mt-5 flex justify-between'>
                            {step !== 'identity' ? (
                                <button
                                    type='button'
                                    onClick={() =>
                                        setStep(
                                            steps[Math.max(0, stepIndex - 1)],
                                        )
                                    }
                                    className='h-[52px] rounded-full border border-white/20 px-6 font-title text-sm uppercase text-white/70'
                                >
                                    Back
                                </button>
                            ) : (
                                <span />
                            )}
                            <button
                                type='submit'
                                className='h-[52px] rounded-full bg-[#980B00] px-8 font-title text-sm uppercase text-white transition hover:brightness-110'
                            >
                                {step === 'persona'
                                    ? 'Continue to Payment'
                                    : step === 'consent'
                                      ? 'Submit'
                                      : 'Next'}
                            </button>
                        </div>
                    </form>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default function TicketingPage() {
    return (
        <Suspense>
            <TicketingFlow />
        </Suspense>
    );
}
