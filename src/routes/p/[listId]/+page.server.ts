import { getName } from '$lib/server/models/List';
import { Buffer } from 'buffer';

export async function load({ params, cookies }) {
    const id = params.listId;
    const decodedId = Buffer.from(id, 'base64').toString('utf-8');
    const name = await getName(decodedId);
    return { listId: decodedId, listName: name };
}