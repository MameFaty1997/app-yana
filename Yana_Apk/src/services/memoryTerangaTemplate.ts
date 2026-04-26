export const MEMORY_TERANGA_HTML_TEMPLATE = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>Memory Teranga</title>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Nunito:wght@400;600;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-color: #1a0e05;
            --orange: #e85d04;
            --gold: #f4a026;
            --cream: #fdf3e3;
            --green: #2d6a4f;
            --red: #9b2226;
            --kente-pattern: repeating-linear-gradient(
                90deg, 
                var(--gold) 0px, var(--gold) 10px, 
                var(--red) 10px, var(--red) 20px, 
                var(--green) 20px, var(--green) 30px, 
                var(--bg-color) 30px, var(--bg-color) 40px
            );
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            -webkit-tap-highlight-color: transparent;
        }

        body {
            background-color: var(--bg-color);
            color: var(--cream);
            font-family: 'Nunito', sans-serif;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            overflow-x: hidden;
            background-image: radial-gradient(circle at center, rgba(232, 93, 4, 0.1) 0%, transparent 70%);
        }

        .kente-bar {
            height: 15px;
            width: 100%;
            background: var(--kente-pattern);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
        }

        header {
            text-align: center;
            padding: 20px;
        }

        h1 {
            font-family: 'Cinzel Decorative', serif;
            color: var(--gold);
            font-size: 2.2rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
            margin-bottom: 5px;
        }

        h2 {
            font-size: 1.1rem;
            font-weight: 400;
            color: var(--orange);
        }

        /* Screens */
        .screen {
            display: none;
            flex: 1;
            flex-direction: column;
            align-items: center;
            padding: 15px;
        }
        
        .screen.active {
            display: flex;
        }

        /* Menu */
        .level-menu {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin-top: 30px;
            width: 100%;
            max-width: 400px;
        }

        .level-btn {
            background: rgba(26, 14, 5, 0.8);
            border: 2px solid var(--gold);
            color: var(--cream);
            padding: 15px;
            font-size: 1.1rem;
            font-family: 'Nunito', sans-serif;
            font-weight: 800;
            border-radius: 8px;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 4px 10px rgba(244, 160, 38, 0.2);
        }

        .level-btn:active {
            background: var(--gold);
            color: var(--bg-color);
            transform: translateY(2px);
        }

        /* Game Header */
        .game-header {
            width: 100%;
            max-width: 900px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: rgba(255, 255, 255, 0.05);
            padding: 10px 15px;
            border-radius: 12px;
            border: 1px solid rgba(244, 160, 38, 0.3);
            margin-bottom: 20px;
        }

        .stat {
            font-size: 1rem;
            font-weight: 600;
        }

        .stat-val {
            color: var(--gold);
            font-size: 1.2rem;
            font-weight: 800;
        }

        /* Timer Bar */
        .timer-container {
            width: 100%;
            height: 10px;
            background: rgba(255,255,255,0.1);
            border-radius: 5px;
            margin-bottom: 15px;
            max-width: 900px;
            overflow: hidden;
        }

        .timer-bar {
            height: 100%;
            width: 100%;
            background: var(--green);
            transition: width 1s linear, background-color 0.5s ease;
        }

        /* Grid */
        .grid {
            display: grid;
            gap: 10px;
            width: 100%;
            max-width: 900px;
            justify-content: center;
            perspective: 1000px;
        }
        
        .grid-3 { grid-template-columns: repeat(3, 1fr); }
        .grid-4 { grid-template-columns: repeat(4, 1fr); }

        @media (min-width: 768px) {
            .grid-5 { grid-template-columns: repeat(5, 1fr); }
            .grid-6 { grid-template-columns: repeat(6, 1fr); }
            .grid-8 { grid-template-columns: repeat(8, 1fr); }
        }

        /* Card */
        .card {
            width: 100%;
            aspect-ratio: 3/4;
            max-width: 100px;
            margin: 0 auto;
            position: relative;
            transform-style: preserve-3d;
            transition: transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1);
            cursor: pointer;
            border-radius: 10px;
        }

        .card.flipped, .card.matched {
            transform: rotateY(180deg);
        }

        .card-face {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            box-shadow: 0 4px 8px rgba(0,0,0,0.5);
            overflow: hidden;
            text-align: center;
            padding: 5px;
        }

        /* Card Back */
        .card-back {
            background: repeating-linear-gradient(45deg, var(--bg-color), var(--bg-color) 10px, #2a1b11 10px, #2a1b11 20px);
            border: 2px solid var(--gold);
        }

        .card-back::after {
            content: "Teranga";
            font-family: 'Cinzel Decorative', serif;
            color: var(--gold);
            font-size: 0.9rem;
            position: absolute;
            background: rgba(26, 14, 5, 0.8);
            padding: 5px 10px;
            border-radius: 20px;
        }

        /* Card Front - Image */
        .card-front-img {
            background: var(--cream);
            transform: rotateY(180deg);
            border: 2px solid var(--orange);
            padding: 0;
        }

        .card-img-container {
            width: 100%;
            height: 100%;
            background: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 8px;
            overflow: hidden;
        }

        .card-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        /* Card Front - Text */
        .card-front-text {
            background: var(--bg-color);
            transform: rotateY(180deg);
            border: 2px solid var(--red);
            background-image: radial-gradient(circle, rgba(155, 34, 38, 0.2) 0%, transparent 80%);
        }

        .card-local-word {
            font-size: 1rem;
            font-weight: 800;
            color: var(--gold);
            margin-bottom: 5px;
            font-family: 'Cinzel Decorative', serif;
            word-wrap: break-word;
        }

        .card-translation {
            font-size: 0.75rem;
            color: var(--cream);
            font-style: italic;
        }

        /* Fact Popup */
        #fact-popup {
            position: fixed;
            bottom: -200px;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            max-width: 500px;
            background: rgba(26, 14, 5, 0.95);
            border: 2px solid var(--gold);
            border-radius: 15px;
            padding: 15px;
            box-shadow: 0 -10px 40px rgba(0,0,0,0.8);
            transition: bottom 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            z-index: 100;
            text-align: center;
        }

        #fact-popup.show {
            bottom: 20px;
        }

        #fact-popup h3 {
            color: var(--orange);
            font-family: 'Cinzel Decorative', serif;
            margin-bottom: 5px;
            font-size: 1rem;
        }
        
        #fact-popup p {
            font-size: 0.85rem;
            margin-bottom: 15px;
        }

        .close-fact-btn {
            background: var(--gold);
            color: var(--bg-color);
            border: none;
            padding: 8px 20px;
            font-weight: bold;
            border-radius: 8px;
            font-size: 0.9rem;
            cursor: pointer;
            font-family: 'Nunito', sans-serif;
            box-shadow: 0 4px 10px rgba(244, 160, 38, 0.4);
        }
        
        .close-fact-btn:active {
            transform: translateY(2px);
        }

        /* End Overlay */
        #end-overlay {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(26, 14, 5, 0.95);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 200;
            padding: 20px;
        }

        .end-modal {
            background: var(--bg-color);
            border: 3px solid var(--gold);
            padding: 30px 20px;
            border-radius: 20px;
            text-align: center;
            width: 100%;
            max-width: 400px;
            box-shadow: 0 0 50px rgba(244, 160, 38, 0.3);
        }

        .end-btn-group {
            display: flex;
            gap: 10px;
            justify-content: center;
            margin-top: 20px;
        }

        .btn-primary {
            background: var(--gold);
            color: var(--bg-color);
            border: none;
            padding: 10px 15px;
            font-weight: bold;
            border-radius: 8px;
            font-size: 0.9rem;
        }
        
        .btn-secondary {
            background: transparent;
            color: var(--gold);
            border: 2px solid var(--gold);
            padding: 10px 15px;
            font-weight: bold;
            border-radius: 8px;
            font-size: 0.9rem;
        }
    </style>
</head>
<body>

    <div class="kente-bar"></div>
    <header>
        <h1>Memory Teranga</h1>
        <h2>La Richesse des Ethnies</h2>
    </header>

    <!-- Écran Accueil -->
    <div id="home-screen" class="screen active">
        <p style="text-align: center; max-width: 600px; margin-bottom: 10px; font-size: 0.95rem; line-height: 1.5;">
            Découvrez la diversité culturelle du Sénégal à travers ce jeu de mémoire.
        </p>
        
        <div class="level-menu" style="gap: 10px;">
            <button class="level-btn" onclick="startGame(1)">
                <span>Niveau 1</span>
                <span style="font-size: 0.8rem; color: var(--orange);">3 Langues</span>
            </button>
            <button class="level-btn" onclick="startGame(2)">
                <span>Niveau 2</span>
                <span style="font-size: 0.8rem; color: var(--orange);">4 Langues</span>
            </button>
            <button class="level-btn" onclick="startGame(3)">
                <span>Niveau 3</span>
                <span style="font-size: 0.8rem; color: var(--orange);">6 Langues</span>
            </button>
            <button class="level-btn" onclick="startGame(4)">
                <span>Niveau 4</span>
                <span style="font-size: 0.8rem; color: var(--orange);">8 Langues</span>
            </button>
            <button class="level-btn" onclick="startGame(5)">
                <span>Niveau 5</span>
                <span style="font-size: 0.8rem; color: var(--orange);">10 Langues</span>
            </button>
            <button class="level-btn" onclick="startGame(6)">
                <span>Niveau 6</span>
                <span style="font-size: 0.8rem; color: var(--orange);">12 Langues</span>
            </button>
        </div>
        <div style="margin-top: 30px;">
            <button class="btn-secondary" onclick="postMessageToApp('QUIT')">Retour à l'App</button>
        </div>
    </div>

    <!-- Écran Jeu -->
    <div id="game-screen" class="screen">
        <div class="timer-container">
            <div id="timer-bar" class="timer-bar"></div>
        </div>

        <div class="game-header">
            <div class="stat">Coups : <span id="tries-count" class="stat-val">0</span></div>
            <div class="stat">Paires : <span id="pairs-count" class="stat-val">0</span>/<span id="total-pairs" class="stat-val">0</span></div>
            <div class="stat"><span id="time-left" class="stat-val">0</span>s</div>
        </div>

        <div id="grid" class="grid grid-4">
            <!-- Les cartes sont générées en JS -->
        </div>
        
        <div style="margin-top: 25px;">
            <button class="btn-secondary" onclick="quitGameToMenu()">Abandonner</button>
        </div>
    </div>

    <!-- Popup Anecdote -->
    <div id="fact-popup">
        <h3 id="fact-title">Le Saviez-vous ?</h3>
        <p id="fact-text">L'anecdote apparaîtra ici.</p>
        <button class="close-fact-btn" onclick="closeFact()">Continuer</button>
    </div>

    <!-- Écran Fin -->
    <div id="end-overlay">
        <div class="end-modal">
            <h1 id="end-title" style="margin-bottom: 10px;">Victoire !</h1>
            <p id="end-desc" style="margin-bottom: 20px; font-size: 1rem;">Bravo, vous avez terminé ce niveau.</p>
            
            <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                <div style="margin-bottom: 5px;">Efficacité : <span id="score-efficiency" style="color: var(--gold); font-weight: bold; font-size: 1.1rem;">100%</span></div>
                <div>Temps Restant : <span id="score-time" style="color: var(--orange); font-weight: bold;">0</span>s</div>
            </div>

            <div class="end-btn-group">
                <button class="btn-secondary" onclick="quitGameToMenu()">Menu</button>
                <button class="btn-primary" onclick="restartLevel()">Rejouer</button>
                <button class="btn-primary" id="btn-next-level" onclick="nextLevel()" style="display: none; background: var(--green);">Niveau Suivant</button>
            </div>
        </div>
    </div>

    <script>
        // Data injected by React Native
        const dbWords = window.__EXT_WORDS__ || [];
        
        function postMessageToApp(type, payload = {}) {
            const msg = JSON.stringify({ type, ...payload });
            if (window.ReactNativeWebView) {
                window.ReactNativeWebView.postMessage(msg);
            } else if (window.parent) {
                window.parent.postMessage({ type, ...payload }, '*');
            }
        }

        let wordList = [];
        let cards = [];
        let flippedCards = [];
        let matchedPairs = 0;
        let tries = 0;
        let totalPairs = 0;
        let gameMode = 'name'; 
        
        let timerMax = 120;
        let timeLeft = 120;
        let timerInterval = null;
        let factTimeout = null;

        function startGame(level) {
            if (dbWords.length === 0) {
                alert("Base de données manquante.");
                return;
            }

            document.getElementById('home-screen').classList.remove('active');
            document.getElementById('game-screen').classList.add('active');
            
            let pairsNeeded = 3;
            timerMax = 120;
            switch(level) {
                case 1: pairsNeeded = 3; timerMax = 60; break;
                case 2: pairsNeeded = 4; timerMax = 80; break;
                case 3: pairsNeeded = 6; timerMax = 120; break;
                case 4: pairsNeeded = 8; timerMax = 160; break;
                case 5: pairsNeeded = 10; timerMax = 200; break;
                case 6: pairsNeeded = 12; timerMax = 240; break;
            }

            // Générer la liste
            wordList = [];
            let pool = [...dbWords].sort(() => 0.5 - Math.random());
            
            for(let i = 0; i < pairsNeeded; i++) {
                const data = pool[i % pool.length];
                wordList.push({ ...data, _pairId: i });
            }

            resetStats(pairsNeeded);
            generateGrid();
            startTimer();
        }

        function resetStats(pairsNeeded) {
            matchedPairs = 0;
            tries = 0;
            totalPairs = pairsNeeded;
            timeLeft = timerMax;
            flippedCards = [];

            document.getElementById('tries-count').innerText = tries;
            document.getElementById('pairs-count').innerText = matchedPairs;
            document.getElementById('total-pairs').innerText = totalPairs;
            document.getElementById('time-left').innerText = timeLeft;
            
            const timerBar = document.getElementById('timer-bar');
            timerBar.style.width = '100%';
            timerBar.style.backgroundColor = 'var(--green)';
        }

        function generateGrid() {
            const gridEl = document.getElementById('grid');
            gridEl.className = 'grid';
            
            const totalCards = totalPairs * 2;
            if (totalCards <= 6) gridEl.classList.add('grid-3');
            else if (totalCards <= 16) gridEl.classList.add('grid-4');
            else if (totalCards === 20) { gridEl.classList.add('grid-4'); gridEl.classList.add('grid-5'); }
            else { gridEl.classList.add('grid-4'); gridEl.classList.add('grid-6'); }

            gridEl.innerHTML = '';
            cards = [];

            wordList.forEach((item) => {
                const cardContent = \`<div class="card-img-container" style="position: relative;">
                                <img src="\${item.img}" class="card-img" style="position: absolute; top:0; left:0; width: 100%; height: 100%; object-fit: cover; z-index: 2;" onerror="console.error('Image failed to load: ', this.src);" />
                              </div>\`;

                // Add TWO identical Image Cards for proper identical pairing
                cards.push({
                    type: 'img',
                    content: cardContent,
                    id: item._pairId,
                    data: item
                });

                cards.push({
                    type: 'img',
                    content: cardContent,
                    id: item._pairId,
                    data: item
                });
            });

            // Shuffle
            cards.sort(() => 0.5 - Math.random());

            // Render
            cards.forEach((card, index) => {
                const cardEl = document.createElement('div');
                cardEl.className = 'card';
                cardEl.dataset.index = index;
                // Add click listener dynamically to avoid JS scope issues
                cardEl.addEventListener('click', () => flipCard(cardEl, card));

                const frontClass = card.type === 'img' ? 'card-front-img' : 'card-front-text';

                cardEl.innerHTML = \`
                    <div class="card-face card-back"></div>
                    <div class="card-face \${frontClass}">
                        \${card.content}
                    </div>
                \`;
                gridEl.appendChild(cardEl);
            });
        }

        function flipCard(cardEl, cardObj) {
            if (cardEl.classList.contains('flipped') || cardEl.classList.contains('matched') || flippedCards.length >= 2) return;

            cardEl.classList.add('flipped');
            flippedCards.push({ el: cardEl, obj: cardObj });

            if (flippedCards.length === 2) {
                tries++;
                document.getElementById('tries-count').innerText = tries;
                checkMatch();
            }
        }

        function checkMatch() {
            const [card1, card2] = flippedCards;

            if (card1.obj.id === card2.obj.id) {
                // Match !
                card1.el.classList.add('matched');
                card2.el.classList.add('matched');
                matchedPairs++;
                document.getElementById('pairs-count').innerText = matchedPairs;
                
                showFact(card1.obj.data);

                flippedCards = [];

                if (matchedPairs === totalPairs) {
                    // endGame will be called by closeFact() after the user finishes reading
                }
            } else {
                // No Match
                setTimeout(() => {
                    card1.el.classList.remove('flipped');
                    card2.el.classList.remove('flipped');
                    flippedCards = [];
                }, 1000);
            }
        }

        function showFact(data) {
            const popup = document.getElementById('fact-popup');
            document.getElementById('fact-title').innerText = data.name + " · " + data.word;
            document.getElementById('fact-text').innerText = data.fact;
            
            popup.classList.add('show');
            // We removed the auto-timeout so users can read it at their own pace
        }

        function closeFact() {
            const popup = document.getElementById('fact-popup');
            popup.classList.remove('show');
            
            // Check if game is over only after they close the fact for the last pair
            if (matchedPairs === totalPairs) {
                setTimeout(endGame, 500, true);
            }
        }

        function startTimer() {
            if (timerInterval) clearInterval(timerInterval);
            
            timerInterval = setInterval(() => {
                timeLeft--;
                document.getElementById('time-left').innerText = timeLeft;
                
                const percent = (timeLeft / timerMax) * 100;
                const bar = document.getElementById('timer-bar');
                bar.style.width = percent + '%';

                if (percent < 30) bar.style.backgroundColor = 'var(--red)';
                else if (percent < 60) bar.style.backgroundColor = 'var(--orange)';

                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    endGame(false);
                }
            }, 1000);
        }

        function endGame(win) {
            clearInterval(timerInterval);
            document.getElementById('end-overlay').style.display = 'flex';
            
            let currentLevel = getCurrentLevel();
            const btnNext = document.getElementById('btn-next-level');
            
            let efficiency = 0;
            if (win) {
                efficiency = Math.round((totalPairs / tries) * 100);
                document.getElementById('end-title').innerText = "Victoire !";
                document.getElementById('end-title').style.color = 'var(--gold)';
                document.getElementById('end-desc').innerText = "Vous protégez la mémoire des peuples.";
                document.getElementById('score-efficiency').innerText = efficiency + "%";
                document.getElementById('score-time').innerText = timeLeft;
                
                // Show Next Level button if not at max level (6)
                if (currentLevel < 6) {
                    btnNext.style.display = 'block';
                } else {
                    btnNext.style.display = 'none';
                }
            } else {
                document.getElementById('end-title').innerText = "Temps Écoulé";
                document.getElementById('end-title').style.color = 'var(--red)';
                document.getElementById('end-desc').innerText = "La sagesse demande du temps. Essayez encore !";
                document.getElementById('score-efficiency').innerText = "0%";
                document.getElementById('score-time').innerText = "0";
                btnNext.style.display = 'none';
            }
            
            // Send stat to the app
            postMessageToApp('GAME_OVER', { win, tries, timeLeft, efficiency });
        }

        function getCurrentLevel() {
            if (totalPairs === 3) return 1;
            if (totalPairs === 4) return 2;
            if (totalPairs === 6) return 3;
            if (totalPairs === 8) return 4;
            if (totalPairs === 10) return 5;
            if (totalPairs === 12) return 6;
            return 1;
        }

        function restartLevel() {
            document.getElementById('end-overlay').style.display = 'none';
            startGame(getCurrentLevel());
        }

        function nextLevel() {
            document.getElementById('end-overlay').style.display = 'none';
            let nextLVL = getCurrentLevel() + 1;
            if (nextLVL > 6) nextLVL = 6;
            startGame(nextLVL);
        }

        function quitGameToMenu() {
            clearInterval(timerInterval);
            document.getElementById('end-overlay').style.display = 'none';
            document.getElementById('game-screen').classList.remove('active');
            document.getElementById('home-screen').classList.add('active');
        }
    </script>
</body>
</html>`;
