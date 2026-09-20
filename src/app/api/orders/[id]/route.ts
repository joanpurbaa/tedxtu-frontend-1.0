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
        const ticket = await prisma.ticket.findUnique({ where: { id } });
        if (!ticket) {
            return NextResponse.json(
                { error: 'Ticket not found' },
                { status: 404 },
            );
        }

        // Bundling: admin hanya bisa approve PRIMARY.
        // Approval PRIMARY otomatis mengonfirmasi seluruh anggota grup.
        if (ticket.bundleGroupId) {
            if (ticket.bundleRole !== 'PRIMARY') {
                return NextResponse.json(
                    {
                        error: 'Only the PRIMARY of a bundle group can be approved',
                    },
                    { status: 400 },
                );
            }

            // Idempotency: kalau PRIMARY sudah CONFIRMED, jangan ulangi
            // pengiriman WhatsApp/ticket.
            if (ticket.status !== 'CONFIRMED') {
                await prisma.ticket.update({
                    where: { id },
                    data: { status: 'CONFIRMED' },
                });
                await prisma.ticket.updateMany({
                    where: { bundleGroupId: ticket.bundleGroupId },
                    data: { status: 'CONFIRMED' },
                });

                const group = await prisma.ticket.findMany({
                    where: { bundleGroupId: ticket.bundleGroupId },
                });

                for (const member of group) {
                    await sendTicketWhatsapp(
                        member.phone,
                        member.fullName,
                        member.orderId,
                        member.qrToken,
                        {
                            isBundlingMember:
                                member.bundleRole === 'MEMBER',
                        },
                    );
                }
            }

            return NextResponse.json({ ok: true });
        }

        // Individual (SOLO) — behavior existing tetap sama.
        if (ticket.status !== 'CONFIRMED') {
            const confirmed = await prisma.ticket.update({
                where: { id },
                data: { status: 'CONFIRMED' },
            });
            await sendTicketWhatsapp(
                confirmed.phone,
                confirmed.fullName,
                confirmed.orderId,
                confirmed.qrToken,
            );
        }
        return NextResponse.json({ ok: true });
    }

    if (action === 'reject') {
        const ticket = await prisma.ticket.findUnique({ where: { id } });
        if (!ticket) {
            return NextResponse.json(
                { error: 'Ticket not found' },
                { status: 404 },
            );
        }

        if (ticket.bundleGroupId && ticket.bundleRole === 'PRIMARY') {
            await prisma.ticket.updateMany({
                where: { bundleGroupId: ticket.bundleGroupId },
                data: { status: 'REJECTED' },
            });
            return NextResponse.json({ ok: true });
        }

        const updated = await prisma.ticket.update({
            where: { id },
            data: { status: 'REJECTED' },
        });
        return NextResponse.json(updated);
    }

    if (action === 'reset-join') {
        const ticket = await prisma.ticket.update({
            where: { id },
            data: { joinedGroup: false, joinedAt: null },
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
