<script lang="ts">
    import Item from './Item.svelte';
    import { items, fetchItems, listId, updateList } from '$lib/stores';

    let newItemName = '';
    let advanced = false;

    async function addItem() {
        if ($listId == '' || newItemName == '') { return }
        try {
            await fetch('/api/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ listId: $listId, name: newItemName, quantity: 1, price: 0, weight: 0 })
            });
            await fetchItems($listId);
            await updateList($listId);
        } catch (error) {
            console.error('Error:', error);
        }
        newItemName = '';
    }

    function toggleAdvanced() {
        advanced = !advanced;
    }

    function copyLink() {
        const url = window.location.href.replace('/l/', '/p/');
        navigator.clipboard.writeText(url)
            .then(() => {
            alert('Lenke kopiert til utklippstavlen!');
            })
            .catch(err => {
            console.error('Kunne ikke kopiere: ', err);
            });
    }

    $: totalUniqueItems = $items.length;
    $: totalChecked = $items.filter(item => item.checked).length;
    $: totalQuantity = $items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    $: totalPrice = $items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    $: totalWeight = $items.reduce((sum, item) => sum + (item.weight * item.quantity), 0);
</script>

<div class="container flex justify-between p-4 gap-8">
    <div class="shopping-list w-3/4 p-4 bg-base-200 rounded-lg shadow-lg">
        <input type="text" bind:value={newItemName} placeholder="Add new item" class="input input-bordered w-full mb-4" />
        <div class="flex items-center mb-4">
            <button onclick={addItem} class="btn btn-primary flex-grow mr-2">Legg til</button>
            <button onclick={toggleAdvanced} class="btn w-18" aria-label="Toggle advanced options">
                <i class="fas fa-cogs" class:text-primary={advanced} class:text-content={!advanced}></i>
            </button>
            <button onclick={copyLink} class="btn w-18" aria-label="Copy shareable link">
                <i class="fas fa-share"></i>
            </button>
        </div>
        <div class="max-h-[36rem] overflow-y-auto">
            <ul class="pr-5">
                {#each $items as item}
                    <Item id={item.id} advanced={advanced} name={item.name} checked={item.checked} price={item.price} weight={item.weight} quantity={item.quantity} />
                {/each}
            </ul>
        </div>
    </div>
    <div class="summary w-1/2 p-4 bg-base-200 rounded-lg shadow-lg max-h-46">
        <h2 class="text-xl font-bold mb-4">Oppsummering<br>{totalChecked} / {totalUniqueItems}</h2>
        <p>Totalt unike varer: {totalUniqueItems}</p>
        <p>Totalt antall varer: {totalQuantity}</p>
        {#if advanced }
            <p>Estimert pris: {totalPrice} kr</p>
            <p>Estimert vekt: {totalWeight.toFixed(1)} kg</p>
        {/if}
    </div>
</div>
