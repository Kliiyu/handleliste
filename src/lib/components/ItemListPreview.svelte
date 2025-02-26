<script lang="ts">
    import ItemPreview from './ItemPreview.svelte';
    import { items } from '$lib/stores';

    let advanced = false;

    function toggleAdvanced() {
        advanced = !advanced;
    }

    $: totalUniqueItems = $items.length;
    $: totalChecked = $items.filter(item => item.checked).length;
    $: totalQuantity = $items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    $: totalPrice = $items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    $: totalWeight = $items.reduce((sum, item) => sum + (item.weight * item.quantity), 0);
</script>

<div class="container flex justify-between p-4 gap-8">
    <div class="shopping-list w-3/4 p-4 bg-base-200 rounded-lg shadow-lg">
        <div class="flex items-center mb-4">
            <button onclick={toggleAdvanced} class="btn w-18 mr-4" aria-label="Toggle advanced options">
                <span>Vis mer informasjon</span>
                <i class="fas fa-cogs" class:text-primary={advanced} class:text-content={!advanced}></i>
            </button>
        </div>
        <div class="max-h-[36rem] overflow-y-auto">
            <ul class="pr-5">
                {#each $items.filter(item => !item.checked).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) as item}
                    <ItemPreview advanced={advanced} name={item.name} checked={item.checked} price={item.price} weight={item.weight} quantity={item.quantity} />
                {/each}
                {#each $items.filter(item => item.checked).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) as item}
                    <ItemPreview advanced={advanced} name={item.name} checked={item.checked} price={item.price} weight={item.weight} quantity={item.quantity} />
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
