import { json } from '@sveltejs/kit';
import { Item } from '$lib/server/models/Item';

export async function POST({ request }) {
  const { listId, name, quantity, price, weight } = await request.json();
  
  const newItem = await Item.create({ listId, name, quantity, price, weight });

  return json({ success: true, item: newItem });
}

export async function GET({ request }) {
  const listId = request.headers.get('listId');
  if (!listId) {
    return json({ success: false, error: 'listId header is required' }, { status: 400 });
  }

  const items = await Item.findAll({
    where: {
      listId
    }
  });

  return json({ success: true, items });
}

export async function PUT({ request }) {
  const itemId = request.headers.get('itemId');
  if (!itemId) {
    return json({ success: false, error: 'itemId header is required' }, { status: 400 });
  }

  const item = await Item.findByPk(itemId)
  if (!item) {
    return json({ success: false, error: 'Item does not exist' }, { status: 404 });
  }

  const { checked, quantity, price, weight } = await request.json();

  item.checked = checked;
  item.quantity = quantity;
  item.price = price;
  item.weight = weight;
  await item.save();
  return json({ success: true, message: 'Item updated successfully' });
}

export async function DELETE({ request }) {
  const itemId = request.headers.get('itemId');
  if (!itemId) {
    return json({ success: false, error: 'itemId header is required' }, { status: 400 });
  }

  const item = await Item.findByPk(itemId)
  if (!item) {
    return json({ success: false, error: 'Item does not exist' }, { status: 404 });
  }
  
  await item.destroy();
  return json({ success: true, message: 'Item deleted successfully' });
}
