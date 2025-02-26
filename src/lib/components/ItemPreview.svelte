<script lang="ts">
    export let advanced: boolean = false;
    export let name: string = '';
    export let checked: boolean = false;
    export let price: number = 0;
    export let weight: number = 0;
    export let quantity: number = 1;
</script>

<li class="flex justify-between items-center p-2 border-b border-gray-300 border-opacity-10">
    <div class="flex items-center space-x-2">
        <input type="checkbox" bind:checked={checked} class="checkbox checkbox-primary">
        <span>{name}</span>
    </div>
    <div class="flex items-center space-x-2">
        <span>Stk: {quantity}</span>
        {#if advanced }  
            <span>| {price} kr</span>
            <span>| {weight} kg</span>
        {/if}
    </div>
</li>
