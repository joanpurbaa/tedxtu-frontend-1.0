import { SignJWT, jwtVerify } from 'jose';

export const ADMIN_SESSION_COOKIE = 'admin_session';
const SESSION_DURATION = '8h';

function getSecret() {
    const secret = process.env.ADMIN_SESSION_SECRET;
    if (!secret) {
        throw new Error('ADMIN_SESSION_SECRET is not set');
    }
    return new TextEncoder().encode(secret);
}

export async function createAdminSessionToken() {
    return new SignJWT({ role: 'admin' })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(SESSION_DURATION)
        .sign(getSecret());
}

export async function verifyAdminSessionToken(token: string) {
    await jwtVerify(token, getSecret());
}
