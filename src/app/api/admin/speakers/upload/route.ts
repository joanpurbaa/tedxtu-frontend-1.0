import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
    const form = await req.formData();
    const file = form.get('file') as File | null;

    if (!file) {
        return NextResponse.json({ error: 'Missing file' }, { status: 400 });
    }

    const ext = file.name.split('.').pop() || 'jpg';

    let url: string;
    try {
        const blob = await put(`speakers/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`, file, {
            access: 'public',
            addRandomSuffix: false,
        });
        url = blob.url;
    } catch {
        const bytes = Buffer.from(await file.arrayBuffer());
        url = `data:${file.type};base64,${bytes.toString('base64')}`;
    }

    return NextResponse.json({ url });
}
