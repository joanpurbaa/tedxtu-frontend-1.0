'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import Image from 'next/image';
import { Suspense, useCallback, useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import PaymentPage from '../../../components/sections/ticketing/paymentPage';
import PaymentSuccessPage from '../../../components/sections/ticketing/paymentSuccess';
import StepProgress, {
    ticketingSteps,
} from '../../../components/sections/ticketing/StepProgress';
import { ticketsData } from '../../../components/sections/event/TicketSelection';
import {
    BUNDLE_MEMBER_COUNT,
    BUNDLE_PRICES,
    formatBundlePrice,
    type BundleType,
} from '@/lib/ticketPricing';

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

type BundleMember = {
    name: string;
    email: string;
    phone: string;
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

// Data alur checkout disimpan di localStorage agar tidak hilang saat halaman
// di-reload / tab dipulihkan (sering terjadi di HP saat berpindah ke
// aplikasi transfer/WA). Sebelumnya, reload di step payment membuat form
// kosong dan checkout membalas error 'Missing fields'.
const FLOW_STORAGE_KEY = 'tedx:ticketing:flow';

type StoredFlow = {
    tier?: string;
    form?: FormData;
    regType?: 'INDIVIDUAL' | 'BUNDLING' | null;
    bundleType?: BundleType;
    bundleMembers?: BundleMember[];
};

function readStoredFlow(): StoredFlow | null {
    try {
        const raw = window.localStorage.getItem(FLOW_STORAGE_KEY);
        return raw ? (JSON.parse(raw) as StoredFlow) : null;
    } catch {
        return null;
    }
}

function writeStoredFlow(value: StoredFlow) {
    try {
        window.localStorage.setItem(FLOW_STORAGE_KEY, JSON.stringify(value));
    } catch {
        // Penyimpanan bisa saja penuh/nonaktif; persistensi bersifat best-effort.
    }
}

function clearStoredFlow() {
    try {
        window.localStorage.removeItem(FLOW_STORAGE_KEY);
    } catch {
        // ignore
    }
}

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
    const selectedTicket = ticketsData.find((t) => t.tier === tier);
    const tierHardSoldOut = selectedTicket?.soldOut === true;

    const [regType, setRegType] = useState<'INDIVIDUAL' | 'BUNDLING' | null>(
        null,
    );
    const [bundleType, setBundleType] = useState<BundleType>('DUO');
    const [bundleMembers, setBundleMembers] = useState<BundleMember[]>([]);

    const isNormal = tier === 'NORMAL PRICE';
    const isBundling = regType === 'BUNDLING' && isNormal;

    const baseSteps = ['identity', 'persona', 'payment', 'consent'] as const;
    type StepName =
        | 'bundle'
        | 'identity'
        | 'persona'
        | 'party'
        | 'payment'
        | 'consent'
        | 'success';
    const allSteps: readonly StepName[] = isNormal
        ? isBundling
            ? ['bundle', 'identity', 'persona', 'party', 'payment', 'consent']
            : ['bundle', 'identity', 'persona', 'payment', 'consent']
        : [...baseSteps];
    type Step = StepName;

    const initialStep: Step =
        tier === 'NORMAL PRICE' ? 'bundle' : 'identity';
    const rawStep = searchParams.get('step');
    const step: Step =
        rawStep &&
        (allSteps.includes(rawStep as Step) || rawStep === 'success')
            ? (rawStep as Step)
            : initialStep;

    const router = useRouter();

    const goStep = useCallback(
        (s: Step, order?: string) => {
            const params = new URLSearchParams();
            if (tier) params.set('tier', tier);
            if (price) params.set('price', price);
            params.set('step', s);
            if (order) params.set('order', order);
            router.push(`/ticketing?${params.toString()}`, { scroll: false });
        },
        [tier, price, router],
    );

    const [form, setForm] = useState<FormData>(initial);
    const [orderId, setOrderId] = useState<string | null>(null);
    const [error, setError] = useState('');
    const [hydrated, setHydrated] = useState(false);

    // Pulihkan data alur dari localStorage saat halaman dimuat ulang.
    useEffect(() => {
        const stored = readStoredFlow();
        if (stored?.tier === tier && stored.form) {
            setForm({ ...initial, ...stored.form });
            if (stored.regType) setRegType(stored.regType);
            if (stored.bundleType) setBundleType(stored.bundleType);
            if (stored.bundleMembers) setBundleMembers(stored.bundleMembers);
            if (
                stored.regType === 'BUNDLING' &&
                stored.bundleType &&
                (stored.bundleMembers || []).length !==
                    BUNDLE_MEMBER_COUNT[stored.bundleType] - 1
            ) {
                setBundleMembers(
                    Array.from(
                        { length: BUNDLE_MEMBER_COUNT[stored.bundleType] - 1 },
                        () => ({ name: '', email: '', phone: '' }),
                    ),
                );
            }
        }
        setHydrated(true);
    }, [tier]);

    // Simpan data alur terus-menerus agar reload di step mana pun tetap utuh.
    useEffect(() => {
        if (!hydrated) return;
        writeStoredFlow({
            tier,
            form,
            regType,
            bundleType,
            bundleMembers,
        });
    }, [hydrated, tier, form, regType, bundleType, bundleMembers, step]);

    // Guard: jika form belum lengkap namun sudah berada di langkah yang
    // membutuhkan data (payment/consent), kembalikan ke 'identity' agar
    // user tidak pernah menerima error 'Missing fields'.
    useEffect(() => {
        if (!hydrated) return;
        if (
            (step === 'payment' || step === 'consent') &&
            (!form.fullName.trim() || !form.email.trim())
        ) {
            goStep('identity');
        }
    }, [hydrated, step, form.fullName, form.email, goStep]);

    const initMembers = (bt: BundleType) =>
        Array.from(
            { length: Math.max(0, BUNDLE_MEMBER_COUNT[bt] - 1) },
            () => ({
                name: '',
                email: '',
                phone: '',
            }),
        );

    const setMember = (i: number, key: keyof BundleMember, value: string) =>
        setBundleMembers((prev) =>
            prev.map((m, idx) => (idx === i ? { ...m, [key]: value } : m)),
        );

    const stepLabels = isNormal
        ? isBundling
            ? [
                  'Registration',
                  ...ticketingSteps.slice(0, 2),
                  'Party',
                  ...ticketingSteps.slice(2),
              ]
            : ['Registration', ...ticketingSteps]
        : undefined;

    const set = <K extends keyof FormData>(key: K, value: FormData[K]) =>
        setForm((prev) => ({ ...prev, [key]: value }));

    const onText = (
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
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

    const validateBundle = () => {
        if (!regType)
            return 'Choose your registration type (Individual or Bundling).';
        if (regType === 'BUNDLING' && !bundleType)
            return 'Choose a bundle type (Duo or 4 People).';
        return '';
    };

    const validateParty = () => {
        if (!isBundling) return '';
        const count = BUNDLE_MEMBER_COUNT[bundleType] - 1;
        for (let i = 0; i < count; i++) {
            const m = bundleMembers[i];
            if (!m?.name.trim()) return `Enter member ${i + 1} name.`;
            if (!/^\S+@\S+\.\S+$/.test(m.email.trim()))
                return `Enter a valid email for member ${i + 1}.`;
            if (!/^\+?\d{9,15}$/.test(m.phone.trim()))
                return `Enter a valid WhatsApp number for member ${i + 1}.`;
        }
        return '';
    };

    const next = (e: FormEvent) => {
        e.preventDefault();
        let msg = '';
        if (step === 'bundle') msg = validateBundle();
        if (step === 'identity') msg = validateIdentity();
        if (step === 'persona') msg = validatePersona();
        if (step === 'party') msg = validateParty();
        if (step === 'consent') msg = validateConsent();

        if (msg) {
            setError(msg);
            return;
        }
        setError('');

        const idx = allSteps.indexOf(step as (typeof allSteps)[number]);
        const nextStep = allSteps[idx + 1];

        // Pastikan slot member selalu siap saat memasuki step 'party',
        // walau user tidak menekan chip bundle terlebih dahulu.
        if (
            nextStep === 'party' &&
            bundleMembers.length !== BUNDLE_MEMBER_COUNT[bundleType] - 1
        ) {
            setBundleMembers(initMembers(bundleType));
        }

        if (step === 'consent') submitConsent();
        else goStep(nextStep);
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

        goStep('success', orderId ?? undefined);
        clearStoredFlow();
    };

    if (tierHardSoldOut) {
        return (
            <>
                <Navbar />

                <main className='relative flex min-h-screen items-center justify-center overflow-x-hidden bg-black px-6 pt-24 pb-16 text-center text-white'>
                    <section className='max-w-xl'>
                        <h1 className='font-westmeath text-4xl uppercase text-white sm:text-5xl'>
                            Sold Out
                        </h1>
                        <p className='mt-4 font-raleway text-lg leading-relaxed text-white/75'>
                            Tiket {tier} telah habis dan tidak dapat dibeli
                            lagi. Silakan pilih jenis tiket lainnya.
                        </p>
                    </section>
                </main>

                <Footer />
            </>
        );
    }

    if (step === 'payment') {
        return (
            <PaymentPage
                tier={tier}
                price={price}
                formData={form}
                bundleType={isBundling ? bundleType : undefined}
                members={isBundling ? bundleMembers : undefined}
                activeIndex={allSteps.indexOf('payment')}
                labels={stepLabels}
                onConfirm={(newOrderId) => {
                    setOrderId(newOrderId);
                    goStep('consent');
                }}
            />
        );
    }

    if (step === 'success') {
        const successBundleLabel =
            isBundling && bundleType === 'DUO'
                ? 'Normal Price — Bundling Duo'
                : isBundling && bundleType === 'FOUR'
                  ? 'Normal Price — Bundling 4 People'
                  : undefined;
        const successOrderId =
            searchParams.get('order') ?? orderId ?? undefined;
        return (
            <PaymentSuccessPage
                orderId={successOrderId}
                tier={tier}
                bundleLabel={successBundleLabel}
            />
        );
    }

    const stepIndex = allSteps.indexOf(step as (typeof allSteps)[number]);
    const nextStepName = allSteps[stepIndex + 1];
    const headerLabel = isNormal
        ? isBundling && bundleType
            ? `NORMAL PRICE — Bundling ${
                  bundleType === 'DUO' ? 'Duo' : '4 People'
              } — RP ${BUNDLE_PRICES[bundleType].toLocaleString('id-ID')}`
            : `NORMAL PRICE — Individual — RP ${BUNDLE_PRICES.SOLO.toLocaleString(
                  'id-ID',
              )}`
        : `${tier} — ${price}`;

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
                            {headerLabel}
                        </p>
                    </div>

                    <StepProgress activeIndex={stepIndex} labels={stepLabels} />

                    <form onSubmit={next}>
                        <div className='rounded-[38px] border border-white/15 bg-black/25 px-8 py-8 pb-10 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-3xl space-y-6'>
                            {step === 'bundle' && (
                                <>
                                    <h2 className='text-center font-title text-3xl uppercase'>
                                        Registration Type
                                    </h2>
                                    <p className='text-center font-raleway text-sm text-white/50'>
                                        Normal Price — how are you registering
                                        for this ticket?
                                    </p>

                                    <div>
                                        <p className='mb-2 font-title text-sm uppercase'>
                                            Registration Type
                                        </p>
                                        <div className='flex flex-wrap gap-3'>
                                            <Chip
                                                active={
                                                    regType === 'INDIVIDUAL'
                                                }
                                                label={`Individual — ${formatBundlePrice('SOLO')}`}
                                                onClick={() =>
                                                    setRegType('INDIVIDUAL')
                                                }
                                            />
                                            <Chip
                                                active={regType === 'BUNDLING'}
                                                label='Bundling'
                                                onClick={() => {
                                                    setRegType('BUNDLING');
                                                    setBundleMembers(
                                                        initMembers(bundleType),
                                                    );
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {regType === 'BUNDLING' && (
                                        <>
                                            <div>
                                                <p className='mb-2 font-title text-sm uppercase'>
                                                    Choose Your Bundle
                                                </p>
                                                <div className='flex flex-wrap gap-3 mb-3'>
                                                    {(
                                                        [
                                                            ['DUO', 'Duo', 2],
                                                            [
                                                                'FOUR',
                                                                '4 People',
                                                                4,
                                                            ],
                                                        ] as const
                                                    ).map(
                                                        ([
                                                            bt,
                                                            label,
                                                            people,
                                                        ]) => (
                                                            <Chip
                                                                key={bt}
                                                                active={
                                                                    bundleType ===
                                                                    bt
                                                                }
                                                                label={`${label} (${
                                                                    people
                                                                } People) — ${formatBundlePrice(
                                                                    bt,
                                                                )}`}
                                                                onClick={() => {
                                                                    setBundleType(
                                                                        bt,
                                                                    );
                                                                    setBundleMembers(
                                                                        initMembers(
                                                                            bt,
                                                                        ),
                                                                    );
                                                                }}
                                                            />
                                                        ),
                                                    )}
                                                </div>
                                                <SubHeader>
                                                    Prices are calculated
                                                    automatically by the system
                                                    and verified at checkout.
                                                </SubHeader>
                                            </div>
                                        </>
                                    )}
                                </>
                            )}

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
                                            University or not a student, please
                                            fill &quot;Others&quot;
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
                                            How familiar are you with TED/TEDx?
                                        </p>
                                        <div className='flex flex-col gap-2'>
                                            {[
                                                "I'm completely new to it",
                                                "I've heard of it/watched a few talks before",
                                                'I know the platform well/watch them regularly and a big fan of it',
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
                                            listen to music twice a day&apos; to
                                            &apos;Music is my whole
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
                                            believe who you are today is because
                                            of your own choices, or is it shaped
                                            by the people and environment around
                                            you?
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
                                            design, do you believe your emotions
                                            can truly be expressed through them?
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
                                            What is the single biggest takeaway
                                            or feeling you hope to bring home
                                            after experiencing the
                                            TEDxTelkomUniversity Main Event this
                                            year?
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
                                            which aspect of the experience are
                                            you looking forward to the most?
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

                            {step === 'party' && (
                                <>
                                    <h2 className='text-center font-title text-3xl uppercase'>
                                        Party of Bundle
                                    </h2>
<p className='text-center font-raleway text-sm text-white/50'>
                                        Fill in the details for the other
                                        bundle member
                                        {BUNDLE_MEMBER_COUNT[bundleType] - 1 >
                                        1
                                            ? 's'
                                            : ''}
                                        .{' '}
                                        {BUNDLE_MEMBER_COUNT[bundleType] - 1}{' '}
                                        member
                                        {BUNDLE_MEMBER_COUNT[bundleType] - 1 >
                                        1
                                            ? 's'
                                            : ''}{' '}
                                        needed — {bundleType === 'DUO'
                                            ? '2 People'
                                            : '4 People'}{' '}
                                        total.
                                    </p>

                                    {bundleMembers.map((m, i) => (
                                        <div
                                            key={i}
                                            className='space-y-4 rounded-3xl border border-white/10 bg-white/5 p-5'
                                        >
                                            <p className='font-title text-sm uppercase'>
                                                Member {i + 1} of{' '}
                                                {BUNDLE_MEMBER_COUNT[
                                                    bundleType
                                                ] - 1}
                                            </p>
                                            <div>
                                                <label
                                                    htmlFor={`member-name-${i}`}
                                                    className='mb-2 block font-title text-sm uppercase'
                                                >
                                                    Full Name
                                                </label>
                                                <input
                                                    id={`member-name-${i}`}
                                                    className={inputClass()}
                                                    value={m.name}
                                                    onChange={(e) =>
                                                        setMember(
                                                            i,
                                                            'name',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder='e.g., Jane Doe'
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor={`member-email-${i}`}
                                                    className='mb-2 block font-title text-sm uppercase'
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    id={`member-email-${i}`}
                                                    type='email'
                                                    className={inputClass()}
                                                    value={m.email}
                                                    onChange={(e) =>
                                                        setMember(
                                                            i,
                                                            'email',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder='e.g., jane@gmail.com'
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor={`member-phone-${i}`}
                                                    className='mb-2 block font-title text-sm uppercase'
                                                >
                                                    WhatsApp Number
                                                </label>
                                                <input
                                                    id={`member-phone-${i}`}
                                                    className={inputClass()}
                                                    value={m.phone}
                                                    onChange={(e) =>
                                                        setMember(
                                                            i,
                                                            'phone',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder='e.g., +6280123456'
                                                />
                                            </div>
                                        </div>
                                    ))}
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
                                            information submitted by me has been
                                            double-checked and is true and
                                            accurate.
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
                                            processed by TEDx Telkom University?
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
                            {step !== 'identity' && step !== 'bundle' ? (
                                <button
                                    type='button'
                                    onClick={() =>
                                        goStep(
                                            allSteps[
                                                Math.max(0, stepIndex - 1)
                                            ],
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
                                {step === 'consent'
                                    ? 'Submit'
                                    : nextStepName === 'payment'
                                      ? 'Continue to Payment'
                                      : nextStepName === 'party'
                                        ? 'Continue to Party'
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
