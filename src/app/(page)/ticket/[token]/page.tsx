import { prisma } from '@/lib/prisma';

export default async function TicketPage({
    params,
}: {
    params: Promise<{ token: string }>;
}) {
    const { token } = await params;
    const ticket = await prisma.ticket.findUnique({
        where: { qrToken: token },
    });

    if (!ticket) {
        return (
            <main className='min-h-screen bg-black text-white flex items-center justify-center'>
                Ticket not found
            </main>
        );
    }

    return (
        <main className='min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 gap-4'>
            <h1 className='text-2xl font-bold'>{ticket.fullName}</h1>
            <p className='text-white/70'>Order ID: {ticket.orderId}</p>
            <div className='bg-white p-4 rounded-2xl'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={`/api/qr/${ticket.qrToken}`}
                    alt='QR Ticket'
                    width={300}
                    height={300}
                />
            </div>
            <p className='text-sm text-white/50'>
                {ticket.scanned
                    ? 'Already scanned at venue'
                    : 'Show this QR at the entrance'}
            </p>
        </main>
    );
}
