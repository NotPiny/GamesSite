<script lang="ts">
    import { browser } from '$app/environment';
    import GithubIcon from '$lib/assets/icons/github.svg';
    import { onMount } from 'svelte';

    let pageTitle = "Page Title";
    let pageSubtitle = "Page Subtitle";

    onMount(() => {
        pageTitle = document.title ?? "Games";
        const metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
        pageSubtitle = metaDescription?.content ?? 'Some idiot forgot to add a description to this page';
    })

    setInterval(() => {
        if (!browser) return;
        
        pageTitle = document.title ?? "[Failed to get title]";
        const metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
        pageSubtitle = metaDescription?.content ?? 'Some idiot forgot to add a description to this page';
    }, 1000);
</script>

<div class="header">
    <a href="/" class="logo"><img src="https://media.piny.dev/Piny.png" alt="Piny's avatar"></a>
    <div class="page-title">
        <h1>{pageTitle}</h1>
        <p>{pageSubtitle}</p>
    </div>
    <a href="https://github.com/NotPiny/GamesSite" class="github"><img src={GithubIcon} alt="GitHub logo"></a>
</div>

<style>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-width: 99%;
        height: 3em;
        background-color: #1f1f1f;

        position: absolute;
        top: 0;

        padding: 2em .5em;
    }

    .header div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .header div h1 {
        font-size: 2em;

        margin: 0;
    }

    a img {
        height: 5em;
        width: 5em;
    }
</style>