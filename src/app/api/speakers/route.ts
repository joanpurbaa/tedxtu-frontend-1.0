import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    const [speakers, total] = await Promise.all([
        prisma.speaker.findMany({
            where: { isLocked: false, revealedAt: { not: null } },
            orderBy: { revealedAt: 'asc' },
            select: {
                id: true,
                name: true,
                title: true,
                description: true,
                mainPhoto: true,
                supportingPhoto1: true,
                supportingPhoto2: true,
                supportingPhoto3: true,
                isLocked: true,
                revealedAt: true,
            },
        }),
        prisma.speaker.count(),
    ]);

    return NextResponse.json({ total, speakers });
}
