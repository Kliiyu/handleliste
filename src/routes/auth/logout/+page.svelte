<script>
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';
    import { isAuthenticated, userId } from '$lib/stores';

    let errorMessage = '';

    if (browser && $isAuthenticated == false) {
        goto('/auth/login');
    }

    async function logout() {
        errorMessage = '';

        const res = await fetch('/api/auth/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await res.json();

        if (res.ok) {
            isAuthenticated.set(false);
            userId.set('')
            goto('/auth/login');
        } else {
            errorMessage = data.error || 'Logout failed. Please try again.';
        }
    }
</script>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary via-secondary to-accent p-6">
    <div class="bg-base-100 shadow-lg rounded-2xl p-6 flex flex-col md:flex-row max-w-4xl w-full">
        <div class="flex-1 p-6">
            <h1 class="text-3xl font-bold text-content">Goodbye!</h1>
            <p class="text-content mt-2">Are you sure you want to log out? We hope to see you again soon.</p>
        </div>
        <div class="flex-1 p-6 bg-base-200 rounded-xl">
            <h2 class="text-xl font-semibold text-center">Log out of your account.</h2>
            <div class="mt-4">
                <button on:click={logout} class="btn btn-secondary w-full">Log Out</button>
                {#if errorMessage != ''}
                    <p class="text-error mt-2 text-center">{errorMessage}</p>
                {/if}
            </div>
        </div>
    </div>
</div>