import { json } from '@sveltejs/kit';
import { List } from '$lib/server/models/List';

export async function PUT({ request }) {
    const listId = request.headers.get('listId');
    if (!listId) {
      return json({ success: false, error: 'listId header is required' }, { status: 400 });
    }
  
    const list = await List.findByPk(listId)
    if (!list) {
      return json({ success: false, error: 'List does not exist' }, { status: 404 });
    }
  
    const { favorite } = await request.json();

    list.favorite = favorite;
    list.updatedAt = new Date();
    await list.save();
    return json({ success: true, message: 'List updated successfully' });
}
