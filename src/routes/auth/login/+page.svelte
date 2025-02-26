<script lang="ts">
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';
    import { isAuthenticated, userId, username } from '$lib/stores';
  
    let ident = '', password = '';
    let errorMessage = '';

    if (browser && $isAuthenticated == true) {
      goto('/dashboard')
    }
  
    async function login() {
      errorMessage = '';
  
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ident, password })
      });
  
      const data = await res.json();
  
      if (res.ok) {
        isAuthenticated.set(true)
        userId.set(data.userId.toString())
        username.set(data.username.toString())
        goto('/dashboard');
      } else {
        errorMessage = data.error || 'Login failed. Please try again.';
      }
    }
</script>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary via-secondary to-accent p-6">
  <div class="bg-base-100 shadow-lg rounded-2xl p-6 flex flex-col md:flex-row max-w-4xl w-full">
    <div class="flex-1 p-6">
      <h1 class="text-3xl font-bold text-content">Velkommen tilbake.</h1>
      <p class="text-content mt-2">Logg inn for å få tilgang til kontoen din og fortsette der du slapp.</p>
    </div>
    <div class="flex-1 p-6 bg-base-200 rounded-xl">
      <h2 class="text-xl font-semibold text-center">Logg inn på kontoen din.</h2>
      <p class="text-center text-sm text-content">Har du ikke en konto? <a href="/auth/signup" class="text-secondary">Registrer deg</a></p>
      <div class="mt-4">
        <label class="input input-bordered w-full mb-3 flex items-center gap-2">
            <i class="fas fa-user"></i>
          <input type="text" bind:value={ident} class="grow" placeholder="Brukernavn eller E-postadresse" />
        </label>
        <label class="input input-bordered w-full mb-3 flex items-center gap-2">
          <i class="fas fa-key"></i>
          <input type="password" bind:value={password} class="grow" placeholder="Passord" />
        </label>
        <button on:click={login} class="btn btn-secondary w-full">Logg Inn</button>
        {#if errorMessage != ''}
          <p class="text-error mt-2 text-center">{errorMessage}</p>
        {/if}
      </div>
    </div>
  </div>
</div>
