'use client';
import { useState } from 'react';
import MatchResultDisplay from '@/components/MatchResultDisplay';

export default function MatchDetailPage() {
  // In a real app, this would come from the URL or database
  const [currentGame, setCurrentGame] = useState(1); 

  return (
    <main className="p-10">
      <div className="flex gap-2 mb-6">
        {[1, 2, 3].map((num) => (
          <button 
            key={num}
            onClick={() => setCurrentGame(num)}
            className={`px-6 py-2 rounded-lg font-bold ${currentGame === num ? 'bg-yellow-500 text-black' : 'bg-white/5'}`}
          >
            Game {num}
          </button>
        ))}
      </div>
      
      <MatchResultDisplay gameNumber={currentGame} />
    </main>
  );
}