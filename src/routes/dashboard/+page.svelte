<script lang="ts">
  import { onMount } from 'svelte';
  import { userId, lists, isAuthenticated } from '$lib/stores';
  import { goto } from '$app/navigation';
  import { fetchLists } from '$lib/stores';
  import ShoppingLists from '$lib/components/ShoppingLists.svelte';
  import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
  
  onMount(() => {
    lists.set([])
    if ($userId != "") {
      fetchLists($userId);
    } else if ($isAuthenticated == false) {
      goto('/', { replaceState: true })
    } else {
      goto('/dashboard', { replaceState: true });
    }
  });

  let new_list_modal: HTMLDialogElement;
  function openModal() {
    new_list_modal.showModal();
  }
  function closeModal() {
    new_list_modal.close();
  }

  function createList() {
    const listNameInput = document.getElementById('list_name') as HTMLInputElement;
    const listName = listNameInput.value;

    if (listName.trim() === '') {
      alert('Please enter a name for the shopping list.');
      return;
    }

    fetch('/api/lists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: listName, userId: $userId })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        fetchLists($userId);
        closeModal();
      } else {
        alert('Failed to create the list.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while creating the list.');
    });
  }
</script>

<dialog bind:this={new_list_modal} id="new_list_modal" class="modal modal-bottom sm:modal-middle">
  <div class="modal-box relative p-6 bg-base-100 rounded-lg shadow-lg">
    <button onclick={closeModal} class="absolute top-2 right-2 text-content hover:text-primary" aria-label="Close modal">
      <i class="fas fa-times"></i>
    </button>
    <h3 class="text-lg font-bold mb-4">Lag Ny Handleliste</h3>
    <form class="space-y-4">
      <div>
        <label for="list_name" class="block text-sm font-medium text-content">Navn på handleliste</label>
        <input type="text" id="list_name" name="list_name" class="mt-1 block w-full border border-base-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2" />
      </div>
    </form>
    <div class="modal-action mt-4 flex justify-end space-x-2">
      <button onclick={closeModal} class="btn bg-base-200 hover:bg-base-300 text-content">Lukk</button>
      <button onclick={createList} class="btn btn-primary bg-primary hover:bg-primary-focus text-white">Lag</button>
    </div>
  </div>
</dialog>

<Breadcrumbs>
  <li>
    <i class="fas fa-list mr-1"></i>
    Handlelister
  </li>
  <li>
    <button onclick={openModal} class="hover:underline">
      <i class="far fa-square-plus mr-1"></i>
      Ny Handlelister
    </button>
  </li>
</Breadcrumbs>

<ShoppingLists>
  <div class="relative w-full h-32 rounded-md overflow-hidden shadow-md group">
    <button onclick={openModal} class="absolute inset-0 flex flex-col items-center justify-center bg-base-300 bg-opacity-75 hover:bg-opacity-100 transition-opacity duration-300">
      <i class="fas fa-plus-circle text-2xl text-content transition-colors duration-300 group-hover:text-primary"></i>
      <span class="mt-2 text-lg text-content transition-colors duration-300 group-hover:text-primary">Lag ny handleliste</span>
    </button>
  </div>
</ShoppingLists>
