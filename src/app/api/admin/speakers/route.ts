import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    const speakers = await prisma.speaker.findMany({
        orderBy: { createdAt: 'asc' },
    });
    return NextResponse.json(speakers);
}

export async function POST(req: NextRequest) {
    const body = await req.json().catch(() => null);

    const name = body?.name?.trim();
    if (!name) {
        return NextResponse.json(
            { error: 'Speaker name is required' },
            { status: 400 },
        );
    }

    const mainPhoto = body?.mainPhoto?.trim();
    if (!mainPhoto) {
        return NextResponse.json(
            { error: 'Main photo is required' },
            { status: 400 },
        );
    }

    const speaker = await prisma.speaker.create({
        data: {
            name,
            title: body?.title?.trim() || null,
            description: body?.description?.trim() || null,
            mainPhoto,
            supportingPhoto1: body?.supportingPhoto1?.trim() || null,
            supportingPhoto2: body?.supportingPhoto2?.trim() || null,
            supportingPhoto3: body?.supportingPhoto3?.trim() || null,
        },
    });

    return NextResponse.json(speaker, { status: 201 });
}
