import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE, createAdminSessionToken } from '@/lib/adminSession';

export async function POST(req: NextRequest) {
    const { username, password } = await req.json();

    if (
        typeof username !== 'string' ||
        typeof password !== 'string' ||
        username !== process.env.ADMIN_USER ||
        password !== process.env.ADMIN_PASS
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
