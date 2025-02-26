import { connectDB } from '$lib/server/db.js';
import { validateSession, SESSION_COOKIE_NAME } from '$lib/auth/auth.server';
import { redirect } from '@sveltejs/kit';

export const prerender = false;

connectDB();

export async function handle({ event, resolve }) {
    const session = event.cookies.get(SESSION_COOKIE_NAME);

    if (session) {
        const isAuthenticated = await validateSession(session);
        const { pathname } = event.url;

        if (!isAuthenticated && pathname !== '/' && !pathname.startsWith('/auth/')) {
            throw redirect(303, '/auth/login');
        }

        return await resolve(event);
    }

    return await resolve(event);
}