<script lang="ts">
    import { browser } from "$app/environment";
    import { onMount } from "svelte";
    import { writable } from "svelte/store"

    let count = writable(0);
    let countRestored = false;

    count.subscribe(value => {
        if (!browser || !countRestored) return;
        localStorage.setItem('comp_counter_count', value as unknown as string);
    });

    onMount(() => {
        count.set(Number(localStorage.getItem('comp_counter_count')) || 0);
        countRestored = true;
    });
</script>

<div class="counter">
    <button on:click={() => count.update(value => value - 1)}>-</button>
    <h1>{ $count }</h1>
    <button on:click={() => count.update(value => value + 1)}>+</button>
</div>

<style>
    .counter {
        display: flex;
        justify-content: space-between;
        align-items: center;

        width: 20em;

        gap: 1em;

        border: 1px solid white;
        border-radius: 1em;

        background-color: rgba(255, 255, 255, 0.025);
    }

    button {
        height: 1em;
        width: 1em;

        background: transparent;
        border: none;

        color: #826ae3;
        font-size: 5em;
        font-weight: bold;

        display: flex;
        justify-content: center;
        align-items: center;

        cursor: pointer;
    }

    button:nth-child(1) {
        border-top-left-radius: 1em;
        border-bottom-left-radius: 1em;

        /* Slightly elevate the dash */
        margin-top: -.15em;
    }

    button:nth-child(3) {
        border-top-right-radius: 1em;
        border-bottom-right-radius: 1em;
    }

    h1 {
        font-size: 2em;
    }
</style>