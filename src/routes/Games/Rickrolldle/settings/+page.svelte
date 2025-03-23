<script lang="ts">
    import { browser } from "$app/environment";
    import { onMount } from "svelte";
    import Switch from "$lib/uiverse/Switch.svelte";
    import Input from "$lib/shoelace/Input.svelte";
    import '$lib/assets/styles/basic.css';

    let options = {
        maxGuesses: 6,
        showLength: false,
        allowDuplicates: false,
        allowInvalid: false
    }

    onMount(() => {
        const storedOptions = localStorage.getItem("rickrolldle-options");
        if (storedOptions) {
            options = JSON.parse(storedOptions);
        }
    });
</script>

<svelte:head>
    <title>Rickrolldle Settings</title>
    <meta name="description" content="Configure the settings of rickrolldle (doing so may subtract from your score)" />

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/themes/light.css" />
    <script type="module" src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/shoelace-autoloader.js"></script>
</svelte:head>

<div class="page">
    <main>
        <form on:submit|preventDefault={() => {
            if (!browser) return;
            localStorage.setItem("rickrolldle-options", JSON.stringify({
                ...options,
                maxGuesses: parseInt(`${options.maxGuesses}`) || 6
            }));

            window.location.href = './';
        }}>
            <h2>Tweaks</h2>
            <Input bind:value={options.maxGuesses} type="number" label="Max Guesses" placeholder="Default: 6" required />
            
            <h2>Toggles</h2>
            <Switch bind:checked={options.showLength}>Show Length</Switch>
            <Switch bind:checked={options.allowDuplicates}>Allow Duplicates</Switch>
            <Switch bind:checked={options.allowInvalid}>Allow Invalid</Switch>

            <button type="submit">Save</button>
        </form>
    </main>
</div>

<style>
    form {
        display: flex;
        flex-direction: column;
        align-items: center;

        gap: 1em;
    }

    button {
        width: 5em;
        height: 2em;

        margin-top: 1em;

        background-color: #1f1f1f;
        color: white;
        outline: 1px solid white;
        border-radius: .5em;

        cursor: pointer;
        font-size: 2em;
        font-weight: bold;

        transition: background-color .2s;
    }

    button:hover {
        background-color: #3f3f3f;
    }
</style>