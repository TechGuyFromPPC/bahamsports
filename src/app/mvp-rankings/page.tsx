'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function MVPRankings() {
  const [sport, setSport] = useState('Basketball');
  
  const rankings: Record<string, any[]> = {
    'Basketball': [
      { rank: 1, player: "Marck Balcorta", slug: "marck-balcorta", team: "Bancao-Bancao Shooters", ppg: 23.9 },
      { rank: 2, player: "John Doe", slug: "john-doe", team: "Bancao-Bancao Shooters", ppg: 21.2 },
    ],
    'Volleyball': [
      { rank: 1, player: "Sarah Santos", slug: "sarah-santos", team: "Coastal Spikers", avg: 15.4 },
    ]
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 border-l-4 border-yellow-500 pl-6">
          <h1 className="text-5xl font-black uppercase italic tracking-tighter">MVP Tracker</h1>
          <p className="text-white/60 tracking-widest uppercase text-sm">League-Wide Player Standings</p>
        </div>

        {/* Sport Selector */}
        <div className="flex gap-4 mb-8">
          {Object.keys(rankings).map(s => (
            <button 
              key={s} 
              onClick={() => setSport(s)}
              className={`px-6 py-2 rounded-lg font-bold uppercase text-sm transition-all ${sport === s ? 'bg-yellow-500 text-black' : 'bg-white/5 hover:bg-white/10'}`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Professional Table */}
        <div className="bg-[#1a0000] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-12 gap-4 p-6 border-b border-white/10 bg-black/20 text-white/40 uppercase text-xs font-bold tracking-widest">
            <div className="col-span-2">Rank</div>
            <div className="col-span-6">Player</div>
            <div className="col-span-4 text-right">Points / Avg</div>
          </div>

          {rankings[sport].map((p) => (
            <Link 
              key={p.rank} 
              href={`/basketball/players/${p.slug}`}
              className="grid grid-cols-12 gap-4 p-6 items-center border-b border-white/5 hover:bg-yellow-500/10 transition-colors group"
            >
              <div className="col-span-2 text-2xl font-black text-white/20 group-hover:text-yellow-500 transition-colors">#{p.rank}</div>
              <div className="col-span-6">
                <p className="font-bold text-lg group-hover:text-yellow-500">{p.player}</p>
                <p className="text-xs text-white/40 uppercase tracking-widest">{p.team}</p>
              </div>
              <div className="col-span-4 text-right text-xl font-black text-yellow-500">
                {p.ppg || p.avg}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}