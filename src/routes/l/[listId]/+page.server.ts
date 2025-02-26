import { getName, getIsFavorite, getOwner } from '$lib/server/models/List';
import { Buffer } from 'buffer';
import { validateSession, SESSION_COOKIE_NAME } from '$lib/auth/auth.server';

export async function load({ params, cookies }) {
	const id = params.listId;
	const decodedId = Buffer.from(id, 'base64').toString('utf-8');

	const name = await getName(decodedId);
	const isFavorite = await getIsFavorite(decodedId);

	const session = cookies.get(SESSION_COOKIE_NAME);

	if (session) {
		const res = (await validateSession(session)) as [boolean, string];
		const userId: string = res[1];
		const owner = await getOwner(decodedId);

		if (userId == '' || userId == null || owner == '' || userId != owner) {
			return {
				status: 401,
				redirect: '/dashboard'
			};
		}

		return { listId: decodedId, listName: name, isFavorite };
	}
	return {
		status: 401,
		redirect: '/'
	};
}
