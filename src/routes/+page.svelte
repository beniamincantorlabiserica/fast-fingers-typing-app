<script>
	import { onMount } from 'svelte';

	const commonWords = [
		// Most frequent words
		"the", "be", "to", "of", "and", "a", "in", "that", "have", "I", 
		"it", "for", "not", "on", "with", "he", "as", "you", "do", "at", 
		"this", "but", "his", "by", "from", "they", "we", "say", "her", "she", 
		"or", "an", "will", "my", "one", "all", "would", "there", "their", "what", 
		"so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
		"when", "make", "can", "like", "time", "no", "just", "him", "know", "take", 
		"people", "into", "year", "your", "good", "some", "could", "them", "see", "other", 
		"than", "then", "now", "look", "only", "come", "its", "over", "think", "also", 
		"back", "after", "use", "two", "how", "our", "work", "first", "well", "way", 
		"even", "new", "want", "because", "any", "these", "give", "day", "most", "us",
		
		// More common words
		"find", "here", "more", "where", "help", "many", "much", "very", "such", "great",
		"still", "own", "should", "now", "last", "long", "both", "each", "while", "start",
		"three", "state", "never", "become", "between", "high", "really", "something", "most", "another",
		"much", "family", "world", "tell", "against", "let", "again", "house", "show", "school",
		"every", "think", "water", "city", "keep", "try", "kind", "life", "hand", "part",
		"right", "child", "old", "small", "off", "problem", "put", "end", "does", "different",
		"place", "same", "before", "without", "why", "too", "little", "man", "system", "away",
		"next", "must", "big", "change", "need", "around", "home", "case", "call", "few",
		"point", "move", "turn", "ask", "late", "general", "plan", "company", "build", "play",
		"toward", "yet", "hold", "cost", "might", "seem", "young", "under", "open", "ever",

		// Common nouns
		"time", "person", "year", "way", "day", "thing", "man", "woman", "world", "life",
		"hand", "part", "child", "eye", "place", "work", "week", "case", "point", "government",
		"company", "number", "group", "problem", "fact", "money", "water", "month", "lot", "right",
		"study", "book", "job", "word", "business", "issue", "side", "school", "night", "house",
		"family", "home", "power", "room", "mother", "area", "story", "country", "friend", "paper",
		"example", "service", "head", "question", "information", "line", "order", "car", "father", "hour",

		// Common verbs
		"make", "look", "see", "come", "take", "know", "think", "find", "give", "tell",
		"work", "call", "try", "ask", "need", "feel", "become", "leave", "put", "mean",
		"keep", "let", "begin", "seem", "help", "talk", "turn", "start", "show", "hear",
		"run", "move", "live", "believe", "bring", "happen", "write", "sit", "stand", "lose",
		"pay", "meet", "include", "continue", "set", "learn", "change", "lead", "understand", "watch",
		"follow", "stop", "create", "speak", "read", "allow", "add", "spend", "grow", "open",
		"walk", "win", "offer", "remember", "love", "consider", "appear", "buy", "wait", "serve",
		"expect", "pass", "build", "stay", "fall", "cut", "reach", "kill", "remain", "suggest",

		// Common adjectives
		"good", "new", "first", "last", "long", "great", "little", "other", "old", "right",
		"big", "high", "different", "small", "large", "next", "early", "young", "important", "few",
		"public", "bad", "same", "able", "true", "best", "better", "sure", "free", "real",
		"local", "low", "personal", "hard", "late", "major", "better", "economic", "strong", "possible",
		"whole", "clear", "recent", "certain", "black", "white", "red", "blue", "green", "simple",
		"full", "short", "easy", "cold", "political", "social", "human", "national", "final", "poor",
		"happy", "available", "special", "common", "ready", "central", "left", "physical", "entire", "hot",
		"private", "past", "foreign", "difficult", "legal", "close", "open", "dark", "various", "sorry",

		// Common adverbs
		"also", "very", "often", "almost", "however", "too", "usually", "really", "early", "never",
		"always", "sometimes", "together", "likely", "simply", "generally", "instead", "actually", "again", "rather",
		"especially", "ever", "quickly", "probably", "already", "below", "directly", "therefore", "else", "thus",
		"easily", "eventually", "exactly", "certainly", "normally", "currently", "extremely", "finally", "constantly", "properly",
		"soon", "specifically", "ahead", "mostly", "daily", "highly", "immediately", "relatively", "slowly", "definitely",
		"recently", "frequently", "initially", "ultimately", "suddenly", "increasingly", "apparently", "formerly", "primarily", "widely",
		
		// Common prepositions
		"with", "from", "about", "into", "over", "after", "beneath", "under", "above", "through",
		"during", "before", "between", "without", "within", "along", "around", "against", "among", "beyond",
		"despite", "except", "across", "behind", "beside", "onto", "outside", "inside", "toward", "towards",
		"near", "throughout", "like", "unlike", "opposite", "since", "upon", "until", "via", "regarding",
		"per", "plus", "versus", "amid", "besides", "concerning", "considering", "except", "following", "including",
		
		// Tech terms (modern vocabulary)
		"data", "app", "code", "tech", "email", "video", "phone", "screen", "online", "digital",
		"web", "internet", "blog", "site", "cloud", "file", "post", "search", "device", "program",
		"network", "message", "update", "login", "share", "download", "link", "computer", "mobile", "software",
		"password", "database", "user", "system", "content", "access", "account", "media", "image", "security"
	];


	function generateSentence(wordCount = 8) {
		let sentence = "";
		for (let i = 0; i < wordCount; i++) {
			const randomWord = commonWords[Math.floor(Math.random() * commonWords.length)];
			sentence += randomWord;
			if (i < wordCount - 1) sentence += " ";
		}

		return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
	}

	let sentences = Array(10).fill().map(() => generateSentence(Math.floor(Math.random() * 4) + 6));
	
	let currentSentence = '';
	let nextSentence = '';
	let inputValue = '';
	let timer = 60;
	let characterCount = 0;
	let correctChars = 0;
	let totalChars = 0;
	let gameActive = false;
	let intervalId;
	let users = [];
	let currentUser = null;
	let newUsername = '';

	const profileEmojis = ['🚀', '🌟', '🔥', '💻', '⚡', '🎮', '🎯', '🏆', '🦄', '🐱', '🐶', '🦊', '🦁', '🐼', '🐨', '🐯', '🦔'];

	function shuffleArray(array) {
		const newArray = [...array];
		for (let i = newArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
		}
		return newArray;
	}

	function getNextSentence() {
		if (sentences.length === 0) {
			sentences = Array(10).fill().map(() => generateSentence(Math.floor(Math.random() * 4) + 6));
			sentences = shuffleArray(sentences);
		}
		return sentences.pop();
	}

	function addUser() {
		if (newUsername.trim()) {
			const randomEmoji = profileEmojis[Math.floor(Math.random() * profileEmojis.length)];
			const newUser = {
				name: newUsername.trim(),
				emoji: randomEmoji,
				highScore: 0,
				history: []
			};
			users = [...users, newUser];
			newUsername = '';
			currentUser = newUser;

			saveToLocalStorage();
		}
	}

	function selectUser(user) {
		currentUser = user;
	}

	function deleteUser(userToDelete) {
		users = users.filter(user => user !== userToDelete);
		if (currentUser === userToDelete) {
			currentUser = null;
		}

		saveToLocalStorage();
	}

	function startGame() {
		if (!currentUser) return;
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
		const finalWpm = wpm;

		if (currentUser) {
			currentUser.history.unshift({
				date: new Date().toISOString(),
				wpm: finalWpm,
				accuracy: accuracy,
				characters: characterCount
			});
	
			if (currentUser.history.length > 10) {
				currentUser.history = currentUser.history.slice(0, 10);
			}
			if (characterCount > currentUser.highScore) {
				currentUser.highScore = characterCount;
			}

			users = [...users];

			saveToLocalStorage();
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

let darkMode = false;

function toggleDarkMode() {
	darkMode = !darkMode;
	document.documentElement.classList.toggle('dark', darkMode);
	localStorage.setItem('typingGameDarkMode', darkMode);
}

	function saveToLocalStorage() {
		try {
			localStorage.setItem('typingGameUsers', JSON.stringify(users));
		} catch (e) {
			console.error("Failed to save to local storage:", e);
		}
	}

	function loadFromLocalStorage() {
		try {

			const savedUsers = localStorage.getItem('typingGameUsers');
			if (savedUsers) {
				users = JSON.parse(savedUsers);
			}
			

			const savedDarkMode = localStorage.getItem('typingGameDarkMode');
			if (savedDarkMode !== null) {
				darkMode = savedDarkMode === 'true';
				document.documentElement.classList.toggle('dark', darkMode);
			} else {
				// Check system preference
				const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
				darkMode = prefersDark;
				document.documentElement.classList.toggle('dark', darkMode);
			}
		} catch (e) {
			console.error("Failed to load from local storage:", e);
		}
	}

	onMount(() => {
		// Set up keyboard shortcut for dark mode toggle (Alt+D)
		const handleKeydown = (event) => {
			if (event.altKey && event.key === 'd') {
				toggleDarkMode();
			}
		};
		
		window.addEventListener('keydown', handleKeydown);
		loadFromLocalStorage();
		
		return () => {
			if (intervalId) clearInterval(intervalId);
			window.removeEventListener('keydown', handleKeydown);
		};
	});

	$: accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;
	$: wpm = Math.round((characterCount / 5 / ((60 - timer) || 1)) * 60) || 0;
</script>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col">
	<div class="container mx-auto px-4 py-8 max-w-4xl flex-grow">

		<div class="flex justify-center items-center mb-8">
			<h1 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">TypeMaster</h1>
		</div>


		<div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 transition-colors duration-300">
			{#if !gameActive}
				<div class="space-y-6">
					<div class="flex items-center justify-between">
						<h2 class="text-xl font-semibold">Players</h2>
						<div class="text-sm text-gray-500 dark:text-gray-400">Select or create a player to start</div>
					</div>
					
					{#if users.length > 0}
						<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
							{#each users as user}
								<div class="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
									<button
										class="flex-grow flex items-center {currentUser === user ? 'font-bold text-blue-600 dark:text-blue-400' : ''}"
										on:click={() => selectUser(user)}
									>
										<span class="text-2xl mr-2">{user.emoji}</span>
										<div>
											<div>{user.name}</div>
											<div class="text-xs text-gray-500 dark:text-gray-400">High score: {user.highScore} chars</div>
										</div>
									</button>
									<button
										class="p-2 text-red-500 hover:text-red-600 dark:hover:text-red-400 transition"
										on:click={() => deleteUser(user)}
										aria-label="Delete user"
									>
										<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
										</svg>
									</button>
								</div>
							{/each}
						</div>
					{:else}
						<div class="text-center py-8 text-gray-500 dark:text-gray-400">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
							</svg>
							<p>No players yet. Create one to get started!</p>
						</div>
					{/if}

					<div class="flex flex-col sm:flex-row gap-2">
						<input
							type="text"
							bind:value={newUsername}
							placeholder="Enter username"
							class="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
							on:keypress={(e) => e.key === 'Enter' && addUser()}
						/>
						<button 
							class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
							on:click={addUser}
						>
							Add Player
						</button>
					</div>

					{#if currentUser}
						<div class="mt-6 text-center">
							<div class="mb-4">
								<span class="text-2xl">{currentUser.emoji}</span>
								<span class="ml-2 font-semibold text-lg">Playing as {currentUser.name}</span>
							</div>
							<button 
								class="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 text-lg"
								on:click={startGame}
							>
								Start Typing
							</button>
						</div>

						{#if currentUser.history && currentUser.history.length > 0}
							<div class="mt-8">
								<h3 class="text-lg font-semibold mb-3">Recent Games</h3>
								<div class="overflow-x-auto">
									<table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
										<thead>
											<tr>
												<th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
												<th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">WPM</th>
												<th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Accuracy</th>
												<th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Characters</th>
											</tr>
										</thead>
										<tbody class="divide-y divide-gray-200 dark:divide-gray-700">
											{#each currentUser.history as game, i}
												<tr class={i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900/30' : ''}>
													<td class="px-4 py-2 text-sm">{new Date(game.date).toLocaleDateString()}</td>
													<td class="px-4 py-2 text-sm">{game.wpm}</td>
													<td class="px-4 py-2 text-sm">{game.accuracy}%</td>
													<td class="px-4 py-2 text-sm">{game.characters}</td>
												</tr>
											{/each}
										</tbody>
									</table>
								</div>
							</div>
						{/if}
					{/if}
				</div>
			{:else}

				<div class="space-y-6">
					<div class="grid grid-cols-4 gap-4 mb-6">
						<div class="text-center">
							<div class="text-2xl font-bold">{timer}</div>
							<div class="text-xs text-gray-500 dark:text-gray-400">Seconds</div>
						</div>
						<div class="text-center">
							<div class="text-2xl font-bold">{wpm}</div>
							<div class="text-xs text-gray-500 dark:text-gray-400">WPM</div>
						</div>
						<div class="text-center">
							<div class="text-2xl font-bold">{accuracy}%</div>
							<div class="text-xs text-gray-500 dark:text-gray-400">Accuracy</div>
						</div>
						<div class="text-center">
							<div class="text-2xl font-bold">{characterCount}</div>
							<div class="text-xs text-gray-500 dark:text-gray-400">Characters</div>
						</div>
					</div>

			
					<div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 transition-colors duration-300">
						<div class="mb-2 text-sm text-gray-500 dark:text-gray-400">Type this sentence:</div>
						<div class="text-xl leading-relaxed font-mono mb-4 min-h-[6rem] whitespace-pre-wrap">
							{#each currentSentence.split('') as char, i}
								<span class={`
									${i < inputValue.length ? 
										(char === inputValue[i] ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30') : 
										'text-gray-400 dark:text-gray-600'}
								`}>{char}</span>
							{/each}
						</div>
						<div class="text-sm text-gray-500 dark:text-gray-400">Next sentence:</div>
						<div class="text-gray-400 dark:text-gray-600 italic">{nextSentence}</div>
					</div>

		
					<div>
						<input
							type="text"
							bind:value={inputValue}
							on:keyup={handleInput}
							class="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-colors duration-300"
							placeholder="Type here..."
							autocomplete="off"
							autocorrect="off"
							autocapitalize="off"
							spellcheck="false"
						/>
					</div>

				<div class="flex justify-center gap-4">
						<button 
							class="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-300"
							on:click={resetGame}
						>
							Reset
						</button>
					</div>
				</div>
			{/if}
		</div>

		{#if timer <= 0}

			<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
				<div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md w-full m-4 transition-colors duration-300">
					<h2 class="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Game Over!</h2>
					
					<div class="mb-6 grid grid-cols-2 gap-4">
						<div class="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
							<div class="text-3xl font-bold text-blue-600 dark:text-blue-400">{wpm}</div>
							<div class="text-sm text-gray-500 dark:text-gray-400">Words Per Minute</div>
						</div>
						<div class="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
							<div class="text-3xl font-bold text-purple-600 dark:text-purple-400">{accuracy}%</div>
							<div class="text-sm text-gray-500 dark:text-gray-400">Accuracy</div>
						</div>
					</div>
					
					<p class="text-center mb-6">
						You typed <span class="font-bold">{characterCount}</span> characters correctly in 60 seconds
					</p>
					
					<div class="flex flex-col sm:flex-row gap-3 justify-center">
						<button 
							class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
							on:click={startGame}
						>
							Play Again
						</button>
						<button 
							class="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-300"
							on:click={resetGame}
						>
							Change Player
						</button>
					</div>
				</div>
			</div>
		{/if}

		<footer class="py-4 bg-white dark:bg-gray-800 shadow-md mt-auto">
			<div class="container mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
				<p>Improve your typing speed with common English words</p>
				<p class="mt-2">Made with ❤️ by Beniamin Avramita</p>
			</div>
		</footer>
	</div>
</div>

<style>
:global(html) {
  scroll-behavior: smooth;
}

:global(html.dark) {
  color-scheme: dark;
}

:global(body) {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  min-height: 100vh;
}
</style>