'use client';
import { useState } from 'react';

export default function AdminControlPanel() {
  const [score, setScore] = useState({ home: 84, away: 78 });

  const updateScore = (team: 'home' | 'away', delta: number) => {
    setScore(prev => ({ ...prev, [team]: Math.max(0, prev[team] + delta) }));
    // Here you would add your API call to update the database
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] p-8 text-white">
      <h1 className="text-3xl font-black mb-8">Admin Scoreboard Controller</h1>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-2xl">
        {/* Home Team Controls */}
        <div className="bg-[#1a0000] p-6 rounded-xl border border-white/10">
          <h3 className="mb-4">Home Score: {score.home}</h3>
          <div className="flex gap-2">
            <button onClick={() => updateScore('home', 1)} className="bg-yellow-500 text-black px-4 py-2 font-bold rounded">+1</button>
            <button onClick={() => updateScore('home', 2)} className="bg-yellow-500 text-black px-4 py-2 font-bold rounded">+2</button>
            <button onClick={() => updateScore('home', 3)} className="bg-yellow-500 text-black px-4 py-2 font-bold rounded">+3</button>
          </div>
        </div>
        
        {/* Away Team Controls */}
        <div className="bg-[#1a0000] p-6 rounded-xl border border-white/10">
          <h3 className="mb-4">Away Score: {score.away}</h3>
          <div className="flex gap-2">
            <button onClick={() => updateScore('away', 1)} className="bg-yellow-500 text-black px-4 py-2 font-bold rounded">+1</button>
            <button onClick={() => updateScore('away', 2)} className="bg-yellow-500 text-black px-4 py-2 font-bold rounded">+2</button>
            <button onClick={() => updateScore('away', 3)} className="bg-yellow-500 text-black px-4 py-2 font-bold rounded">+3</button>
          </div>
        </div>
      </div>
    </main>
  );
}