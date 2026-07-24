import { NextRequest, NextResponse } from 'next/server';
import {
    ADMIN_SESSION_COOKIE,
    verifyAdminSessionToken,
} from '@/lib/adminSession';

const PUBLIC_PATHS = ['/admin/login', '/api/admin/login', '/api/admin/logout'];

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (PUBLIC_PATHS.includes(pathname)) {
        return NextResponse.next();
    }

    const token = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;

    if (token) {
        try {
            await verifyAdminSessionToken(token);
            return NextResponse.next();
        } catch {
            // fall through to unauthorized handling below
        }
    }

    if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const loginUrl = new URL('/admin/login', req.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
}

export const config = {
    matcher: ['/admin/:path*', '/api/admin/:path*'],
};
