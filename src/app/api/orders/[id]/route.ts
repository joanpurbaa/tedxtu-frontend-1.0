import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendTicketWhatsapp } from '@/lib/fontee';

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    const { action } = await req.json();

    if (action === 'confirm') {
        const ticket = await prisma.ticket.update({
            where: { id },
            data: { status: 'CONFIRMED' },
        });
        await sendTicketWhatsapp(
            ticket.phone,
            ticket.fullName,
            ticket.orderId,
            ticket.qrToken,
        );
        return NextResponse.json(ticket);
    }

    if (action === 'reject') {
        const ticket = await prisma.ticket.update({
            where: { id },
            data: { status: 'REJECTED' },
        });
        return NextResponse.json(ticket);
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}

export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    await prisma.ticket.delete({ where: { id } });
    return NextResponse.json({ ok: true });
}
