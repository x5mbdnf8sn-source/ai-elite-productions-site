import React from 'react';

const GameCard = ({ game, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-900/30 hover:border-cyan-500/50"
    >
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-60"></div>
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-slate-950/80 backdrop-blur-sm border border-slate-700 text-[10px] font-bold text-cyan-400 rounded-lg uppercase tracking-widest">
            {game.category}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
          {game.title}
        </h3>
        <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">
          {game.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-cyan-500 font-bold text-sm flex items-center group-hover:translate-x-1 transition-transform">
            PLAY NOW 
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default GameCard;