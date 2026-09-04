import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const tier = searchParams.get('tier') || '';
    const status = searchParams.get('status') || '';

    const where: any = {};

    if (search) {
        where.OR = [
            { fullName: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
            { orderId: { contains: search, mode: 'insensitive' } },
            { nickname: { contains: search, mode: 'insensitive' } },
            { institution: { contains: search, mode: 'insensitive' } },
        ];
    }

    if (tier) {
        where.tier = tier;
    }

    if (status) {
        where.status = status;
    }

    const tickets = await prisma.ticket.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            orderId: true,
            createdAt: true,
            email: true,
            fullName: true,
            nickname: true,
            phone: true,
            domisili: true,
            participantStatus: true,
            studentId: true,
            faculty: true,
            institution: true,
            major: true,
            instagram: true,
            linkedin: true,
            tedFamiliarity: true,
            topics: true,
            topicsOther: true,
            musicLifestyle: true,
            environmentShapes: true,
            artsExpression: true,
            eventTakeaway: true,
            eventAspect: true,
            eventAspectOther: true,
            tier: true,
            price: true,
            status: true,
            scanned: true,
            scannedAt: true,
        },
    });

    return NextResponse.json(tickets);
}
