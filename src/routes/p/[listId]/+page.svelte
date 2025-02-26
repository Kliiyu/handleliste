<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { fetchItems, listId } from '$lib/stores';
    import ItemListPreview from '$lib/components/ItemListPreview.svelte';

    let { data } = $props();
  
    onMount(() => {
      if (data.listId) {
        fetchItems(data.listId);
        listId.set(data.listId);

      } else {
        goto('/dashboard');
      }
    });
</script>

<div class="flex justify-center">
    <div class="max-w-5xl w-full px-4 mt-8">
        <h1 class="text-2xl font-bold text-center mb-4">{data.listName}</h1>
        <ItemListPreview/>
    </div>
</div>