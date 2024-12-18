<svelte:head>
	<title>How to play Rickrolldle</title>
	<meta name="description" content="How to play Rickrolldle" />
</svelte:head>

<div class="text-column">
	<h1>How to play Rickrolldle</h1>

	<p>
		Rickrolldle is a clone of <a href="https://www.nytimes.com/games/wordle/index.html">Wordle</a> but using the lyrics of Rick Astley's "Never Gonna Give You Up".

	<div class="example">
		<span class="close">n</span>
		<span class="missing">e</span>
		<span class="close">v</span>
		<span class="missing">e</span>
		<span class="exact">r</span>
	</div>

	<p>
		The <span class="exact">r</span> is in the right place. <span class="close">n</span> and
		<span class="close">v</span>
		are the right letters, but in the wrong place. The other letters are wrong, and can be discarded.
		Let's make another guess:
	</p>

	<div class="example">
		<span class="exact">d</span>
		<span class="exact">e</span>
		<span class="exact">s</span>
		<span class="exact">e</span>
		<span class="exact">r</span>
		<span class="exact">t</span>
	</div>

	<p>This time we guessed right! You have <strong>six</strong> guesses to get the word.</p>

	<p>
		Based on Sverdle.
		Unlike the original Wordle, Sverdle runs on the server instead of in the browser, making it
		impossible to cheat. It uses <code>&lt;form&gt;</code> and cookies to submit data, meaning you can
		even play with JavaScript disabled!
	</p>
</div>

<style>
	span {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		font-size: 0.8em;
		width: 2.4em;
		height: 2.4em;
		background-color: white;
		box-sizing: border-box;
		border-radius: 2px;
		border-width: 2px;
		color: rgba(0, 0, 0, 0.7);
	}

	.missing {
		background: rgba(255, 255, 255, 0.5);
		color: rgba(0, 0, 0, 0.5);
	}

	.close {
		border-style: solid;
		border-color: var(--color-theme-2);
	}

	.exact {
		background: var(--color-theme-2);
		color: white;
	}

	.example {
		display: flex;
		justify-content: flex-start;
		margin: 1rem 0;
		gap: 0.2rem;
	}

	.example span {
		font-size: 1.4rem;
	}

	p span {
		position: relative;
		border-width: 1px;
		border-radius: 1px;
		font-size: 0.4em;
		transform: scale(2) translate(0, -10%);
		margin: 0 1em;
	}
</style>
