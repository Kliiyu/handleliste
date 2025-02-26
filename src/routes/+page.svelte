<script lang="ts">
  import { isAuthenticated } from '$lib/stores';
</script>

<main class="container mx-auto text-center py-12">
  <h1 class="text-4xl font-bold mb-4">Handleliste</h1>
  <p class="text-lg mb-8">Lag og del flere handlelister</p>

  <div class="buttons space-x-4">
    {#if $isAuthenticated}
      <a href="/dashboard" class="btn btn-info">Dine handlelister</a>
    {:else}
      <a href="/auth/login" class="btn btn-info">Logg inn</a>
      <a href="/auth/signup" class="btn btn-info">Lag bruker</a>
    {/if}
  </div>
</main>
