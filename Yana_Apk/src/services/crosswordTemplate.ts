export const CROSSWORD_HTML_TEMPLATE = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Yana - Mots Croisés Afrofuturistes</title>
    <style>
        :root {
            --bg-color: #1a0e05;
            --gold: #f4a026;
            --purple: #8b2fc9;
            --emerald: #2d6a4f;
            --earth: #e85d04;
            --cell-bg: #241508;
            --cell-border: rgba(244, 160, 38, 0.3);
            --text-color: #fdf3e3;
            --kente: repeating-linear-gradient(90deg, #e85d04 0, #e85d04 10px, #2d6a4f 10px, #2d6a4f 20px, #f4a026 20px, #f4a026 30px, #1a0e05 30px, #1a0e05 40px);
        }

        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Nunito:wght@400;600;700&family=Rajdhani:wght@500;600;700&display=swap');

        * {
            box-sizing: border-box;
            -webkit-tap-highlight-color: transparent;
        }

        body {
            background-color: var(--bg-color);
            color: var(--text-color);
            font-family: 'Nunito', sans-serif;
            margin: 0;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
            overflow-x: hidden;
            position: relative;
        }

        body::before {
            content: '';
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background-image: 
                linear-gradient(45deg, rgba(244, 160, 38, 0.03) 25%, transparent 25%),
                linear-gradient(-45deg, rgba(244, 160, 38, 0.03) 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, rgba(244, 160, 38, 0.03) 75%),
                linear-gradient(-45deg, transparent 75%, rgba(244, 160, 38, 0.03) 75%);
            background-size: 40px 40px;
            z-index: -1;
        }

        .kente-bar {
            height: 8px;
            width: 100%;
            background: var(--kente);
            position: fixed;
            top: 0;
            z-index: 1000;
        }

        h1 {
            font-family: 'Cinzel Decorative', serif;
            margin: 0;
            background: linear-gradient(to right, var(--earth), var(--gold), var(--earth));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-size: 1.8rem;
            text-align: center;
        }

        .title-container {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
            margin-top: 15px;
            margin-bottom: 20px;
        }
        
        .diamond { color: var(--gold); font-size: 1rem; }

        .game-container {
            width: 100%;
            max-width: 600px;
            display: flex;
            flex-direction: column;
            gap: 20px;
            position: relative;
            padding: 10px;
            border: 2px solid var(--gold);
            border-radius: 10px;
            background: radial-gradient(circle at center, #1a1a2e 0%, #0a0a0f 100%);
        }

        #crossword-container {
            display: grid;
            gap: 2px;
            margin: 0 auto;
            user-select: none;
            overflow: auto;
            padding: 10px;
            max-width: 100%;
        }

        .cell {
            width: 40px;
            height: 40px;
            background-color: transparent;
            border: 1px solid transparent;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            font-size: 20px;
            font-weight: bold;
            text-transform: uppercase;
            cursor: pointer;
            transition: all 0.2s;
        }

        .cell.active {
            background-color: var(--cell-bg);
            border: 1px solid var(--cell-border);
        }

        .cell.selected {
            background-color: rgba(139, 47, 201, 0.3);
            border-color: var(--purple);
            box-shadow: 0 0 10px var(--purple);
        }

        .cell.focused {
            background-color: rgba(0, 200, 150, 0.3);
            border-color: var(--emerald);
            box-shadow: 0 0 15px var(--emerald);
        }

        .cell .number {
            position: absolute;
            top: 2px;
            left: 2px;
            font-size: 10px;
            color: var(--gold);
        }

        .cell.correct {
            color: var(--emerald);
            text-shadow: 0 0 5px var(--emerald);
        }

        .cell.incorrect {
            color: #ff4444;
            text-shadow: 0 0 5px #ff4444;
        }

        .clues-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            background: rgba(0, 0, 0, 0.5);
            padding: 15px;
            border-radius: 8px;
            border-top: 1px solid var(--gold);
        }

        .clue-list h3 {
            font-family: 'Cinzel Decorative', serif;
            color: var(--gold);
            font-size: 14px;
            margin-top: 0;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .clue-item {
            font-size: 14px;
            padding: 5px;
            border-radius: 4px;
            cursor: pointer;
            margin-bottom: 4px;
            transition: color 0.2s;
        }

        .clue-item:hover {
            color: var(--gold);
        }

        .clue-item.active {
            background-color: rgba(240, 192, 64, 0.1);
            color: var(--gold);
            font-weight: bold;
        }

        .controls {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
            margin-top: 20px;
        }

        button {
            background-color: transparent;
            border: 1px solid var(--gold);
            color: var(--gold);
            padding: 8px 15px;
            font-family: 'Rajdhani', sans-serif;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
            border-radius: 4px;
            text-transform: uppercase;
            font-size: 13px;
        }

        button:hover {
            background-color: var(--gold);
            color: var(--bg-color);
        }

        button.primary {
            background-color: var(--gold);
            color: var(--bg-color);
        }

        @media (max-width: 480px) {
            .cell { width: 32px; height: 32px; font-size: 16px; }
            .clues-container { grid-template-columns: 1fr; }
        }

        #success-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(10, 10, 15, 0.9);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 100;
            text-align: center;
        }

        .success-content {
            border: 2px solid var(--gold);
            padding: 40px;
            border-radius: 20px;
            background: var(--bg-color);
            box-shadow: 0 0 50px var(--gold);
            animation: glow 2s infinite alternate;
        }

        #help-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(10, 10, 15, 0.95);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 110;
            padding: 20px;
        }

        .help-content {
            border: 2px solid var(--gold);
            padding: 30px;
            border-radius: 20px;
            background: var(--bg-color);
            max-width: 500px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 0 30px rgba(240, 192, 64, 0.2);
        }

        .help-content h2 {
            font-family: 'Cinzel Decorative', serif;
            color: var(--gold);
            margin-top: 0;
            text-align: center;
        }
        .clue-item.completed {
            text-decoration: line-through;
            opacity: 0.4;
        }

        /* Bayo Hint Popup */
        #bayo-hint-popup {
            position: fixed;
            bottom: -150px;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            max-width: 400px;
            background: var(--bg-color);
            border: 2px solid var(--emerald);
            border-radius: 15px;
            padding: 15px;
            display: flex;
            gap: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            transition: bottom 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            z-index: 1200;
        }

        #bayo-hint-popup.show { bottom: 30px; }

        #bayo-hint-popup .bayo-avatar {
            width: 50px;
            height: 50px;
            background: var(--emerald);
            border-radius: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            border: 2px solid var(--gold);
        }

        #bayo-hint-popup .content { flex: 1; }
        #bayo-hint-popup .title { color: var(--gold); font-weight: 700; font-size: 0.9rem; margin-bottom: 3px; font-family: 'Cinzel Decorative', serif; }
        #bayo-hint-popup .text { font-size: 0.85rem; color: #ccc; line-height: 1.3; white-space: pre-wrap; }

        .help-section {
            margin-bottom: 20px;
        }

        .help-section h3 {
            color: var(--purple);
            font-size: 1.1rem;
            margin-bottom: 10px;
            border-bottom: 1px solid rgba(139, 47, 201, 0.3);
            padding-bottom: 5px;
        }

        .help-section p, .help-section li {
            font-size: 0.95rem;
            line-height: 1.5;
            color: #ccc;
        }

        .help-section ul {
            padding-left: 20px;
            margin: 0;
        }

        .help-close-btn {
            width: 100%;
            margin-top: 20px;
        }

        .help-trigger {
            position: absolute;
            top: 20px;
            right: 20px;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 20px;
            background: rgba(240, 192, 64, 0.1);
        }

        @keyframes glow {
            from { box-shadow: 0 0 20px var(--gold); }
            to { box-shadow: 0 0 50px var(--gold); }
        }
    </style>
</head>
<body>
    <div class="kente-bar"></div>
    <button class="help-trigger" onclick="toggleHelp(true)">?</button>
    <div class="title-container">
        <span class="diamond">◆</span>
        <h1>Mots Croisés</h1>
        <span class="diamond">◆</span>
    </div>

    <!-- Bayo Hint Popup -->
    <div id="bayo-hint-popup">
        <div class="bayo-avatar">🦉</div>
        <div class="content">
            <div class="title">Bayo à la rescousse !</div>
            <div id="bayo-hint-text" class="text">Astuce...</div>
        </div>
    </div>
    <div class="game-container">
        <div id="crossword-container"></div>
        <div class="clues-container">
            <div class="clue-list">
                <h3>↔ Horizontaux</h3>
                <div id="across-clues"></div>
            </div>
            <div class="clue-list">
                <h3>↕ Verticaux</h3>
                <div id="down-clues"></div>
            </div>
        </div>
        <div class="controls">
            <button onclick="checkGrid()">Vérifier</button>
            <button onclick="revealCell()">Révéler Case</button>
            <button onclick="showSolution()">Solution</button>
        </div>
    </div>
    <div id="help-overlay">
        <div class="help-content">
            <h2>Comment Jouer ?</h2>
            
            <div class="help-section">
                <h3>🎯 Objectif</h3>
                <p>Remplissez la grille avec les mots correspondant aux indices. Chaque mot est lié à la culture ou aux langues africaines (Wolof, Pulaar, etc.).</p>
            </div>

            <div class="help-section">
                <h3>🕹️ Commandes</h3>
                <ul>
                    <li><strong>Sélection</strong> : Cliquez sur une case pour la sélectionner.</li>
                    <li><strong>Direction</strong> : Cliquez une deuxième fois sur la même case pour changer le sens (Horizontal ↔ Vertical).</li>
                    <li><strong>Saisie</strong> : Utilisez votre clavier pour entrer les lettres.</li>
                </ul>
            </div>

            <div class="help-section">
                <h3>🛠️ Outils</h3>
                <ul>
                    <li><strong>Vérifier</strong> : Vérifie si vos réponses sont correctes (Vert = Bon, Rouge = Faux).</li>
                    <li><strong>Révéler</strong> : Dévoile la lettre de la case sélectionnée.</li>
                    <li><strong>Solution</strong> : Affiche toute la grille si vous êtes bloqué.</li>
                </ul>
            </div>

            <button class="primary help-close-btn" onclick="toggleHelp(false)">Compris !</button>
        </div>
    </div>

    <div id="success-overlay">
        <div class="success-content">
            <h2 style="color: var(--gold); font-family: 'Orbitron';">FÉLICITATIONS !</h2>
            <p style="font-size: 1.2rem;">Vous maîtrisez la sagesse des mots.</p>
            <div class="buttons" style="margin-top: 20px;">
                <button class="primary" onclick="if(window.ReactNativeWebView) window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'LEVEL_COMPLETE' })); window.parent.postMessage({ type: 'LEVEL_COMPLETE' }, '*');" style="background:#f0c040;color:#000;">Niveau Suivant</button>
                <button onclick="document.getElementById('success-overlay').style.display='none'">Fermer</button>
            </div>
        </div>
    </div>
    <script>
        const wordList = window.__EXT_WORDS__ || [
            { word: "JEREJEF", clue: "Merci en Wolof" },
            { word: "JAMM", clue: "La Paix" },
            { word: "CEEB", clue: "Le Riz" },
            { word: "WOLOF", clue: "Langue du Sénégal" },
            { word: "NDOX", clue: "L'Eau" }
        ];

        let grid = [];
        let placedWords = [];
        let gridSize = 15;
        let focusedCell = { r: -1, c: -1 };
        let direction = 'across';
        let activeWordObj = null;
        let hintTimeout = null;

        function initGame() {
            generateGrid();
            renderGrid();
            renderClues();
            window.addEventListener('keydown', handleKeyDown);
        }

        function generateGrid() {
            grid = Array(gridSize).fill().map(() => Array(gridSize).fill(null));
            placedWords = [];
            const words = [...wordList].sort((a, b) => b.word.length - a.word.length);
            const first = words[0];
            const startR = Math.floor(gridSize / 2);
            const startC = Math.floor((gridSize - first.word.length) / 2);
            placeWord(first, startR, startC, 'across', 1);

            for (let i = 1; i < words.length; i++) {
                const wordObj = words[i];
                let bestFit = null;
                for (let r = 0; r < gridSize; r++) {
                    for (let c = 0; c < gridSize; c++) {
                        if (grid[r][c]) {
                            const char = grid[r][c].letter;
                            const indexInWord = wordObj.word.indexOf(char);
                            if (indexInWord !== -1) {
                                const tr = r - indexInWord;
                                if (canPlace(wordObj.word, tr, c, 'down')) {
                                    bestFit = { r: tr, c: c, dir: 'down' };
                                    break;
                                }
                                const tc = c - indexInWord;
                                if (canPlace(wordObj.word, r, tc, 'across')) {
                                    bestFit = { r: r, c: tc, dir: 'across' };
                                    break;
                                }
                            }
                        }
                    }
                    if (bestFit) break;
                }
                if (bestFit) placeWord(wordObj, bestFit.r, bestFit.c, bestFit.dir, i + 1);
            }
        }

        function canPlace(word, r, c, dir) {
            if (r < 0 || c < 0) return false;
            if (dir === 'across' && c + word.length > gridSize) return false;
            if (dir === 'down' && r + word.length > gridSize) return false;

            for (let i = 0; i < word.length; i++) {
                const curR = dir === 'across' ? r : r + i;
                const curC = dir === 'across' ? c + i : c;
                const existing = grid[curR][curC];

                if (existing && existing.letter !== word[i]) return false;

                if (dir === 'across') {
                    if (i === 0 && safeGet(curR, curC-1)) return false;
                    if (i === word.length - 1 && safeGet(curR, curC+1)) return false;
                    if (!existing) {
                        if (safeGet(curR-1, curC) || safeGet(curR+1, curC)) return false;
                    }
                } else {
                    if (i === 0 && safeGet(curR-1, curC)) return false;
                    if (i === word.length - 1 && safeGet(curR+1, curC)) return false;
                    if (!existing) {
                        if (safeGet(curR, curC-1) || safeGet(curR, curC+1)) return false;
                    }
                }
            }
            return true;
        }

        function safeGet(r, c) {
            if (r < 0 || r >= gridSize || c < 0 || c >= gridSize) return null;
            return grid[r][c];
        }

        function placeWord(wordObj, r, c, dir, num) {
            placedWords.push({ ...wordObj, r, c, dir, num });
            for (let i = 0; i < wordObj.word.length; i++) {
                const curR = dir === 'across' ? r : r + i;
                const curC = dir === 'across' ? c + i : c;
                if (!grid[curR][curC]) {
                    grid[curR][curC] = { letter: wordObj.word[i], userInput: '', num: i === 0 ? num : null };
                } else if (i === 0) {
                    grid[curR][curC].num = num;
                }
            }
        }

        function renderGrid() {
            const container = document.getElementById('crossword-container');
            container.style.gridTemplateColumns = 'repeat(' + gridSize + ', 1fr)';
            container.innerHTML = '';
            for (let r = 0; r < gridSize; r++) {
                for (let c = 0; c < gridSize; c++) {
                    const cellData = grid[r][c];
                    const div = document.createElement('div');
                    div.className = 'cell' + (cellData ? ' active' : '');
                    if (cellData) {
                        if (cellData.num) {
                            const numSpan = document.createElement('span');
                            numSpan.className = 'number';
                            numSpan.textContent = cellData.num;
                            div.appendChild(numSpan);
                        }
                        div.dataset.r = r;
                        div.dataset.c = c;
                        
                        const letterSpan = document.createElement('span');
                        letterSpan.textContent = cellData.userInput || '';
                        div.appendChild(letterSpan);

                        div.onclick = () => selectCell(r, c);
                        if (focusedCell.r === r && focusedCell.c === c) div.classList.add('focused');
                        else if (isPartofActiveWord(r, c)) div.classList.add('selected');
                    }
                    container.appendChild(div);
                }
            }
        }

        function renderClues() {
            const acrossList = document.getElementById('across-clues');
            const downList = document.getElementById('down-clues');
            acrossList.innerHTML = '';
            downList.innerHTML = '';
            placedWords.forEach(word => {
                const div = document.createElement('div');
                div.className = 'clue-item';
                div.id = 'clue-' + word.dir + '-' + word.num;
                div.textContent = word.num + '. ' + word.clue;
                div.onclick = () => {
                    direction = word.dir;
                    selectCell(word.r, word.c, word.dir);
                };
                if (word.dir === 'across') acrossList.appendChild(div);
                else downList.appendChild(div);
            });
        }

        function selectCell(r, c, forceDir) {
            const wordsAtCell = placedWords.filter(w => {
                if (w.dir === 'across') return w.r === r && c >= w.c && c < w.c + w.word.length;
                return w.c === c && r >= w.r && r < w.r + w.word.length;
            });

            if (wordsAtCell.length === 0) return;

            if (forceDir) {
                direction = forceDir;
            } else if (focusedCell.r === r && focusedCell.c === c) {
                direction = direction === 'across' ? 'down' : 'across';
            } else {
                const validInCurrentDir = wordsAtCell.some(w => w.dir === direction);
                if (!validInCurrentDir && wordsAtCell.length > 0) {
                    direction = wordsAtCell[0].dir;
                }
            }

            focusedCell = { r, c };
            activeWordObj = wordsAtCell.find(w => w.dir === direction) || wordsAtCell[0];

            renderGrid();
            
            // Show Bayo Hint for the selected word
            const popup = document.getElementById('bayo-hint-popup');
            const hintText = document.getElementById('bayo-hint-text');

            if (activeWordObj && activeWordObj.bayoHint) {
                hintText.textContent = activeWordObj.bayoHint;
                popup.classList.add('show');
                if (hintTimeout) clearTimeout(hintTimeout);
                hintTimeout = setTimeout(() => popup.classList.remove('show'), 5000);
            } else {
                popup.classList.remove('show');
                if (hintTimeout) clearTimeout(hintTimeout);
            }
        }

        function isPartofActiveWord(r, c) {
            if (!activeWordObj) return false;
            if (activeWordObj.dir === 'across') {
                return r === activeWordObj.r && c >= activeWordObj.c && c < activeWordObj.c + activeWordObj.word.length;
            } else {
                return c === activeWordObj.c && r >= activeWordObj.r && r < activeWordObj.r + activeWordObj.word.length;
            }
        }

        function handleKeyDown(e) {
            if (focusedCell.r === -1) return;
            if (e.key === 'Enter') {
                checkGrid();
            } else if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
                grid[focusedCell.r][focusedCell.c].userInput = e.key.toUpperCase();
                moveNext();
                checkGrid(false); // Check silently for word completion
            } else if (e.key === 'Backspace') {
                grid[focusedCell.r][focusedCell.c].userInput = '';
                movePrev();
                checkGrid(false); // Check silently for un-completion
            } else if (e.key.startsWith('Arrow')) {
                const key = e.key.replace('Arrow', '').toLowerCase();
                let r = focusedCell.r;
                let c = focusedCell.c;
                if (key === 'up') r = Math.max(0, r - 1);
                if (key === 'down') r = Math.min(gridSize - 1, r + 1);
                if (key === 'left') c = Math.max(0, c - 1);
                if (key === 'right') c = Math.min(gridSize - 1, c + 1);
                
                if (r !== focusedCell.r || c !== focusedCell.c) {
                    if (grid[r][c]) selectCell(r, c);
                }
            }
        }

        function moveNext() {
            if (!activeWordObj) return;
            if (direction === 'across') {
                if (focusedCell.c < activeWordObj.c + activeWordObj.word.length - 1) {
                    focusedCell.c++;
                }
            } else {
                if (focusedCell.r < activeWordObj.r + activeWordObj.word.length - 1) {
                    focusedCell.r++;
                }
            }
            renderGrid();
        }

        function movePrev() {
            if (!activeWordObj) return;
            if (direction === 'across') {
                if (focusedCell.c > activeWordObj.c) {
                    focusedCell.c--;
                }
            } else {
                if (focusedCell.r > activeWordObj.r) {
                    focusedCell.r--;
                }
            }
            renderGrid();
        }

        function checkGrid(showOverlay = true) {
            let allCorrect = true;
            for (let r = 0; r < gridSize; r++) {
                for (let c = 0; c < gridSize; c++) {
                    const cell = grid[r][c];
                    if (!cell) continue;
                    const el = document.querySelector('.cell[data-r="' + r + '"][data-c="' + c + '"]');
                    if (cell.userInput === cell.letter) {
                        el.classList.add('correct');
                        el.classList.remove('incorrect');
                    } else if (cell.userInput !== '') {
                        el.classList.add('incorrect');
                        el.classList.remove('correct');
                        allCorrect = false;
                    } else {
                        allCorrect = false;
                    }
                }
            }

            // Check individual words to cross out the clues
            placedWords.forEach(word => {
                let thisWordCorrect = true;
                for (let i = 0; i < word.word.length; i++) {
                    const r = word.dir === 'across' ? word.r : word.r + i;
                    const c = word.dir === 'across' ? word.c + i : word.c;
                    const cell = grid[r][c];
                    if (cell.userInput !== cell.letter) {
                        thisWordCorrect = false;
                        break;
                    }
                }
                const clueEl = document.getElementById('clue-' + word.dir + '-' + word.num);
                if (clueEl) {
                    if (thisWordCorrect) clueEl.classList.add('completed');
                    else clueEl.classList.remove('completed');
                }
            });

            if (showOverlay && allCorrect) {
                 document.getElementById('success-overlay').style.display = 'flex';
            }
        }

        function revealCell() {
            if (focusedCell.r !== -1) {
                grid[focusedCell.r][focusedCell.c].userInput = grid[focusedCell.r][focusedCell.c].letter;
                renderGrid();
            }
        }

        function showSolution() {
            for (let r = 0; r < gridSize; r++) {
                for (let c = 0; c < gridSize; c++) {
                    if (grid[r][c]) grid[r][c].userInput = grid[r][c].letter;
                }
            }
            renderGrid();
        }

        function toggleHelp(show) {
            document.getElementById('help-overlay').style.display = show ? 'flex' : 'none';
        }

        initGame();

        window.document.addEventListener('message', function(e) {
            let data;
            try {
                data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
            } catch(err) { return; }
            
            if (data && data.type === 'SET_WORDS') {
                wordList.length = 0;
                wordList.push(...data.words);
                generateGrid();
                renderGrid();
                renderClues();
            }
        });

        window.addEventListener('message', function(e) {
            let data;
            try {
                data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
            } catch(err) { return; }
            
            if (data && data.type === 'SET_WORDS') {
                wordList.length = 0;
                wordList.push(...data.words);
                generateGrid();
                renderGrid();
                renderClues();
            }
        });
    </script>
</body>
</html>`;
