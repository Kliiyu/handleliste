<script lang="ts">
    export let name = '';
    export let date;
    export let background_image = 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    export let isFavorite = false;

    function toggleStar() {
        isFavorite = !isFavorite;
    }
</script>

<div class="relative w-full h-32 rounded-md overflow-hidden shadow-md group">
    <!-- Background Image -->
    <div class="absolute inset-0 bg-cover bg-center transition-all duration-300" style="background-image: url('{background_image}');"></div>
    
    <!-- Dark Overlay -->
    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-25 transition-opacity duration-300"></div>

    <!-- Name -->
    <div class="absolute top-2 left-4 text-white text-lg font-bold bg-black bg-opacity-50 px-2 rounded">
        <p>{name}</p>
        <p class="text-sm">{new Date(date).toLocaleDateString()}</p>
    </div>

    <!-- Star Icon -->
    <!-- TODO: fix favorating -->
    <button 
        class="absolute bottom-2 right-[-2rem] transform transition-all duration-300 group-hover:right-2 z-50"
        on:click={toggleStar}
        aria-label={isFavorite ? 'Unstar this item' : 'Star this item'}
    >
        <i class="{isFavorite ? 'fas' : 'far'} fa-star text-yellow-400 text-xl"></i>
    </button>
</div>
