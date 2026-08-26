import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function tally(list: string[]) {
    const map: Record<string, number> = {};
    for (const item of list) map[item] = (map[item] ?? 0) + 1;
    return Object.entries(map)
        .map(([label, count]) => ({ label, count }))
        .sort((a, b) => b.count - a.count);
}

export async function POST(req: NextRequest) {
    const { token } = await req.json();

    if (!token) {
        return NextResponse.json(
            { status: 'error', message: 'Token is required' },
            { status: 400 },
        );
    }

    const ticket = await prisma.ticket.findUnique({
        where: { qrToken: token },
    });

    if (!ticket) {
        return NextResponse.json({
            status: 'error',
            message: 'Invalid ticket',
        });
    }

    if (ticket.status !== 'CONFIRMED') {
        return NextResponse.json({
            status: 'error',
            message: `Ticket is ${ticket.status.toLowerCase()}`,
        });
    }

    if (ticket.scanned) {
        return NextResponse.json({
            status: 'error',
            message: 'Ticket already scanned',
        });
    }

    await prisma.ticket.update({
        where: { qrToken: token },
        data: { scanned: true, scannedAt: new Date() },
    });

    return NextResponse.json({
        status: 'success',
        ticket: { fullName: ticket.fullName, orderId: ticket.orderId },
    });
}

export async function GET() {
    const [total, confirmed, pending, rejected, scanned, byTier, tickets] =
        await Promise.all([
            prisma.ticket.count(),
            prisma.ticket.count({ where: { status: 'CONFIRMED' } }),
            prisma.ticket.count({ where: { status: 'PENDING' } }),
            prisma.ticket.count({ where: { status: 'REJECTED' } }),
            prisma.ticket.count({ where: { scanned: true } }),
            prisma.ticket.groupBy({ by: ['tier'], _count: { tier: true } }),
            prisma.ticket.findMany({
                select: {
                    participantStatus: true,
                    faculty: true,
                    domisili: true,
                    tedFamiliarity: true,
                    topics: true,
                    eventAspect: true,
                },
            }),
        ]);

    const topics = tally(tickets.flatMap((t) => t.topics));
    const eventAspect = tally(tickets.flatMap((t) => t.eventAspect));
    const participantStatus = tally(
        tickets.map((t) => t.participantStatus).filter(Boolean),
    );
    const faculty = tally(
        tickets.map((t) => t.faculty).filter((v): v is string => !!v),
    );
    const domisili = tally(
        tickets.map((t) => t.domisili).filter(Boolean),
    ).slice(0, 10);
    const tedFamiliarity = tally(
        tickets.map((t) => t.tedFamiliarity).filter(Boolean),
    );

    return NextResponse.json({
        total,
        confirmed,
        pending,
        rejected,
        scanned,
        byTier,
        participantStatus,
        faculty,
        domisili,
        tedFamiliarity,
        topics,
        eventAspect,
    });
}
