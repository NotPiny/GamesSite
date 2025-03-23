<script>
    import Header from "./Header.svelte";
</script>

<svelte:head>
    <style>
        body {
            min-height: 100%;
            margin: 0;

            margin-top: 7em;

            overflow-x: hidden;

            font-family: 'Roboto', sans-serif;

            background-color: #1f1d1d;
            color: #d9d9d9;
        }

        @media screen and (max-width: 600px) {
            body {
                margin-top: 0;
            }
        }
    </style>
</svelte:head>

<Header/>
<slot/>