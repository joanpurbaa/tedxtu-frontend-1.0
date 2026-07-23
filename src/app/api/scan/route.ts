import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function tally(list: string[]) {
    const map: Record<string, number> = {};
    for (const item of list) map[item] = (map[item] ?? 0) + 1;
    return Object.entries(map)
        .map(([label, count]) => ({ label, count }))
        .sort((a, b) => b.count - a.count);
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
                    musicLifestyle: true,
                    environmentShapes: true,
                    artsExpression: true,
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

    const yesNo = (
        key: 'musicLifestyle' | 'environmentShapes' | 'artsExpression',
    ) => ({
        yes: tickets.filter((t) => t[key]).length,
        no: tickets.filter((t) => !t[key]).length,
    });

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
        musicLifestyle: yesNo('musicLifestyle'),
        environmentShapes: yesNo('environmentShapes'),
        artsExpression: yesNo('artsExpression'),
    });
}
