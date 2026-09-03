import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    const speakers = await prisma.speaker.findMany({
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
        },
    });

    return NextResponse.json(speakers);
}
