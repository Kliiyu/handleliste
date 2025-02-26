import { redirect } from '@sveltejs/kit';
import { validateSession, SESSION_COOKIE_NAME } from '$lib/auth/auth.server';

export async function load({ cookies, url }) {
    const session = cookies.get(SESSION_COOKIE_NAME);

    if (session) {
        const res = await validateSession(session) as [boolean, string, string];
        const isAuthenticated = res[0];
        const userId: string = res[1];
        const username: string = res[2];

        const allowedRoutes = ['/', '/auth/login', '/auth/signup'];

        if (!isAuthenticated && !allowedRoutes.some(route => url.pathname.startsWith(route))) {
            throw redirect(303, '/auth/login');
        }

        return { isAuthenticated: true, userId, username };
    }
    return { isAuthenticated: false, userId: '', username: '' };
}
