<script>
    import Counter from "./Counter.svelte";
    import '$lib/assets/styles/basic.css';
    import { onMount } from "svelte";

    let small = false;

    onMount(() => {
        const mediaQuery = window.matchMedia('(max-width: 600px)');
        small = mediaQuery.matches;

        mediaQuery.addEventListener('change', e => {
            small = e.matches;
        });
    });

    const games = [
        {
            name: "Rickrolldle",
            description: "It's literally just wordle but with the lyrics of never gonna give you up",
            href: "/Games/Rickrolldle"
        }
    ]
</script>

<svelte:head>
    <title>
        Home
    </title>
    <meta name="description" content="A collection of games made by the one and only Piny">
</svelte:head>

<div class="page">
    <main>
        <h1>Games</h1>
        <!-- <ul>
            <a href="/Games/Rickrolldle"><li>
                <h4>Rickrolldle</h4>
                <p>It's literally just wordle but with the lyrics of never gonna give you up</p>
            </li></a>
        </ul> -->
        {#if !small}
            <ul>
                {#each games as game}
                    <a href={game.href}>
                        <li>
                            <h4>{game.name}</h4>
                            <p>{game.description}</p>
                        </li>
                    </a>
                {/each}
            </ul>
        {/if}

        {#if small}
            {#each games as game}
            <a href={game.href}>
                <h2>{game.name}</h2>
            </a>
            {/each}
        {/if}

        <h2>That damn counter everyone abuses</h2>
        <Counter />
    </main>
</div>

<style>
    ul {
        list-style-type: none;

        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(20em, 1fr));
        gap: 1em;
    }

    li {
        padding: 1em;

        border: 1px solid white;
        border-radius: 1em;

        background-color: rgba(255, 255, 255, 0.025);
    }

    a {
        text-decoration: none;
        color: white;
    }

    @media (max-width: 600px) {
        h2 {
            text-align: center;

            font-size: 2em;
        }

        a {
            display: block;

            text-decoration: underline;
            color: teal;
        }
    }
</style>