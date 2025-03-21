<script>
    import Counter from "./Counter.svelte";
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
        <ul>
            <a href="/Games/Rickrolldle"><li>
                <h4>Rickrolldle</h4>
                <p>It's literally just wordle but with the lyrics of never gonna give you up</p>
            </li></a>
        </ul>

        <h2>That damn counter everyone abuses</h2>
        <Counter />
    </main>
</div>

<style>
    .page {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    main {
        display: flex;
        flex-direction: column;
        align-items: center;

        width: 60em;

        margin-top: 2em;
        padding: 1em;

        border: 1px solid white;
        border-radius: 1em;

        background-color: #1f1f1f;
    }

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
</style>