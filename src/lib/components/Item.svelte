<script lang="ts">
    import { deleteItem, fetchItems, listId, updateItem } from "$lib/stores";

    export let id: string;

    export let advanced: boolean = false;
    export let name: string = '';
    export let checked: boolean = false;
    export let price: number = 0;
    export let weight: number = 0;
    export let quantity: number = 1;

    async function del() {
        await deleteItem(id);
        await fetchItems($listId);
    } 

    async function upd() {
        await updateItem(id, {checked, quantity, price, weight});
        await fetchItems($listId);
    }
</script>

<li class="flex justify-between items-center p-2 border-b border-gray-300 border-opacity-10">
    <div class="flex items-center space-x-2">
        <input type="checkbox" bind:checked={checked} on:change={upd} class="checkbox checkbox-primary">
        <span>{name}</span>
    </div>
    <div class="flex items-center space-x-2">
        <span>Stk:</span><input type="number" bind:value={quantity} on:change={upd} class="input input-bordered w-12 text-sm p-1 ml-2" min="1">
        {#if advanced }  
            <input type="number" bind:value={price} on:change={upd} class="input input-bordered w-16 text-sm p-1" step="0.01"><span>kr</span>
            <input type="number" bind:value={weight} on:change={upd} class="input input-bordered w-16 text-sm p-1" step="0.01"><span>kg</span>
        {/if}
        <button on:click={del} class="btn btn-error btn-sm ml-4" aria-label="Delete item">
            <i class="fas fa-trash-alt"></i>
        </button>
    </div>
</li>
