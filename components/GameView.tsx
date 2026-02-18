
import React, { useState } from 'react';
import { Game } from '../types';

interface GameViewProps {
  game: Game;
  onBack: () => void;
}

const GameView: React.FC<GameViewProps> = ({ game, onBack }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const iframe = document.getElementById('game-frame');
    if (iframe) {
      if (!document.fullscreenElement) {
        iframe.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="animate-slideUp flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center text-slate-400 hover:text-white font-bold transition-colors group"
        >
          <svg className="w-6 h-6 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          BACK TO GAMES
        </button>

        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleFullscreen}
            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors"
            title="Fullscreen"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
        </div>
      </div>

      <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-800">
        <iframe
          id="game-frame"
          src={game.iframeUrl}
          className="w-full h-full border-0"
          title={game.title}
          allowFullScreen
          allow="autoplay; fullscreen"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-4xl font-black text-white">{game.title}</h2>
          <div className="flex space-x-2">
            <span className="px-3 py-1 bg-cyan-600 text-white text-xs font-bold rounded-md uppercase">
              {game.category}
            </span>
            <span className="px-3 py-1 bg-slate-800 text-slate-300 text-xs font-bold rounded-md uppercase">
              UNBLOCKED
            </span>
          </div>
          <p className="text-slate-400 text-lg leading-relaxed">
            {game.description}
          </p>
        </div>

        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h4 className="font-bold text-white uppercase tracking-wider text-sm">How to Play</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-start">
              <span className="w-5 h-5 bg-cyan-900/50 text-cyan-400 flex items-center justify-center rounded-md mr-3 text-xs flex-shrink-0">1</span>
              Wait for the game to load in the viewer above.
            </li>
            <li className="flex items-start">
              <span className="w-5 h-5 bg-cyan-900/50 text-cyan-400 flex items-center justify-center rounded-md mr-3 text-xs flex-shrink-0">2</span>
              Most games use WASD or Arrow keys to control.
            </li>
            <li className="flex items-start">
              <span className="w-5 h-5 bg-cyan-900/50 text-cyan-400 flex items-center justify-center rounded-md mr-3 text-xs flex-shrink-0">3</span>
              Use Fullscreen mode for the best immersive experience.
            </li>
          </ul>
          
          <div className="pt-4 border-t border-slate-800">
            <button className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-900/20 transition-all active:scale-95">
              FAVORITE GAME
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameView;
