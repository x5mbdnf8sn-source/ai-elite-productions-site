import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import GameCard from './components/GameCard';
import GameView from './components/GameView';
import CategoryBar from './components/CategoryBar';

export const CATEGORIES = ['All', 'Action', 'Sports', 'Puzzle', 'Strategy', 'Arcade', 'Multiplayer'];

const App = () => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('./games.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error('Failed to load games:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [games, searchQuery, selectedCategory]);

  const handleLogoClick = () => {
    setSelectedGame(null);
    setSelectedCategory('All');
    setSearchQuery('');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-xl font-bold tracking-widest text-cyan-400">LOADING ELITE...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        onLogoClick={handleLogoClick}
      />

      <main className="flex-grow container mx-auto px-4 py-8">
        {selectedGame ? (
          <GameView 
            game={selectedGame} 
            onBack={() => setSelectedGame(null)} 
          />
        ) : (
          <div className="space-y-8 animate-fadeIn">
            <header className="text-center space-y-4">
              <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 tracking-tighter">
                ELITE PRODUCTIONS
              </h1>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                The premium unblocked gaming portal. Fast, curated, and always available.
              </p>
            </header>

            <CategoryBar 
              categories={CATEGORIES}
              selectedCategory={selectedCategory} 
              setSelectedCategory={setSelectedCategory} 
            />

            {filteredGames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGames.map(game => (
                  <GameCard 
                    key={game.id} 
                    game={game} 
                    onClick={() => setSelectedGame(game)} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-800">
                <p className="text-slate-500 text-xl">No games found matching your search.</p>
                <button 
                  onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
                  className="mt-4 text-cyan-400 hover:text-cyan-300 font-bold"
                >
                  CLEAR ALL FILTERS
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="bg-slate-900 border-t border-slate-800 py-10 px-4 mt-auto">
        <div className="container mx-auto text-center">
          <h3 className="text-xl font-black text-white mb-2">ELITE PRODUCTIONS</h3>
          <p className="text-slate-500 text-sm mb-6">Unblocked entertainment for everyone.</p>
          <div className="text-slate-600 text-[10px] uppercase tracking-[0.2em]">
            &copy; {new Date().getFullYear()} Elite Productions • All Rights Reserved
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;