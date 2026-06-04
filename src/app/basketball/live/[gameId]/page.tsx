'use client';
import { useState, useEffect } from 'react';

export default function LiveBasketballScoreboard({ params }: { params: { gameId: string } }) {
  // In a real app, you would fetch this from Supabase or a WebSocket
  const [score, setScore] = useState({ home: 84, away: 78, quarter: '4Q', time: '02:15' });

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-[#1a0000] border-2 border-yellow-500 rounded-3xl p-8 shadow-[0_0_50px_-12px_rgba(234,179,8,0.3)]">
        <div className="flex justify-between items-center text-white">
          <div className="text-center">
            <h2 className="text-xl font-bold uppercase tracking-widest text-white/50">Home</h2>
            <div className="text-8xl font-black italic">{score.home}</div>
          </div>
          
          <div className="text-center space-y-2">
            <div className="bg-yellow-500 text-black font-black px-6 py-2 rounded-lg text-2xl">{score.quarter}</div>
            <div className="text-4xl font-mono font-bold tracking-widest">{score.time}</div>
          </div>

          <div className="text-center">
            <h2 className="text-xl font-bold uppercase tracking-widest text-white/50">Away</h2>
            <div className="text-8xl font-black italic">{score.away}</div>
          </div>
        </div>
      </div>
    </main>
  );
}