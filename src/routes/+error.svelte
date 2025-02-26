<script>
    import { page } from '$app/state';
    import { goto } from '$app/navigation';

    function goBack() {
        goto('/');
    }
</script>

<div class="flex items-center justify-center min-h-screen bg-cover bg-center" style="background-image: url('https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_2016-02-06_%28Unsplash%29.jpg');">
    <div class="text-center text-error font-sans p-4 w-1/2">
        <div class="text-[16rem] font-bold">{page?.status || 500}</div>
        <div class="divider"></div>
        <div class="text-2xl mt-4">Oops! Noe gikk galt.</div>
        {#if page.error?.message}
            <div class="mt-4 text-lg text-neutral-content">{page.error?.message}</div>
        {/if}
        <button on:click={goBack} class="btn btn-info mt-8">Gå til Hjemmeside</button>
    </div>
</div>
