<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { fetchItems, listId, updateList, favoriteList } from '$lib/stores';
    import ItemList from '$lib/components/ItemList.svelte';
    import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
    import BackButton from '$lib/components/BackButton.svelte';

    let { data } = $props();

    onMount(() => {
      if (data.listId) {
        fetchItems(data.listId);
        listId.set(data.listId);
        updateList(data.listId);

      } else {
        goto('/dashboard');
      }
    });

    let favorite: boolean = $state(data.isFavorite ?? false);
    async function makeFavorite() {
      if (data.listId) { 
        favorite = !favorite;
        await favoriteList(data.listId, favorite);
      }
    }
</script>

<Breadcrumbs>
  <li>
    <a href="/dashboard">
      <i class="fas fa-list mr-1"></i>
      Handlelister
    </a>
  </li>
  <li>
    <i class="far fa-pen-to-square mr-1"></i>
    {data.listName}
  </li>
</Breadcrumbs>
  
<div class="flex justify-center">
  <div class="max-w-5xl w-full px-4 mt-8">
    <BackButton/>

    <div class="flex items-center justify-center mb-4">
      <h1 class="text-2xl font-bold">{data.listName}</h1>
      <button class="ml-2 transform transition-transform duration-50 hover:scale-110" onclick={makeFavorite} aria-label="Favorite list">
        {#if favorite}
          <i class="fas fa-star text-warning"></i>
        {:else}
          <i class="far fa-star text-warning"></i>
        {/if}
      </button>
    </div>

    <ItemList/>
  </div>
</div>
