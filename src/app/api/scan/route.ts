import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
    const { token } = await req.json();

    const ticket = await prisma.ticket.findUnique({
        where: { qrToken: token },
    });

    if (!ticket) {
        return NextResponse.json(
            { status: 'invalid', message: 'Ticket not found' },
            { status: 404 },
        );
    }
    if (ticket.status !== 'CONFIRMED') {
        return NextResponse.json({
            status: 'not_confirmed',
            message: 'Payment not confirmed yet',
            ticket,
        });
    }
    if (ticket.scanned) {
        return NextResponse.json({
            status: 'already_scanned',
            message: 'Ticket already scanned',
            ticket,
        });
    }

    const updated = await prisma.ticket.update({
        where: { qrToken: token },
        data: { scanned: true, scannedAt: new Date() },
    });

    return NextResponse.json({
        status: 'success',
        message: 'Ticket verified successfully!',
        ticket: updated,
    });
}
