
import React, { useState, useEffect, useMemo } from 'react';
import { Game, Category, CATEGORIES } from './types';
import Navbar from './components/Navbar';
import GameCard from './components/GameCard';
import GameView from './components/GameView';
import CategoryBar from './components/CategoryBar';

const App: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load games from JSON file
    const fetchGames = async () => {
      try {
        const response = await fetch('./games.json');
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
              <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                ELITE PRODUCTIONS
              </h1>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Discover the best premium unblocked games. Curated for performance, accessible anywhere.
              </p>
            </header>

            <CategoryBar 
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
                <p className="text-slate-500 text-xl">No games found matching your criteria.</p>
                <button 
                  onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
                  className="mt-4 text-cyan-400 hover:text-cyan-300 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="bg-slate-900 border-t border-slate-800 py-12 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-2xl font-black text-cyan-500 mb-4">ELITE</h3>
            <p className="text-slate-400 text-sm">
              Elite Productions is a community-driven gaming portal dedicated to providing high-quality, unblocked entertainment for students and gamers worldwide.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><button onClick={handleLogoClick} className="hover:text-cyan-400 transition">Home</button></li>
              <li><button className="hover:text-cyan-400 transition">Contact Us</button></li>
              <li><button className="hover:text-cyan-400 transition">Game Requests</button></li>
              <li><button className="hover:text-cyan-400 transition">Privacy Policy</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider">Connect</h4>
            <div className="flex justify-center md:justify-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-cyan-600 transition cursor-pointer">
                <span className="sr-only">Discord</span>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.196.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/></svg>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-600 transition cursor-pointer">
                <span className="sr-only">YouTube</span>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Elite Productions. All rights reserved. Not affiliated with game creators.
        </div>
      </footer>
    </div>
  );
};

export default App;
