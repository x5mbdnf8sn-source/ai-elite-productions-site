import React from 'react';

const GameView = ({ game, onBack }) => {
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
          BACK TO HUB
        </button>

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

      <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-800">
        <iframe
          id="game-frame"
          src={game.iframeUrl}
          className="w-full h-full border-0"
          title={game.title}
          allowFullScreen
          allow="autoplay; fullscreen; pointer-lock"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-4xl font-black text-white">{game.title}</h2>
          <div className="flex space-x-2">
            <span className="px-3 py-1 bg-cyan-600 text-white text-[10px] font-bold rounded-md uppercase tracking-wider">
              {game.category}
            </span>
            <span className="px-3 py-1 bg-slate-800 text-slate-400 text-[10px] font-bold rounded-md uppercase tracking-wider">
              UNBLOCKED
            </span>
          </div>
          <p className="text-slate-400 text-lg leading-relaxed">
            {game.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameView;