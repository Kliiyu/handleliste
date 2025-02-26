<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import { page } from '$app/state';
	import { isAuthenticated, userId, username } from '$lib/stores';

	let { children, data } = $props();

	let isAuth = $derived(page.url.pathname.includes("auth"));
	let isErrorPage = $derived(page.status >= 400);

	$effect(() => {
		isAuthenticated.set(data.isAuthenticated);
		userId.set(data.userId);
		username.set(data.username);
	});
</script>

{#if !isAuth && !isErrorPage}
	<Navbar />
{/if}
{@render children()}