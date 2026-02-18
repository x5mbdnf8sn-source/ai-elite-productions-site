const CATEGORIES = ['All', 'Action', 'Sports', 'Puzzle', 'Strategy', 'Arcade', 'Multiplayer'];
let gamesData = [];
let currentCategory = 'All';
let currentSearch = '';

// DOM Elements
const gamesGrid = document.getElementById('games-grid');
const categoryBar = document.getElementById('category-bar');
const searchInput = document.getElementById('search-input');
const galleryView = document.getElementById('gallery-view');
const playerView = document.getElementById('player-view');
const gameFrame = document.getElementById('game-frame');
const backButton = document.getElementById('back-button');
const logo = document.getElementById('logo');
const fullscreenButton = document.getElementById('fullscreen-button');

// Player Elements
const playerTitle = document.getElementById('player-title');
const playerCategory = document.getElementById('player-category');
const playerDescription = document.getElementById('player-description');

// Initialize
async function init() {
    try {
        const response = await fetch('./games.json');
        gamesData = await response.json();
        renderCategories();
        renderGames();
    } catch (error) {
        console.error('Failed to load games:', error);
    }
}

function renderCategories() {
    categoryBar.innerHTML = CATEGORIES.map(cat => `
        <button onclick="setCategory('${cat}')" class="category-btn px-6 py-2.5 rounded-2xl text-xs font-black whitespace-nowrap transition-all duration-300 border ${
            currentCategory === cat 
            ? 'bg-cyan-600 border-cyan-400 text-white shadow-xl shadow-cyan-900/40 scale-105' 
            : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
        }">
            ${cat.toUpperCase()}
        </button>
    `).join('');
}

function renderGames() {
    const filtered = gamesData.filter(game => {
        const matchesSearch = game.title.toLowerCase().includes(currentSearch.toLowerCase());
        const matchesCat = currentCategory === 'All' || game.category === currentCategory;
        return matchesSearch && matchesCat;
    });

    if (filtered.length === 0) {
        gamesGrid.innerHTML = `
            <div class="col-span-full py-20 text-center bg-slate-900/50 rounded-3xl border border-slate-800">
                <p class="text-slate-500 text-xl font-bold">NO GAMES FOUND</p>
            </div>
        `;
        return;
    }

    gamesGrid.innerHTML = filtered.map(game => `
        <div onclick="openGame('${game.id}')" class="game-card group relative bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-900/30 hover:border-cyan-500/50">
            <div class="aspect-[4/3] relative overflow-hidden">
                <img src="${game.thumbnail}" alt="${game.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
                <div class="absolute top-4 left-4">
                    <span class="px-3 py-1 bg-slate-950/80 backdrop-blur-md border border-slate-700 text-[10px] font-black text-cyan-400 rounded-lg uppercase tracking-widest">${game.category}</span>
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors uppercase tracking-tight">${game.title}</h3>
                <p class="text-slate-500 text-sm line-clamp-2 leading-relaxed h-10">${game.description}</p>
                <div class="mt-6 flex items-center justify-between">
                    <span class="bg-slate-800 text-slate-400 text-[10px] font-bold px-2 py-1 rounded">HTML5</span>
                    <span class="play-button text-cyan-500 font-black text-xs transition-transform">PLAY NOW</span>
                </div>
            </div>
            <div class="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
        </div>
    `).join('');
}

window.setCategory = (cat) => {
    currentCategory = cat;
    renderCategories();
    renderGames();
};

window.openGame = (id) => {
    const game = gamesData.find(g => g.id === id);
    if (!game) return;

    playerTitle.innerText = game.title;
    playerCategory.innerText = game.category;
    playerDescription.innerText = game.description;
    gameFrame.src = game.iframeUrl;

    galleryView.classList.add('hidden');
    playerView.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

function closeGame() {
    gameFrame.src = "";
    playerView.classList.add('hidden');
    galleryView.classList.remove('hidden');
}

logo.onclick = () => {
    currentSearch = '';
    currentCategory = 'All';
    searchInput.value = '';
    closeGame();
    renderCategories();
    renderGames();
};

backButton.onclick = closeGame;

searchInput.oninput = (e) => {
    currentSearch = e.target.value;
    renderGames();
};

fullscreenButton.onclick = () => {
    if (gameFrame.requestFullscreen) {
        gameFrame.requestFullscreen();
    } else if (gameFrame.webkitRequestFullscreen) {
        gameFrame.webkitRequestFullscreen();
    } else if (gameFrame.msRequestFullscreen) {
        gameFrame.msRequestFullscreen();
    }
};

init();