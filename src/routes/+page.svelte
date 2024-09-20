// src/routes/+page.svelte
<script>
	import { onMount } from 'svelte';

	let sentences = [
		"The quick brown fox jumps over the lazy dog.",
		"A journey of a thousand miles begins with a single step.",
		"To be or not to be, that is the question.",
		"All that glitters is not gold.",
		"Where there's a will, there's a way.",
		"Actions speak louder than words.",
		"A picture is worth a thousand words.",
		"When in Rome, do as the Romans do.",
		"The early bird catches the worm.",
		"Practice makes perfect."
	];

	let currentSentence = '';
	let nextSentence = '';
	let inputValue = '';
	let timer = 60;
	let characterCount = 0;
	let correctChars = 0;
	let totalChars = 0;
	let gameActive = false;
	let intervalId;
	let highScore = 0;

	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	}

	function getNextSentence() {
		if (sentences.length === 0) {
			sentences = [
				"The quick brown fox jumps over the lazy dog.",
				"A journey of a thousand miles begins with a single step.",
				"To be or not to be, that is the question.",
				"All that glitters is not gold.",
				"Where there's a will, there's a way.",
				"Actions speak louder than words.",
				"A picture is worth a thousand words.",
				"When in Rome, do as the Romans do.",
				"The early bird catches the worm.",
				"Practice makes perfect."
			];
			shuffleArray(sentences);
		}
		return sentences.pop();
	}

	function startGame() {
		gameActive = true;
		characterCount = 0;
		correctChars = 0;
		totalChars = 0;
		timer = 60;
		inputValue = '';
		currentSentence = getNextSentence();
		nextSentence = getNextSentence();
		intervalId = setInterval(() => {
			timer--;
			if (timer <= 0) {
				endGame();
			}
		}, 1000);
	}

	function endGame() {
		clearInterval(intervalId);
		gameActive = false;
		if (characterCount > highScore) {
			highScore = characterCount;
		}
	}

	function resetGame() {
		if (intervalId) clearInterval(intervalId);
		gameActive = false;
		characterCount = 0;
		correctChars = 0;
		totalChars = 0;
		timer = 60;
		inputValue = '';
		currentSentence = '';
		nextSentence = '';
	}

	function handleInput(event) {
		if (event.key === 'Enter' && gameActive) {
			moveToNextSentence();
			return;
		}

		totalChars = inputValue.length;
		correctChars = 0;
		for (let i = 0; i < inputValue.length; i++) {
			if (inputValue[i] === currentSentence[i]) {
				correctChars++;
			}
		}

		if (inputValue === currentSentence) {
			moveToNextSentence();
		}
	}

	function moveToNextSentence() {
		characterCount += correctChars;
		currentSentence = nextSentence;
		nextSentence = getNextSentence();
		inputValue = '';
	}

	onMount(() => {
		return () => {
			if (intervalId) clearInterval(intervalId);
		};
	});

	$: accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;
	$: wpm = Math.round((characterCount / 5 / (60 - timer)) * 60) || 0;
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-3xl w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
		<h1 class="text-4xl font-bold mb-6 text-center text-primary">Speed Typing Game</h1>

		{#if !gameActive}
			<div class="text-center space-y-4">
				<button class="btn btn-primary btn-lg" on:click={startGame}>Start Game</button>
				{#if highScore > 0}
					<p class="text-xl">High Score: {highScore} characters</p>
				{/if}
			</div>
		{:else}
			<div class="mb-6 bg-base-200 p-6 rounded-lg shadow-md">
				<p class="text-xl mb-3">Type this sentence (or press Enter to skip):</p>
				<div class="bg-base-100 p-4 rounded-lg text-xl mb-4 min-h-[100px] flex items-center flex-wrap">
					{#each currentSentence.split('') as char, i}
            <span class={`${i < inputValue.length ?
              (char === inputValue[i] ? 'text-green-600' : 'text-red-600') :
              'text-gray-400'} ${char === ' ' ? 'mr-1' : ''}`}>{char}</span>
					{/each}
				</div>
				<p class="text-lg mb-2">Next sentence:</p>
				<p class="text-gray-600 italic">{nextSentence}</p>
			</div>

			<div class="grid grid-cols-2 gap-4 mb-4">
				<div class="bg-base-200 p-4 rounded-lg text-center">
					<p class="text-2xl font-bold text-primary">{timer}</p>
					<p class="text-sm">Seconds Left</p>
				</div>
				<div class="bg-base-200 p-4 rounded-lg text-center">
					<p class="text-2xl font-bold text-primary">{characterCount}</p>
					<p class="text-sm">Characters Typed Correctly</p>
				</div>
				<div class="bg-base-200 p-4 rounded-lg text-center">
					<p class="text-2xl font-bold text-primary">{wpm}</p>
					<p class="text-sm">WPM</p>
				</div>
				<div class="bg-base-200 p-4 rounded-lg text-center">
					<p class="text-2xl font-bold text-primary">{accuracy}%</p>
					<p class="text-sm">Accuracy</p>
				</div>
			</div>

			<input
				type="text"
				bind:value={inputValue}
				on:keydown={handleInput}
				class="input input-bordered w-full text-lg mb-4"
				placeholder="Type here..."
				autocomplete="off"
				autocorrect="off"
				autocapitalize="off"
				spellcheck="false"
			/>

			<div class="text-center">
				<button class="btn btn-secondary" on:click={resetGame}>Reset</button>
			</div>
		{/if}

		{#if timer <= 0}
			<div class="mt-6 bg-base-200 p-6 rounded-lg shadow-md text-center">
				<h2 class="text-3xl font-bold mb-4 text-primary">Game Over!</h2>
				<p class="text-xl mb-2">Your score: {characterCount} characters typed correctly in 60 seconds</p>
				<p class="text-xl mb-2">WPM: {wpm}</p>
				<p class="text-xl mb-4">Overall Accuracy: {accuracy}%</p>
				<button class="btn btn-primary btn-lg mr-2" on:click={startGame}>Play Again</button>
				<button class="btn btn-secondary btn-lg" on:click={resetGame}>Reset</button>
			</div>
		{/if}
	</div>
</div>