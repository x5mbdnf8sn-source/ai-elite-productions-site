
import React from 'react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onClick: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-900/20 hover:border-cyan-500/50"
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
          <span className="px-3 py-1 bg-slate-950/80 backdrop-blur-sm border border-slate-700 text-[10px] font-bold text-cyan-400 rounded-full uppercase tracking-widest">
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
          <div className="flex -space-x-1">
             {/* Simple visual indicator of popularity */}
             {[1, 2, 3, 4, 5].map(i => (
               <svg key={i} className={`w-3 h-3 ${i <= 4 ? 'text-yellow-500' : 'text-slate-700'} fill-current`} viewBox="0 0 20 20">
                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
               </svg>
             ))}
          </div>
          <span className="text-cyan-500 font-bold text-sm flex items-center group-hover:translate-x-1 transition-transform">
            PLAY NOW 
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-1 bg-cyan-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
    </div>
  );
};

export default GameCard;
