import { removeSession, SESSION_COOKIE_NAME } from "$lib/auth/auth.server";
import { json } from "@sveltejs/kit";

export async function POST({ cookies }) {
    const sessionCookie: string | undefined = cookies.get(SESSION_COOKIE_NAME);

    if (sessionCookie) {
        await removeSession(sessionCookie)
        cookies.delete(SESSION_COOKIE_NAME, { path: '/' });
        return json({ success: true }); 
    }
    return json({ success: false })
}
