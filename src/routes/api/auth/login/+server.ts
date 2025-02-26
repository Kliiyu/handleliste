import { json } from '@sveltejs/kit';
import { User } from '$lib/server/models/User';
import { createSession, SESSION_COOKIE_NAME } from '$lib/auth/auth.server';
import bcrypt from "bcrypt";
import { serialize } from 'cookie';

export async function POST({ request }) {
    const { ident, password } = await request.json();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let user;
    if (emailRegex.test(ident)) {
        user = await User.findOne({ where: { email: ident } });
    } else {
        user = await User.findOne({ where: { username: ident } });
    }

    if (!user) return json({ error: 'User not found' }, { status: 404 });

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) return json({ error: 'Invalid password' }, { status: 401 });

    const sessionId = await createSession(user.id.toString());
    const cookie = serialize(SESSION_COOKIE_NAME, sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/'
    });

    return new Response(JSON.stringify({ success: true, userId: user.id, username: user.username }), {
        status: 200,
        headers: {
            'Set-Cookie': cookie,
            'Content-Type': 'application/json'
        }
    });
}
