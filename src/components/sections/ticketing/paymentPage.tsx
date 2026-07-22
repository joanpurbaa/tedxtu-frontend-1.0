'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import Image from 'next/image';
import { Upload } from 'lucide-react';
import { useEffect, useState, ChangeEvent, DragEvent } from 'react';

type Props = {
    orderId: string;
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

export default function PaymentPage({ orderId, onConfirm }: Props) {
    const [timeLeft, setTimeLeft] = useState(7 * 60);

    // State untuk data input
    const [paymentName, setPaymentName] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // State untuk menampung teks peringatan merah
    const [fileError, setFileError] = useState<string>('');
    const [nameError, setNameError] = useState<string>('');

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

        const formData = new FormData();
        formData.append('orderId', orderId);
        formData.append('paymentName', paymentName);
        formData.append('file', selectedFile as File);

        await fetch('/api/payment', { method: 'POST', body: formData });

        if (onConfirm) {
            onConfirm();
            return;
        }
        alert('Payment confirmed and processing!');
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
                            Payment
                        </h2>

                        <div className='space-y-10'>
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
                    mb-4
                    block
                    font-title
                    text-[1.4rem]
                    uppercase
                  '
                                >
                                    Payment Evidence
                                </label>

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
              '
                        >
                            Confirm
                        </button>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
