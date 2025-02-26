<script lang="ts">
    import { isAuthenticated, userId, username } from '$lib/stores';
</script>

<div class="navbar bg-base-200 p-2">
    <div class="flex-1">
        <a href="/" class="btn btn-ghost text-xl">
            Handleliste
        </a>
    </div>
    <div class="flex-none gap-2">
        {#if $isAuthenticated}
            <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img
                            alt="Avatar"
                            src="https://avatar.iran.liara.run/username?username={$username.slice(0, Math.ceil($username.length / 2)) + '+' + $username.slice(Math.ceil($username.length / 2))}" />
                    </div>
                </div>
                <ul
                    class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li>
                        <!--TODO MAKE USER IDS-->
                        <a href="/u/{$userId}" class="justify-between">
                            Profil
                        </a>
                    </li>
                    <li><a href="/settings">Innstillinger</a></li>
                    <li><a href="/auth/logout">Logg ut</a></li>
                </ul>
            </div>
        {/if}
    </div>
</div>
  