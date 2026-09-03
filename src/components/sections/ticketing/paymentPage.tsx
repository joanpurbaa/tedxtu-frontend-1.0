'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import Image from 'next/image';
import { Upload } from 'lucide-react';
import { useEffect, useState, ChangeEvent, DragEvent } from 'react';
import StepProgress from './StepProgress';
import { ticketsData } from '@/components/sections/event/TicketSelection';

type Props = {
    orderId: string;
    tier: string;
    price: string;
    onConfirm?: () => void;
};

const formatTime = (seconds: number) => {
    const safeSeconds = Math.max(0, seconds);

    const minutes = Math.floor(safeSeconds / 60);
    const remainingSeconds = safeSeconds % 60;

    return `${minutes.toString().padStart(2, '0')} : ${remainingSeconds
        .toString()
        .padStart(2, '0')}`;
};

export default function PaymentPage({ orderId, tier, price, onConfirm }: Props) {
    const [timeLeft, setTimeLeft] = useState(7 * 60);
    const selectedTicket = ticketsData.find((t) => t.tier === tier);

    // State untuk data input
    const [paymentName, setPaymentName] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // State untuk menampung teks peringatan merah
    const [fileError, setFileError] = useState<string>('');
    const [nameError, setNameError] = useState<string>('');

    // State untuk indikasi proses upload (mencegah double click)
    const [uploading, setUploading] = useState<boolean>(false);

    // State untuk visual efek drag and drop
    const [isDragging, setIsDragging] = useState<boolean>(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Helper fungsi untuk validasi file terpusat
    const validateAndSetFile = (file: File) => {
        const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        const maxSizeInBytes = 4 * 1024 * 1024; // 4MB

        if (!validTypes.includes(file.type)) {
            setFileError('Format file harus PNG atau JPG.');
            setSelectedFile(null);
            return false;
        }

        if (file.size > maxSizeInBytes) {
            setFileError('Ukuran file maksimal adalah 4 MB.');
            setSelectedFile(null);
            return false;
        }

        setFileError('');
        setSelectedFile(file);
        return true;
    };

    // Handler validasi file dari klik input biasa
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const isValid = validateAndSetFile(file);
            if (!isValid) {
                e.target.value = '';
            }
        }
    };

    // Handlers untuk Drag and Drop
    const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            validateAndSetFile(file);
        }
    };

    const handleConfirmPayment = async () => {
        // Cegah double click: abaikan jika upload sedang berjalan
        if (uploading) return;

        let hasError = false;

        if (!selectedFile) {
            setFileError('Please upload your payment evidence.');
            hasError = true;
        } else {
            setFileError('');
        }

        if (!paymentName.trim()) {
            setNameError("Payment's name cannot be empty.");
            hasError = true;
        } else {
            setNameError('');
        }

        if (hasError) return;

        const file = selectedFile;
        if (!file) return;

        setUploading(true);

        try {
            // 1. Request upload permission (presigned URL) ke Vercel Blob
            const uploadUrlRes = await fetch('/api/payment/upload-url', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderId,
                    fileName: file.name,
                    fileType: file.type,
                    fileSize: file.size,
                }),
            });

            const uploadUrlData = await uploadUrlRes.json().catch(() => null);

            if (!uploadUrlRes.ok || !uploadUrlData?.uploadUrl) {
                setFileError(
                    uploadUrlData?.error ||
                        'Gagal meminta izin upload. Silakan coba lagi.',
                );
                return;
            }

            // 2. Upload file langsung ke Vercel Blob
            const blobRes = await fetch(uploadUrlData.uploadUrl, {
                method: 'PUT',
                headers: { 'Content-Type': file.type },
                body: file,
            });

            const blobData = await blobRes.json().catch(() => null);

            if (!blobRes.ok || !blobData?.url) {
                setFileError(
                    'Gagal mengunggah file ke Vercel Blob. Silakan coba lagi.',
                );
                return;
            }

            // 3. Finalisasi: simpan URL bukti pembayaran
            const completeRes = await fetch('/api/payment/complete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderId,
                    proofUrl: blobData.url,
                    paymentName,
                }),
            });

            const completeData = await completeRes.json().catch(() => null);

            if (!completeRes.ok) {
                setFileError(
                    completeData?.error ||
                        'Gagal menyimpan bukti pembayaran. Silakan coba lagi.',
                );
                return;
            }

            if (onConfirm) {
                onConfirm();
                return;
            }
            alert('Payment confirmed and processing!');
        } catch {
            setFileError(
                'Terjadi kesalahan saat mengunggah. Silakan periksa koneksi dan coba lagi.',
            );
        } finally {
            setUploading(false);
        }
    };

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

                        <div
                            className='
                flex
                h-[46px]
                min-w-[120px]
                items-center
                justify-center
                rounded-xl
                bg-[#980B00]
                px-4
              '
                        >
                            <span
                                className='
                  font-raleway
                  text-xl
                  font-bold
                  tracking-wider
                  leading-none
                  text-white
                '
                            >
                                {formatTime(timeLeft)}
                            </span>
                        </div>
                    </div>

                    <StepProgress activeIndex={2} />

                    {/* PAYMENT CARD */}
                    <div
                        className='
              rounded-[38px]
              border
              border-white/15
              bg-black/25
              px-10
              py-8
              pb-20
              shadow-[0_30px_90px_rgba(0,0,0,0.45)]
              backdrop-blur-3xl
            '
                    >
                        <h2
                            className='
                mb-8
                text-center
                font-title
                text-4xl
                uppercase
              '
                        >
                            Ticketing Process
                        </h2>

                        <div className='space-y-10'>
                            {/* TICKET PACKAGE */}
                            <div>
                                <label className='mb-4 block font-title text-[1.4rem] uppercase'>
                                    Ticket Package 🎟️
                                </label>
                                <div className='rounded-[20px] border border-[#C58A1C] bg-[#C58A1C]/10 px-6 py-5'>
                                    <div className='flex items-center justify-between gap-4'>
                                        <div>
                                            <p className='font-title text-lg uppercase text-white'>
                                                {tier}
                                            </p>
                                            <p className='mt-1 font-raleway text-2xl text-amber-300'>
                                                {price}
                                            </p>
                                        </div>
                                        <span className='shrink-0 rounded-full bg-[#C58A1C] px-4 py-1 font-raleway text-xs font-bold uppercase tracking-wide text-black'>
                                            Selected
                                        </span>
                                    </div>
                                    {selectedTicket && (
                                        <ul className='mt-4 space-y-2 text-left font-raleway text-sm leading-6 text-white/80'>
                                            {selectedTicket.features.map(
                                                (feature) => (
                                                    <li
                                                        key={feature}
                                                        className='flex gap-3'
                                                    >
                                                        <span className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300' />
                                                        <span>{feature}</span>
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    )}
                                </div>
                            </div>

                            {/* QRIS */}
                            <div className='flex justify-center'>
                                <div className='relative h-[420px] w-[420px] overflow-hidden rounded-[24px] bg-white'>
                                    <Image
                                        src='/ticketing/tedx-qris.png'
                                        alt='QRIS'
                                        fill
                                        className='object-cover'
                                    />
                                </div>
                            </div>

                            {/* UPLOAD */}
                            <div>
                                <label
                                    className='
                    mb-2
                    block
                    font-title
                    text-[1.4rem]
                    uppercase
                  '
                                >
                                    Payment Proof
                                </label>
                                <p className='mb-4 font-raleway text-sm text-white/50'>
                                    Kindly insert your proof of payment below
                                    😊
                                </p>

                                <label
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    className={`
                    flex
                    h-[220px]
                    w-full
                    cursor-pointer
                    flex-col
                    items-center
                    justify-center
                    rounded-[20px]
                    border
                    border-dashed
                    bg-white/5
                    text-center
                    backdrop-blur-md
                    transition-all
                    duration-200
                    ${
                        isDragging
                            ? 'border-[#C58A1C] bg-[#C58A1C]/10 scale-[0.99]'
                            : 'border-white/30 hover:border-[#C58A1C]'
                    }
                  `}
                                >
                                    <Upload
                                        size={42}
                                        className={`mb-4 transition-colors ${
                                            isDragging
                                                ? 'text-[#C58A1C]'
                                                : 'text-white/70'
                                        }`}
                                    />

                                    <span className='font-raleway text-3xl text-white/90'>
                                        {isDragging
                                            ? 'Drop here!'
                                            : selectedFile
                                              ? 'File Selected'
                                              : 'Click or Drag for Upload'}
                                    </span>

                                    <span className='mt-3 font-raleway text-lg text-white/50'>
                                        {selectedFile
                                            ? selectedFile.name
                                            : '1 file, PNG / JPG, max 4 mb'}
                                    </span>

                                    <input
                                        type='file'
                                        accept='.png,.jpg,.jpeg'
                                        className='hidden'
                                        onChange={handleFileChange}
                                    />
                                </label>

                                {/* TEXT WARNING UNTUK UPLOAD FILE */}
                                {fileError && (
                                    <p className='mt-2 text-sm text-[#FFB4B4] font-raleway pl-1'>
                                        {fileError}
                                    </p>
                                )}
                            </div>

                            {/* PAYMENT NAME */}
                            <div>
                                <label
                                    htmlFor='paymentName'
                                    className='
                    mb-3
                    block
                    font-title
                    text-[1.4rem]
                    uppercase
                  '
                                >
                                    YOUR BANK ACCOUNT NAME
                                </label>

                                <input
                                    id='paymentName'
                                    type='text'
                                    value={paymentName}
                                    onChange={(e) => {
                                        setPaymentName(e.target.value);
                                        if (e.target.value.trim())
                                            setNameError('');
                                    }}
                                    placeholder="Your payment's name (ex: Draco Malfoy)"
                                    className='
                    h-[60px]
                    w-full
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    px-6
                    text-base
                    font-raleway
                    text-white
                    outline-none
                    backdrop-blur-md
                    transition
                    duration-200
                    placeholder:text-white/85
                    focus:border-[#C58A1C]/80
                    focus:ring-2
                    focus:ring-[#C58A1C]/60
                  '
                                />

                                {/* TEXT WARNING UNTUK NAMA */}
                                {nameError && (
                                    <p className='mt-2 text-sm text-[#FFB4B4] font-raleway pl-1'>
                                        {nameError}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* BUTTON */}
                    <div className='mt-8 flex justify-end'>
                        <button
                            type='button'
                            onClick={handleConfirmPayment}
                            disabled={uploading}
                            className='
                h-[60px]
                w-[240px]
                rounded-full
                bg-[#980B00]
                font-title
                text-xl
                uppercase
                text-white
                transition
                hover:brightness-110
                cursor-pointer
                disabled:cursor-not-allowed
                disabled:opacity-60
              '
                        >
                            {uploading ? 'Uploading…' : 'Confirm'}
                        </button>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
