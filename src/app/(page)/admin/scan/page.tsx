// app/admin/scan/page.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import {
    QrCode,
    Camera,
    CheckCircle,
    XCircle,
    AlertCircle,
} from 'lucide-react';

export default function ScanPage() {
    const scannerRef = useRef<Html5Qrcode | null>(null);
    const [result, setResult] = useState<{
        status: string;
        message: string;
        ticket?: string;
    } | null>(null);
    const [scanning, setScanning] = useState(true);

    useEffect(() => {
        const scanner = new Html5Qrcode('reader');
        scannerRef.current = scanner;

        scanner
            .start(
                { facingMode: 'environment' },
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                    aspectRatio: 1,
                },
                async (decodedText) => {
                    setScanning(false);
                    try {
                        const res = await fetch('/api/scan', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ token: decodedText }),
                        });
                        const data = await res.json();

                        if (data.status === 'success') {
                            setResult({
                                status: 'success',
                                message: 'Ticket verified successfully!',
                                ticket: data.ticket?.fullName,
                            });
                        } else {
                            setResult({
                                status: 'error',
                                message: data.message || 'Invalid ticket',
                            });
                        }
                    } catch {
                        setResult({
                            status: 'error',
                            message: 'Failed to verify ticket',
                        });
                    }

                    setTimeout(() => {
                        setResult(null);
                        setScanning(true);
                        scanner.resume();
                    }, 3000);
                },
                () => {},
            )
            .catch(() => {
                setResult({
                    status: 'error',
                    message:
                        'Camera access denied. Please allow camera permissions.',
                });
            });

        return () => {
            scanner.stop().catch(() => {});
        };
    }, []);

    return (
        <div className='p-6 md:p-8 max-w-2xl mx-auto'>
            <div className='mb-8'>
                <h1 className='text-2xl font-bold text-white'>Scan Ticket</h1>
                <p className='mt-1 text-sm text-white/60'>
                    Scan QR code to validate tickets
                </p>
            </div>

            <div className='bg-[#121212] rounded-xl border border-white/5 p-6'>
                <div className='flex items-center gap-2 mb-4'>
                    <Camera className='h-5 w-5 text-white/60' />
                    <span className='text-sm font-medium text-white/80'>
                        Point camera at QR code
                    </span>
                </div>

                <div
                    id='reader'
                    className='w-full aspect-square max-w-sm mx-auto overflow-hidden rounded-lg bg-black/50'
                />

                {!scanning && (
                    <div className='mt-4 flex justify-center'>
                        <div className='inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg text-sm border border-blue-600/30'>
                            <AlertCircle className='h-4 w-4 animate-pulse' />
                            Processing...
                        </div>
                    </div>
                )}

                {result && (
                    <div
                        className={`mt-6 p-4 rounded-lg border ${
                            result.status === 'success'
                                ? 'bg-green-600/10 border-green-600/30'
                                : 'bg-red-600/10 border-red-600/30'
                        }`}
                    >
                        <div className='flex items-center gap-3'>
                            {result.status === 'success' ? (
                                <CheckCircle className='h-6 w-6 text-green-400' />
                            ) : (
                                <XCircle className='h-6 w-6 text-red-400' />
                            )}
                            <div>
                                <p
                                    className={`font-medium ${
                                        result.status === 'success'
                                            ? 'text-green-400'
                                            : 'text-red-400'
                                    }`}
                                >
                                    {result.message}
                                </p>
                                {result.ticket && (
                                    <p className='text-sm text-white/60 mt-1'>
                                        Ticket holder:{' '}
                                        <span className='font-medium text-white'>
                                            {result.ticket}
                                        </span>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className='mt-6 flex items-center justify-center gap-2 text-xs text-white/40'>
                    <QrCode className='h-4 w-4' />
                    <span>Scan a valid QR code to verify attendance</span>
                </div>
            </div>
        </div>
    );
}
