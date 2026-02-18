// Elite Productions - Main Logic
let games = [];
let currentCategory = 'All';
let searchQuery = '';
let selectedGame = null;

const CATEGORIES = ['All', 'Action', 'Sports', 'Puzzle', 'Strategy', 'Arcade', 'Multiplayer'];

// DOM Elements
const homeSection = document.getElementById('home-section');
const gameViewSection = document.getElementById('game-view-section');
const gameGrid = document.getElementById('game-grid');
const categoryBar = document.getElementById('category-bar');
const searchInput = document.getElementById('search-input');
const logo = document.getElementById('logo');
const backBtn = document.getElementById('back-btn');
const fullscreenBtn = document.getElementById('fullscreen-btn');
const gameIframe = document.getElementById('game-iframe');
const gameInfo = document.getElementById('game-info');
const noResults = document.getElementById('no-results');
const clearFiltersBtn = document.getElementById('clear-filters');

// Initial Data Fetch
async function init() {
    try {
        const response = await fetch('./games.json');
        if (!response.ok) throw new Error('Failed to load games');
        games = await response.json();
        renderCategories();
        renderGallery();
    } catch (err) {
        console.error(err);
        gameGrid.innerHTML = `<div class="col-span-full text-center py-20 text-red-400">Error loading games. Please try again later.</div>`;
    }
}

function renderCategories() {
    categoryBar.innerHTML = CATEGORIES.map(cat => `
        <button 
            onclick="setCategory('${cat}')"
            class="px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 border ${
                currentCategory === cat 
                ? 'bg-cyan-600 border-cyan-400 text-white shadow-lg shadow-cyan-900/40 scale-105' 
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
            }">
            ${cat.toUpperCase()}
        </button>
    `).join('');
}

function renderGallery() {
    const filtered = games.filter(game => {
        const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             game.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = currentCategory === 'All' || game.category === currentCategory;
        return matchesSearch && matchesCategory;
    });

    if (filtered.length === 0) {
        gameGrid.innerHTML = '';
        noResults.classList.remove('hidden');
    } else {
        noResults.classList.add('hidden');
        gameGrid.innerHTML = filtered.map(game => `
            <div onclick="openGame('${game.id}')" class="game-card group relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300">
                <div class="aspect-video relative overflow-hidden">
                    <img src="${game.thumbnail}" alt="${game.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy">
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-60"></div>
                    <div class="absolute top-3 left-3">
                        <span class="px-3 py-1 bg-slate-950/80 backdrop-blur-sm border border-slate-700 text-[10px] font-bold text-cyan-400 rounded-lg uppercase tracking-widest">
                            ${game.category}
                        </span>
                    </div>
                </div>
                <div class="p-5">
                    <h3 class="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">${game.title}</h3>
                    <p class="text-slate-400 text-sm line-clamp-2 leading-relaxed">${game.description}</p>
                    <div class="mt-4 flex items-center justify-between">
                        <span class="text-cyan-500 font-bold text-sm flex items-center group-hover:translate-x-1 transition-transform">
                            PLAY NOW 
                            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Global functions for inline onclick
window.setCategory = (cat) => {
    currentCategory = cat;
    renderCategories();
    renderGallery();
};

window.openGame = (id) => {
    const game = games.find(g => g.id === id);
    if (!game) return;
    
    selectedGame = game;
    homeSection.classList.add('hidden');
    gameViewSection.classList.remove('hidden');
    
    gameIframe.src = game.iframeUrl;
    gameInfo.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2 space-y-4">
                <h2 class="text-4xl font-black text-white">${game.title}</h2>
                <div class="flex space-x-2">
                    <span class="px-3 py-1 bg-cyan-600 text-white text-[10px] font-bold rounded-md uppercase tracking-wider">${game.category}</span>
                    <span class="px-3 py-1 bg-slate-800 text-slate-400 text-[10px] font-bold rounded-md uppercase tracking-wider">UNBLOCKED</span>
                </div>
                <p class="text-slate-400 text-lg leading-relaxed">${game.description}</p>
            </div>
        </div>
    `;
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Event Listeners
searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderGallery();
});

logo.addEventListener('click', () => {
    searchQuery = '';
    searchInput.value = '';
    currentCategory = 'All';
    selectedGame = null;
    gameViewSection.classList.add('hidden');
    homeSection.classList.remove('hidden');
    gameIframe.src = '';
    renderCategories();
    renderGallery();
});

backBtn.addEventListener('click', () => {
    selectedGame = null;
    gameViewSection.classList.add('hidden');
    homeSection.classList.remove('hidden');
    gameIframe.src = '';
    renderGallery();
});

fullscreenBtn.addEventListener('click', () => {
    if (gameIframe.requestFullscreen) {
        gameIframe.requestFullscreen();
    } else if (gameIframe.webkitRequestFullscreen) {
        gameIframe.webkitRequestFullscreen();
    } else if (gameIframe.msRequestFullscreen) {
        gameIframe.msRequestFullscreen();
    }
});

clearFiltersBtn.addEventListener('click', () => {
    searchQuery = '';
    searchInput.value = '';
    currentCategory = 'All';
    renderCategories();
    renderGallery();
});

// Start app
init();