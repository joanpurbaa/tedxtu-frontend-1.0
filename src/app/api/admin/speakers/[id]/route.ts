import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
    const { id } = await params;
    const body = await req.json().catch(() => null);

    const existing = await prisma.speaker.findUnique({ where: { id } });
    if (!existing) {
        return NextResponse.json({ error: 'Speaker not found' }, { status: 404 });
    }

    const data: Record<string, unknown> = {};

    if (typeof body?.name === 'string') {
        const name = body.name.trim();
        if (!name) {
            return NextResponse.json(
                { error: 'Speaker name is required' },
                { status: 400 },
            );
        }
        data.name = name;
    }

    if (body && 'title' in body) data.title = body.title?.trim() || null;
    if (body && 'description' in body)
        data.description = body.description?.trim() || null;
    if (body && 'mainPhoto' in body) {
        const mainPhoto = body.mainPhoto?.trim();
        if (!mainPhoto) {
            return NextResponse.json(
                { error: 'Main photo is required' },
                { status: 400 },
            );
        }
        data.mainPhoto = mainPhoto;
    }
    if (body && 'supportingPhoto1' in body)
        data.supportingPhoto1 = body.supportingPhoto1?.trim() || null;
    if (body && 'supportingPhoto2' in body)
        data.supportingPhoto2 = body.supportingPhoto2?.trim() || null;
    if (body && 'supportingPhoto3' in body)
        data.supportingPhoto3 = body.supportingPhoto3?.trim() || null;
    if (typeof body?.isLocked === 'boolean') {
        data.isLocked = body.isLocked;
        if (body.isLocked) {
            data.revealedAt = null;
        } else {
            data.revealedAt = existing.revealedAt ?? new Date();
        }
    }

    const speaker = await prisma.speaker.update({ where: { id }, data });
    return NextResponse.json(speaker);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
    const { id } = await params;
    const existing = await prisma.speaker.findUnique({ where: { id } });
    if (!existing) {
        return NextResponse.json({ error: 'Speaker not found' }, { status: 404 });
    }
    await prisma.speaker.delete({ where: { id } });
    return NextResponse.json({ ok: true });
}
