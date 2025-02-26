import { json } from '@sveltejs/kit';
import { List } from '$lib/server/models/List';

export async function POST({ request }) {
  const { name, userId } = await request.json();
  
  const newList = await List.create({ name, userId });

  return json({ success: true, list: newList });
}

export async function GET({ request }) {
  const userId = request.headers.get('userId');
  if (!userId) {
    return json({ success: false, error: 'userId header is required' }, { status: 400 });
  }

  const lists = await List.findAll({ where: { userId } });
  return json({ success: true, lists });
}

export async function PUT({ request }) {
  const listId = request.headers.get('listId');
  if (!listId) {
    return json({ success: false, error: 'listId header is required' }, { status: 400 });
  }

  const list = await List.findByPk(listId)
  if (!list) {
    return json({ success: false, error: 'List does not exist' }, { status: 404 });
  }

  list.updatedAt = new Date();
  await list.save();
  return json({ success: true, message: 'List updated successfully' });
}

export async function DELETE({ request }) {
  const listId = request.headers.get('listId');
  if (!listId) {
    return json({ success: false, error: 'listId header is required' }, { status: 400 });
  }

  const list = await List.findByPk(listId)
  if (!list) {
    return json({ success: false, error: 'List does not exist' }, { status: 404 });
  }
  
  await list.destroy();
  return json({ success: true, message: 'List deleted successfully' });
}
