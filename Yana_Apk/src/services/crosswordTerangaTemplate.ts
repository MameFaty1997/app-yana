export const CROSSWORD_TERANGA_TEMPLATE = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Mots Croisés Teranga</title>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Nunito:wght@400;600;700&family=Rajdhani:wght@500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg: #1a0e05;
            --surface: #241508;
            --orange: #e85d04;
            --gold: #f4a026;
            --gold-light: #fbbf24;
            --cream: #fdf3e3;
            --green: #2d6a4f;
            --teal: #1b7a6e;
            --red: #9b2226;
            --muted: #c4a882;
            --kente: repeating-linear-gradient(90deg, #e85d04 0, #e85d04 10px, #2d6a4f 10px, #2d6a4f 20px, #f4a026 20px, #f4a026 30px, #1a0e05 30px, #1a0e05 40px);
        }

        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }

        body {
            margin: 0;
            padding: 0;
            background-color: var(--bg);
            color: var(--cream);
            font-family: 'Nunito', sans-serif;
            overflow-x: hidden;
            min-height: 100vh;
        }

        /* Decorative background pattern */
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

        header {
            padding: 30px 20px 10px;
            text-align: center;
        }

        h1 {
            font-family: 'Cinzel Decorative', serif;
            font-size: 1.8rem;
            margin: 0;
            background: linear-gradient(to right, var(--orange), var(--gold), var(--orange));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        .title-container {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
        }

        .diamond { color: var(--gold); font-size: 1rem; }

        .subtitle {
            font-family: 'Nunito', sans-serif;
            color: var(--muted);
            text-transform: uppercase;
            letter-spacing: 4px;
            font-size: 0.8rem;
            margin-top: 5px;
            font-weight: 700;
        }

        /* Home / Level Selection */
        #home-screen {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
            text-align: center;
        }

        .menu-title {
            font-family: 'Cinzel Decorative', serif;
            color: var(--gold-light);
            margin-bottom: 30px;
        }

        .level-btn {
            width: 280px;
            margin: 10px 0;
            padding: 20px;
            background: rgba(244, 160, 38, 0.1);
            border: 2px solid var(--gold);
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .level-btn:active { transform: scale(0.95); }
        .level-btn .emoji { font-size: 1.8rem; }
        .level-btn .info { text-align: left; }
        .level-btn .name { font-family: 'Cinzel Decorative', serif; color: var(--cream); display: block; }
        .level-btn .desc { font-size: 0.8rem; color: var(--muted); }

        /* Game Interface */
        #game-screen { display: none; padding: 20px; }

        .stats-bar {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }

        .stat-pill {
            background: rgba(244, 160, 38, 0.1);
            border: 1px solid var(--gold);
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.85rem;
            color: var(--gold-light);
            font-family: 'Rajdhani', sans-serif;
            font-weight: 700;
        }

        .game-layout {
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
        }

        @media (min-width: 768px) {
            .game-layout { grid-template-columns: 1fr 350px; }
        }

        /* Crossword Grid */
        #grid-container {
            background: var(--bg);
            border: 2px solid rgba(244, 160, 38, 0.3);
            box-shadow: 8px 8px 0 var(--gold);
            display: grid;
            margin: 0 auto;
            position: relative;
            user-select: none;
        }

        .cell {
            position: relative;
            aspect-ratio: 1/1;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Cinzel Decorative', serif;
            font-weight: 900;
            font-size: 1.4rem;
            cursor: pointer;
            transition: all 0.2s;
        }

        .cell-black { background-color: #111; cursor: default; }
        .cell-white { background-color: var(--cream); color: var(--bg); }

        .cell .num {
            position: absolute;
            top: 2px;
            left: 3px;
            font-size: 0.65rem;
            color: var(--orange);
            font-family: 'Nunito', sans-serif;
            font-weight: 700;
        }

        .cell.selected { background-color: rgba(244, 160, 38, 0.15); }
        .cell.focused { background-color: var(--gold-light); box-shadow: inset 0 0 10px rgba(0,0,0,0.2), 0 0 15px var(--gold); z-index: 5; }
        .cell.correct { color: var(--green); }
        .cell.incorrect { color: var(--red); opacity: 0.8; }

        /* Clues Panel */
        .clues-panel {
            background: var(--surface);
            border: 1px solid rgba(244, 160, 38, 0.2);
            border-radius: 12px;
            padding: 20px;
            max-height: 500px;
            overflow-y: auto;
        }

        .clue-section h3 {
            font-family: 'Cinzel Decorative', serif;
            color: var(--gold-light);
            font-size: 1rem;
            border-bottom: 2px solid rgba(244, 160, 38, 0.1);
            padding-bottom: 8px;
            margin-top: 0;
        }

        .clue-item {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            padding: 10px;
            margin: 8px 0;
            border-radius: 8px;
            cursor: pointer;
            transition: background 0.2s;
        }

        .clue-item:hover { background: rgba(244, 160, 38, 0.05); }
        .clue-item.active { background: rgba(244, 160, 38, 0.1); border-left: 3px solid var(--orange); }

        .clue-img {
            width: 36px;
            height: 48px;
            object-fit: cover;
            border-radius: 6px;
            border: 1px solid var(--gold);
        }

        .clue-text { flex: 1; font-size: 0.9rem; color: #ccc; }
        .clue-text .clue-num { font-weight: 700; color: var(--gold); margin-right: 5px; }

        /* Controls */
        .game-controls {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 30px;
            flex-wrap: wrap;
        }

        .btn {
            padding: 12px 20px;
            border-radius: 8px;
            font-family: 'Rajdhani', sans-serif;
            font-weight: 700;
            font-size: 0.9rem;
            text-transform: uppercase;
            cursor: pointer;
            transition: all 0.3s;
            border: none;
        }

        .btn-primary {
            background: linear-gradient(deg, var(--orange), var(--gold));
            color: white;
            box-shadow: 0 4px 12px rgba(232, 93, 4, 0.3);
        }

        .btn-secondary {
            background: rgba(244, 160, 38, 0.1);
            border: 1px solid var(--gold);
            color: var(--gold);
        }

        .btn:active { transform: translateY(2px); }

        /* Popup "Le saviez-vous ?" */
        #fact-popup {
            position: fixed;
            bottom: -150px;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            max-width: 400px;
            background: var(--surface);
            border: 2px solid var(--gold);
            border-radius: 15px;
            padding: 15px;
            display: flex;
            gap: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            transition: bottom 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            z-index: 1200;
        }

        #fact-popup.show { bottom: 30px; }

        #fact-popup .icon { font-size: 2rem; }
        #fact-popup .content { flex: 1; }
        #fact-popup .title { color: var(--gold-light); font-weight: 700; font-size: 0.9rem; margin-bottom: 3px; }
        #fact-popup .text { font-size: 0.85rem; color: #ccc; line-height: 1.3; }

        /* Victory Overlay */
        #victory-overlay {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(26, 14, 5, 0.95);
            display: none;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            text-align: center;
            padding: 20px;
        }

        .victory-card {
            background: var(--surface);
            border: 3px solid var(--gold);
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 0 50px rgba(244, 160, 38, 0.4);
            animation: victoryPop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes victoryPop {
            from { transform: scale(0.5); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }

        .stars { font-size: 2rem; margin: 15px 0; }
        .star { display: inline-block; animation: starTwinkle 1.5s infinite alternate; }
        .star:nth-child(2) { animation-delay: 0.3s; }
        .star:nth-child(3) { animation-delay: 0.6s; }

        @keyframes starTwinkle {
            from { transform: scale(1); filter: brightness(1); }
            to { transform: scale(1.3); filter: brightness(1.5); }
        }
    </style>
</head>
<body>
    <div class="kente-bar"></div>

    <header>
        <div class="title-container">
            <span class="diamond">◆</span>
            <h1>Mots Croisés Teranga</h1>
            <span class="diamond">◆</span>
        </div>
        <div class="subtitle">Diversité Linguistique du Sénégal</div>
    </header>

    <div id="home-screen">
        <h2 class="menu-title">Choisissez votre niveau</h2>
        <button class="level-btn" onclick="startGame('beginner')">
            <span class="emoji">🌱</span>
            <div class="info">
                <span class="name">Débutant</span>
                <span class="desc">5 mots • Apprentissage doux</span>
            </div>
        </button>
        <button class="level-btn" onclick="startGame('intermediate')">
            <span class="emoji">🌳</span>
            <div class="info">
                <span class="name">Intermédiaire</span>
                <span class="desc">8 mots • Défi culturel</span>
            </div>
        </button>
        <button class="level-btn" onclick="startGame('expert')">
            <span class="emoji">🦁</span>
            <div class="info">
                <span class="name">Expert</span>
                <span class="desc">12 mots • Maîtrise totale</span>
            </div>
        </button>
    </div>

    <div id="game-screen">
        <div class="stats-bar">
            <div class="stat-pill">✨ <span id="stat-words">0</span>/0 Mots</div>
            <div class="stat-pill">⚡ <span id="stat-checks">0</span> Vérifs</div>
            <div class="stat-pill">⏱️ <span id="stat-time">00:00</span></div>
        </div>

        <div class="game-layout">
            <div id="grid-container"></div>
            
            <div class="clues-panel">
                <div class="clue-section">
                    <h3>↔ Horizontaux</h3>
                    <div id="across-clues"></div>
                </div>
                <div class="clue-section" style="margin-top: 25px;">
                    <h3>↕ Verticaux</h3>
                    <div id="down-clues"></div>
                </div>
            </div>
        </div>

        <div class="game-controls">
            <button class="btn btn-primary" onclick="checkAll()">Vérifier</button>
            <button class="btn btn-secondary" onclick="revealCell()">Révéler Case</button>
            <button class="btn btn-secondary" onclick="showSolution()">Solution</button>
            <button class="btn btn-secondary" onclick="location.reload()">Quitter</button>
        </div>
    </div>

    <div id="fact-popup">
        <div class="icon">💡</div>
        <div class="content">
            <div class="title">Le saviez-vous ?</div>
            <div class="text" id="fact-text">...</div>
        </div>
    </div>

    <div id="victory-overlay">
        <div class="victory-card">
            <h2 style="font-family: 'Cinzel Decorative'; color: var(--gold-light); margin: 0;">FÉLICITATIONS !</h2>
            <div class="stars">
                <span class="star">✨</span>
                <span class="star">⭐</span>
                <span class="star">🌟</span>
                <span class="star">💫</span>
            </div>
            <p style="margin: 20px 0; color: #ccc;">Vous avez maîtrisé les mots de la Teranga.</p>
            <div id="final-stats" style="color: var(--gold); font-weight: 700; margin-bottom: 25px;"></div>
            <button class="btn btn-primary" onclick="location.reload()">Rejouer</button>
        </div>
    </div>

    <script>
        let fullList = [];
        let activeWords = [];
        let gridSize = 10;
        let grid = [];
        let focusedCell = { r: -1, c: -1 };
        let direction = 'across';
        let stats = { checks: 0, startTime: null, timer: null };
        let completedWords = new Set();

        const ETHNIE_ICONS = {
            'Wolof': 'illustration-wolof.png',
            'Peulh': 'illustration-peulh.png',
            'Serere': 'illustration-serere.png',
            'Diola': 'illustration-diola.png',
            'Mandinka': 'illustration-mandinka.png',
            'Soninke': 'illustration-soninke.png',
            'Bambara': 'illustration-bambara.png',
            'Bassari': 'illustration-bassari.png',
            'Balante': 'illustration-balante.png',
            'Manjack': 'illustration-manjack.png',
            'Mankagne': 'illustration-mankagne.png',
            'Bainouk': 'illustration-bainouk.png'
        };

        window.addEventListener('message', function(e) {
            let data;
            try {
                data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
            } catch(err) { return; }
            
            if (data && data.type === 'SET_DATA') {
                fullList = data.lexicon;
            }
        });

        function startGame(level) {
            if (fullList.length === 0) {
                // Fallback for demo/dev
                alert("Données non chargées. Veuillez patienter...");
                return;
            }

            document.getElementById('home-screen').style.display = 'none';
            document.getElementById('game-screen').style.display = 'block';
            
            let count = level === 'beginner' ? 5 : (level === 'intermediate' ? 8 : 12);
            activeWords = [...fullList].sort(() => Math.random() - 0.5).slice(0, count);
            
            generateLayout();
            renderGrid();
            renderClues();
            startTimer();

            // Stats markers
            document.getElementById('stat-words').textContent = "0";
            document.querySelector('#stat-words').parentElement.textContent = "✨ 0/" + activeWords.length + " Mots";
        }

        function generateLayout() {
            // Basic placement algorithm (optimized for small word sets)
            gridSize = activeWords.length > 8 ? 12 : 10;
            grid = Array(gridSize).fill().map(() => Array(gridSize).fill(null));
            
            let placed = [];
            
            // First word in center
            let first = activeWords[0];
            let startR = Math.floor(gridSize/2);
            let startC = Math.floor((gridSize - first.word.length)/2);
            placeWord(first, startR, startC, 'across', placed);

            // Try to place others intersecting
            for (let i = 1; i < activeWords.length; i++) {
                let word = activeWords[i];
                let best = null;

                for (let p of placed) {
                    for (let wIdx = 0; wIdx < word.word.length; wIdx++) {
                        for (let pIdx = 0; pIdx < p.word.length; pIdx++) {
                            if (word.word[wIdx] === p.word[pIdx]) {
                                let newDir = p.dir === 'across' ? 'down' : 'across';
                                let newR = newDir === 'down' ? p.r - wIdx : p.r + pIdx;
                                let newC = newDir === 'across' ? p.c - wIdx : p.c + pIdx;
                                
                                if (canPlace(word.word, newR, newC, newDir, placed)) {
                                    best = { r: newR, c: newC, dir: newDir };
                                    break;
                                }
                            }
                        }
                        if (best) break;
                    }
                    if (best) break;
                }

                if (best) {
                    placeWord(word, best.r, best.c, best.dir, placed);
                } else {
                    // Try random placement if no intersection found (More aggressive)
                    for (let attempt = 0; attempt < 500; attempt++) {
                        let r = Math.floor(Math.random() * (gridSize - 2)) + 1;
                        let c = Math.floor(Math.random() * (gridSize - 2)) + 1;
                        let dir = Math.random() > 0.5 ? 'across' : 'down';
                        if (canPlace(word.word, r, c, dir, placed)) {
                            placeWord(word, r, c, dir, placed);
                            break;
                        }
                    }
                }
            }
            activeWords = placed;
            
            // Re-number based on top-left order
            let num = 1;
            let cells = [];
            activeWords.forEach(p => {
                let existing = cells.find(c => c.r === p.r && c.c === p.c);
                if (existing) p.num = existing.num;
                else {
                    p.num = num++;
                    cells.push({ r: p.r, c: p.c, num: p.num });
                }
                grid[p.r][p.c].num = p.num;
            });
        }

        function canPlace(word, r, c, dir, placed) {
            if (r < 0 || c < 0) return false;
            if (dir === 'across' && c + word.length > gridSize) return false;
            if (dir === 'down' && r + word.length > gridSize) return false;

            for (let i = 0; i < word.length; i++) {
                let currR = dir === 'down' ? r + i : r;
                let currC = dir === 'across' ? c + i : c;
                let existing = grid[currR][currC];
                if (existing && existing.letter !== word[i]) return false;
                
                // Check neighbors to avoid adjacent words (simplified)
                // This is a basic check; real crossword engines are more complex
            }
            return true;
        }

        function placeWord(data, r, c, dir, placed) {
            for (let i = 0; i < data.word.length; i++) {
                let currR = dir === 'down' ? r + i : r;
                let currC = dir === 'across' ? c + i : c;
                if (!grid[currR][currC]) {
                    grid[currR][currC] = { letter: data.word[i], userInput: '', num: null };
                }
            }
            placed.push({ ...data, r, c, dir });
        }

        function renderGrid() {
            const container = document.getElementById('grid-container');
            container.style.gridTemplateColumns = 'repeat(' + gridSize + ', 1fr)';
            container.innerHTML = '';
            
            let cellSize = Math.min(window.innerWidth * 0.9 / gridSize, 45);
            container.style.width = (cellSize * gridSize) + 'px';
            container.style.height = (cellSize * gridSize) + 'px';

            for (let r = 0; r < gridSize; r++) {
                for (let c = 0; c < gridSize; c++) {
                    const cell = grid[r][c];
                    const div = document.createElement('div');
                    div.style.width = cellSize + 'px';
                    div.style.height = cellSize + 'px';
                    div.className = cell ? 'cell cell-white' : 'cell cell-black';
                    
                    if (cell) {
                        if (cell.num) {
                            const n = document.createElement('span');
                            n.className = 'num';
                            n.textContent = cell.num;
                            div.appendChild(n);
                        }
                        
                        const input = document.createElement('span');
                        input.textContent = cell.userInput;
                        div.appendChild(input);

                        if (focusedCell.r === r && focusedCell.c === c) div.classList.add('focused');
                        else if (isPartofActiveWord(r, c)) div.classList.add('selected');

                        div.onclick = () => selectCell(r, c);
                    }
                    container.appendChild(div);
                }
            }
        }

        function renderClues() {
            const across = document.getElementById('across-clues');
            const down = document.getElementById('down-clues');
            across.innerHTML = ''; down.innerHTML = '';

            activeWords.forEach(p => {
                const item = document.createElement('div');
                item.className = 'clue-item';
                if (isWordFocused(p)) item.classList.add('active');
                
                item.innerHTML = '<img src="' + p.image + '" class="clue-img" alt="' + p.ethnie + '"><div class="clue-text"><span class="clue-num">' + p.num + '.</span> ' + p.clue + '</div>';
                item.onclick = () => {
                    direction = p.dir;
                    selectCell(p.r, p.c);
                };
                
                if (p.dir === 'across') across.appendChild(item);
                else down.appendChild(item);
            });
        }

        function selectCell(r, c) {
            if (focusedCell.r === r && focusedCell.c === c) {
                direction = direction === 'across' ? 'down' : 'across';
            }
            focusedCell = { r, c };
            renderGrid();
            renderClues();
        }

        function isPartofActiveWord(r, c) {
            if (focusedCell.r === -1) return false;
            let active = getWordAt(focusedCell.r, focusedCell.c, direction);
            if (!active) return false;
            return r >= active.r && r < (active.dir === 'down' ? active.r + active.word.length : active.r + 1) &&
                   c >= active.c && c < (active.dir === 'across' ? active.c + active.word.length : active.c + 1);
        }

        function isWordFocused(p) {
            if (focusedCell.r === -1) return false;
            let active = getWordAt(focusedCell.r, focusedCell.c, direction);
            return active && active.num === p.num && active.dir === p.dir;
        }

        function getWordAt(r, c, dir) {
            return activeWords.find(w => {
                if (w.dir !== dir) return false;
                if (dir === 'across') return r === w.r && c >= w.c && c < w.c + w.word.length;
                return c === w.c && r >= w.r && r < w.r + w.word.length;
            });
        }

        document.addEventListener('keydown', (e) => {
            if (focusedCell.r === -1) return;
            
            if (e.key === 'Backspace') {
                grid[focusedCell.r][focusedCell.c].userInput = '';
                moveFocus(-1);
            } else if (e.key === 'Tab') {
                e.preventDefault();
                moveNextWord();
            } else if (e.key === ' ') {
                direction = direction === 'across' ? 'down' : 'across';
                renderGrid(); renderClues();
            } else if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
                grid[focusedCell.r][focusedCell.c].userInput = e.key.toUpperCase();
                checkWordCompletion();
                moveFocus(1);
            } else if (e.key.startsWith('Arrow')) {
                let dr = 0, dc = 0;
                if (e.key === 'ArrowUp') dr = -1;
                if (e.key === 'ArrowDown') dr = 1;
                if (e.key === 'ArrowLeft') dc = -1;
                if (e.key === 'ArrowRight') dc = 1;
                
                let nr = focusedCell.r + dr, nc = focusedCell.c + dc;
                if (nr >= 0 && nr < gridSize && nc >= 0 && nc < gridSize && grid[nr][nc]) {
                    focusedCell = { r: nr, c: nc };
                    renderGrid(); renderClues();
                }
            }
            renderGrid();
        });

        function moveFocus(step) {
            let dr = direction === 'down' ? step : 0;
            let dc = direction === 'across' ? step : 0;
            let nr = focusedCell.r + dr, nc = focusedCell.c + dc;
            if (nr >= 0 && nr < gridSize && nc >= 0 && nc < gridSize && grid[nr][nc]) {
                focusedCell = { r: nr, c: nc };
            }
        }

        function moveNextWord() {
            let idx = activeWords.findIndex(w => isWordFocused(w));
            let next = activeWords[(idx + 1) % activeWords.length];
            direction = next.dir;
            selectCell(next.r, next.c);
        }

        function checkWordCompletion() {
            activeWords.forEach(w => {
                if (completedWords.has(w.num + w.dir)) return;
                
                let correct = true;
                for (let i = 0; i < w.word.length; i++) {
                    let r = w.dir === 'down' ? w.r + i : w.r;
                    let c = w.dir === 'across' ? w.c + i : w.c;
                    if (grid[r][c].userInput !== w.word[i]) {
                        correct = false;
                        break;
                    }
                }
                
                if (correct) {
                    completedWords.add(w.num + w.dir);
                    showFact(w.fact);
                    updateWordStat();
                    if (completedWords.size === activeWords.length) showVictory();
                }
            });
        }

        function updateWordStat() {
            document.getElementById('stat-words').textContent = completedWords.size;
            document.querySelector('#stat-words').parentElement.textContent = "✨ " + completedWords.size + "/" + activeWords.length + " Mots";
        }

        function showFact(text) {
            const popup = document.getElementById('fact-popup');
            document.getElementById('fact-text').textContent = text;
            popup.classList.add('show');
            setTimeout(() => popup.classList.remove('show'), 4000);
        }

        function checkAll() {
            stats.checks++;
            document.getElementById('stat-checks').textContent = stats.checks;
            
            for (let r = 0; r < gridSize; r++) {
                for (let c = 0; c < gridSize; c++) {
                    if (!grid[r][c]) continue;
                    const cell = grid[r][c];
                    const el = document.querySelector('.cell[style*="width"][onclick]'); // Simplified selector
                    // Real check happens via CSS classes added to the div
                    const divs = document.querySelectorAll('.cell');
                    const div = divs[r * gridSize + c];
                    
                    if (cell.userInput === '') div.classList.remove('correct', 'incorrect');
                    else if (cell.userInput === cell.letter) div.classList.add('correct');
                    else div.classList.add('incorrect');
                }
            }
        }

        function revealCell() {
            if (focusedCell.r !== -1) {
                grid[focusedCell.r][focusedCell.c].userInput = grid[focusedCell.r][focusedCell.c].letter;
                checkWordCompletion();
                renderGrid();
            }
        }

        function showSolution() {
            for (let r = 0; r < gridSize; r++) {
                for (let c = 0; c < gridSize; c++) {
                    if (grid[r][c]) grid[r][c].userInput = grid[r][c].letter;
                }
            }
            completedWords = new Set(activeWords.map(w => w.num + w.dir));
            updateWordStat();
            renderGrid();
        }

        function startTimer() {
            stats.startTime = Date.now();
            stats.timer = setInterval(() => {
                let diff = Date.now() - stats.startTime;
                let mins = Math.floor(diff / 60000);
                let secs = Math.floor((diff % 60000) / 1000);
                document.getElementById('stat-time').textContent = 
                    (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs;
            }, 1000);
        }

        function showVictory() {
            clearInterval(stats.timer);
            const overlay = document.getElementById('victory-overlay');
            overlay.style.display = 'flex';
            document.getElementById('final-stats').innerHTML = 
                "Temps : " + document.getElementById('stat-time').textContent + " • Vérifications : " + stats.checks;
        }
    </script>
</body>
</html>`;
