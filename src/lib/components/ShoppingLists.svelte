<script lang="ts">
    import { goto } from '$app/navigation';
    import { lists, favoriteLists } from '$lib/stores';
    import ShoppingListCard from './ShoppingListCard.svelte';

    function encodeId(objectId: string) {
        return btoa(objectId);
    }

    function openList(listId: string) {
        const encodedId = encodeId(listId);
        goto(`/l/${encodedId}`);
    }
</script>

<div class="flex justify-center">
    <div class="max-w-5xl w-full px-4 mt-8">
        <button class="mb-4 flex items-center gap-2" on:click={() => goto('/')}>
            <i class="fas fa-arrow-left text-content pr-2"></i> Gå tilbake
        </button>
        <!-- Favorite Lists -->
        {#if $favoriteLists.length > 0}
            <h2 class="text-lg font-semibold mb-3 flex items-center gap-2">
                <i class="far fa-star text-content pr-2"></i> Favoritter
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
                {#each $favoriteLists.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()) as list}
                    <button on:click={() => openList(list.id)}>
                        <ShoppingListCard name={list.name} date={list.createdAt} isFavorite={list.favorite} />
                    </button>
                {/each}
            </div>
        {/if}

        <!-- Lists -->
        <h2 class="text-lg font-semibold mb-3">
            <i class="fas fa-list text-content pr-2"></i> Dine handlelister
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <slot></slot>
            {#each $lists.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()) as list}
                <button on:click={() => openList(list.id)}>
                    <ShoppingListCard name={list.name} date={list.createdAt} isFavorite={list.favorite} />
                </button>
            {/each}
        </div>
    </div>
</div>
