<svelte:head>
    <meta http-equiv="refresh" content="5;url=/">
    <link rel="canonical" href="/">
    <title>An error occured</title>
    <meta name="description" content="Something went wrong during page rendering">
</svelte:head>

<div class="page">
    <main>
        <h1>Something broke :(</h1>
        <p>You will redirected shortly...</p>
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
</style>