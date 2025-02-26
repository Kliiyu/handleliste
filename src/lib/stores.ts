import { writable } from 'svelte/store';
import type { List, Item } from '$lib/types';

export const isAuthenticated = writable(false);
export const userId = writable('');
export const username = writable('');

/// --- ///

export const lists = writable<List[]>([]);
export const favoriteLists = writable<List[]>([]);
export async function fetchLists(userId: string) {
    const res = await fetch('/api/lists', { headers: { userId } });
    const data = await res.json();
    if (data.success) {
        lists.set(data.lists);
        favoriteLists.set(data.lists.filter((l: List) => l.favorite))
    }
}

export async function updateList(listId: string) {
    await fetch('/api/lists', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            listId
        }
    });
}

export async function deleteList(listId: string) {
    await fetch('/api/lists', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            listId
        }
    });
}

export async function favoriteList(listId: string, favorite: boolean) {
    await fetch('/api/lists/favorite', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            listId
        },
        body: JSON.stringify({ favorite })
    });
}

/// --- ///

export const listId = writable('');
export const items = writable<Item[]>([]);

export async function fetchItems(listId: string) {
    const res = await fetch('/api/items', { headers: { listId } });
    const data = await res.json();
    if (data.success) {
        items.set(data.items);
    }
}

export async function addItem(listId: string, name: string) {
    const res = await fetch('/api/items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ listId, name })
    });
    const data = await res.json();
    if (data.success) {
        items.update(i => [...i, data.item]);
    }
}

export async function deleteItem(itemId: string) {
    await fetch('/api/items', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            itemId
        }
    });
}

export async function updateItem(itemId: string, data: {checked: boolean, quantity: number, price: number, weight: number}) {
    await fetch('/api/items', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            itemId
        },
        body: JSON.stringify(data)
    });
}
