<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import type { Writable as tWritable } from 'svelte/store';
    import words from './words';
    import { browser } from '$app/environment';

    const maxWordLength = words.sort((a, b) => b.length - a.length)[0].length;
    let winStreak = 0;
    let score = 0;
    let highscore = 0;

    let options = {
        // Modifications / Cheats (will affect score)
        maxGuesses: 6,
        showLength: false,

        // Preferences (won't affect score)
        allowDuplicates: false,
        allowInvalid: false
    }

    enum GuessState {
        Empty = -1, // Not used
        Wrong = 0,
        Word = 1,
        Place = 2
    }

    interface Guess {
        guess: string;
        state: GuessState[];
    }

    interface GameState {
        word: string;
        guesses: Guess[];
        status: 'playing' | 'won' | 'lost';
    }

    const gameState: tWritable<GameState> = writable({
        word: '',
        guesses: [],
        status: 'playing'
    });

    async function calculateScore(word?: string) {
        if (!word) return score -= Math.floor(score * 0.05); // Lost

        const wordLength = word.length;
        const wordValue = (wordLength / maxWordLength) * 100;
        const winBonus = (winStreak * 5) * (score / 100);
        const guessCount = $gameState.guesses.length;
        const guessLimitPenalty = Math.floor((options.maxGuesses - guessCount) * 0.1) * 100;
        score += Math.floor((wordValue + winBonus) - (guessLimitPenalty * (options.showLength ? 2 : 1)));

        if (score > highscore) {
            highscore = score;
            localStorage.setItem('rickrolldle-highscore', highscore.toString());
        }
    }

    async function processGuess(guess: string) {
        if ($gameState.status != 'playing') return;

        gameState.update((state) => {
            const guesses = state.guesses;
            const word = state.word;

            if (guesses.some((g) => g.guess === guess)) {
                return state;
            }

            const newGuess: Guess = {
                guess,
                state: guess.split('').map((c, i) => {
                    if (word.includes(c)) {
                        return word.split('')[i] === c ? GuessState.Place : GuessState.Word;
                    }

                    return GuessState.Wrong;
                })
            };

            const newGuesses = [...guesses, newGuess];

            for (let i = 0; i < newGuesses.length; i++) {
                const guess = newGuesses[i];

                if (guess.guess === word) {
                    winStreak++;

                    calculateScore(guess.guess);

                    return {
                        ...state,
                        guesses: newGuesses,
                        status: 'won'
                    };
                }
            }

            const newStatus = newGuesses.length >= options.maxGuesses ? 'lost' : 'playing';

            if (newStatus === 'lost') {
                winStreak = 0;
                calculateScore();
            }

            return {
                ...state,
                guesses: newGuesses,
                status: newStatus
            };
        });
    }

    let inputHint = '';

    onMount(async() => {
        const input = document.getElementById('guess-box') as HTMLInputElement;

        input.addEventListener('keydown', async(e) => {
            if (e.key === 'Enter') processInput();
        });

        options = {
            ...options,
            ...JSON.parse(localStorage.getItem('rickrolldle-options') ?? '{}')
        }

        highscore = parseInt(localStorage.getItem('rickrolldle-highscore') ?? '0');

        gameState.update((state) => {
            const word = words[Math.floor(Math.random() * words.length)];

            inputHint = `Enter a word${options.showLength ? ` (${word.length} letters)` : ''}`;

            return {
                ...state,
                word
            };
        });

        console.log('Cheating is for nerds, don\'t do it');
    })

    async function processInput() {
        if (!browser) return;
        const input = document.getElementById('guess-box') as HTMLInputElement;

        function flashHint(text: string) {
            const oldHint = inputHint;

            inputHint = text;
            input.value = ''; // Clear input to reveal hint

            setTimeout(() => {
                inputHint = oldHint;
            }, 5000);
        }

        if (!words.includes(input.value.toLowerCase()) && !options.allowInvalid) return flashHint('Invalid word (Word not in lyrics, no punctuation)');
        if ($gameState.guesses.some((g) => g.guess === input.value.toLowerCase()) && !options.allowDuplicates) return flashHint('You already guessed that word');
        if (options.showLength && input.value.length !== $gameState.word.length) return flashHint('Invalid word (Incorrect length)');

        await processGuess(input.value.toLowerCase());

        inputHint = '';
        input.value = '';
    }
</script>

<svelte:head>
    <title>Rickrolldle</title>
    <meta name="description" content="Wordle but with the lyrics of never gonna give you up">
    <meta name="keywords" content="wordle, rickroll, never gonna give you up">
    <meta name="author" content="Piny">
</svelte:head>

<div class="page">
    <main>
        <h1>Score: {score} | Streak: {winStreak}</h1>
        <div class="play">
            {#each Array(options.maxGuesses) as _, i}
                <div class="guess">
                    {#if $gameState.guesses[i]}
                        {#each Array(maxWordLength) as _, j}
                            {@const state = $gameState.guesses[i].state[j]}
                            <span class:wrong={state === GuessState.Wrong} class:word={state === GuessState.Word} class:place={state === GuessState.Place}>
                                {($gameState.guesses[i].guess.split('')[j] || '.').toUpperCase()}
                            </span>
                        {/each}
                    {/if}
                </div>
            {/each}
        </div>
        <div class="controls" class:nosubmit={$gameState.status !== 'playing'}>
            <input id="guess-box" placeholder="{inputHint}" />
            <button on:click={processInput}>Guess</button>
        </div>
        {#if $gameState.status !== 'playing'}
            <div class="controls" style="box-shadow: 0 -1px 0 #fff;">
                <input disabled value="You {$gameState.status == 'won' ? 'Won!' : `Lost :( (the correct answer was ${$gameState.word})`}" style="margin-top: 0;"/>
                <button on:click={async() => {
                    gameState.update((state) => {
                        const word = words[Math.floor(Math.random() * words.length)];
                        inputHint = `Enter a word${options.showLength ? ` (${word.length} letters)` : ''}`;

                        return {
                            word,
                            guesses: [],
                            status: 'playing'
                        };
                    });
                }} style="margin-top: 0; width: 25em;">Play again?</button>
            </div>
        {/if}
    </main>
    <p>Highscore: {highscore}</p>
    <a class="settings-link" href="Rickrolldle/settings">Settings</a>
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

    .play {
        display: flex;
        flex-direction: column;
        align-items: center;

        width: 100%;
    }

    .controls {
        display: flex;
        flex-direction: row;
        align-items: center;

        width: 100%;
    }

    .controls button {
        height: 4em;
        margin-top: 1em;
        padding: 0.5em;
        border: none;
        border-bottom-right-radius: 0.5em;

        font-size: large;
        font-weight: bold;
        text-align: center;

        background-color: #3f3f3f;

        color: white;

        cursor: pointer;
    }

    .controls.nosubmit * {
        border-bottom-right-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
    }

    .controls input {
        width: 100%;
        height: 3em;

        margin-top: 1em;
        padding: 0.5em;

        border: none;
        border-bottom-left-radius: 0.5em;

        font-size: large;
        font-weight: bold;
        text-align: center;

        background-color: #2f2f2f;

        color: white;
    }

    .guess span {
        display: inline-block;
        width: 1em;
        height: 1em;

        margin: 0.1em;

        text-align: center;

        font-size: 2em;
        font-weight: bold;
        padding: .75em;

        text-shadow: 0 0 0.5em black;
    }

    .guess span.wrong {
        background-color: #ff0000;
    }

    .guess span.word {
        background-color: #ffff00;
    }

    .guess span.place {
        background-color: #00ff00;
    }

    a.settings-link {
        margin-top: 1em;
        color: white;
        text-decoration: none;

        padding: 0.5em;
        border: 1px solid white;
        border-radius: 0.25em;
    }
</style>