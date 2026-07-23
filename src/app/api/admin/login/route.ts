import { NextRequest, NextResponse } from 'next/server';
import {
    ADMIN_SESSION_COOKIE,
    createAdminSessionToken,
} from '@/lib/adminSession';

function normalize(value: string | undefined | null) {
    return (value ?? '').trim();
}

export async function POST(req: NextRequest) {
    const body = await req.json().catch(() => null);

    if (
        !body ||
        typeof body.username !== 'string' ||
        typeof body.password !== 'string'
    ) {
        return NextResponse.json(
            { error: 'Invalid request body' },
            { status: 400 },
        );
    }

    const username = normalize(body.username);
    const password = normalize(body.password);
    const expectedUser = normalize(process.env.ADMIN_USER);
    const expectedPass = normalize(process.env.ADMIN_PASS);

    if (
        !expectedUser ||
        !expectedPass ||
        username !== expectedUser ||
        password !== expectedPass
    ) {
        return NextResponse.json(
            { error: 'Invalid username or password' },
            { status: 401 },
        );
    }

    const token = await createAdminSessionToken();

    const res = NextResponse.json({ ok: true });
    res.cookies.set(ADMIN_SESSION_COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 8,
    });
    return res;
}
