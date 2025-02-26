<script>
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';
    import { isAuthenticated, userId, username as usernameStore } from '$lib/stores';
    let username = '', email = '', password = '';
    let errorMessage = '';
  

    if (browser && $isAuthenticated == true) {
      goto('/dashboard');
    }

    async function signup() {
      errorMessage = '';

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
  
      const data = await res.json();

      if (res.ok) {
        isAuthenticated.set(true)
        userId.set(data.userId.toString())
        usernameStore.set(data.username.toString())
        goto('/dashboard');
      } else {
        errorMessage = data.error || 'Signup failed. Please try again.';
      }
    }
</script>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary via-secondary to-accent p-6">
  <div class="bg-base-100 shadow-lg rounded-2xl p-6 flex flex-col md:flex-row max-w-4xl w-full">
    <div class="flex-1 p-6">
      <h1 class="text-3xl font-bold text-content">Handle Smartere.<br />Planlegg Bedre.</h1>
      <div class="mt-6">
      <h2 class="text-lg font-semibold">Effektiv Handleliste</h2>
      <p class="text-content">Enkelt opprett og administrer handlelistene dine på ett sted med våre avanserte løsninger.</p>
      </div>
      <div class="mt-4">
      <h2 class="text-lg font-semibold">Få Innsikt</h2>
      <p class="text-content">Bruk kraftige analyser for å få handlingsrettede innsikter fra handlelistene dine og forbedre dine innkjøpsvaner.</p>
      </div>
    </div>
    <div class="flex-1 p-6 bg-base-200 shadow-md rounded-xl">
      <h2 class="text-xl font-semibold text-center">Opprett en konto.</h2>
      <p class="text-center text-sm text-content">Har du allerede en konto? <a href="/auth/login" class="text-secondary">Logg inn</a></p>
      <div class="mt-4">
      <label class="input input-bordered w-full mb-3 flex items-center gap-2">
        <i class="fas fa-user"></i>
        <input type="username" bind:value={username} class="grow" placeholder="Brukernavn" />
      </label>
      <label class="input input-bordered w-full mb-3 flex items-center gap-2">
        <i class="fas fa-envelope"></i>
        <input type="email" bind:value={email} class="grow" placeholder="E-postadresse" />
      </label>
      <label class="input input-bordered w-full mb-3 flex items-center gap-2">
        <i class="fas fa-key"></i>
        <input type="password" bind:value={password} class="grow" placeholder="Passord" />
      </label>
      <button onclick={signup} class="btn btn-secondary w-full">Registrer deg</button>
      </div>
    </div>
    <div>
      {#if errorMessage != ''}
        <p class="text-error mt-2 text-center">{errorMessage}</p>
      {/if}
    </div>
  </div>
</div>