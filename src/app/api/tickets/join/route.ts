import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
    const { token } = await req.json();

    if (!token) {
        return NextResponse.json(
            { error: 'Token required' },
            { status: 400 },
        );
    }

    const ticket = await prisma.ticket.findUnique({
        where: { qrToken: token },
    });

    if (!ticket) {
        return NextResponse.json(
            { error: 'Ticket not found' },
            { status: 404 },
        );
    }

    const updated = await prisma.ticket.update({
        where: { qrToken: token },
        data: { joinedGroup: true, joinedAt: new Date() },
    });

    return NextResponse.json({
        joinedGroup: updated.joinedGroup,
        joinedAt: updated.joinedAt,
    });
}