'use client';
import Link from 'next/link';

export default function LiveGamesPage() {
  // In a real scenario, this data would come from your database (e.g., Supabase)
  const allGames = [
    { id: '1', sport: 'Basketball', home: 'Shooters', away: 'Pirates', score: '84-78', live: true },
    { id: '2', sport: 'Pickleball', home: 'Team A', away: 'Team B', score: '0-0', live: false },
    { id: '3', sport: 'Volleyball', home: 'Spikers', away: 'Blockers', score: '2-1', live: true },
  ];

  const liveGames = allGames.filter(game => game.live);

  return (
    <main className="min-h-screen bg-[#0a0a0a] p-8 md:p-20 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-black uppercase italic mb-12">Live Now</h1>

        {liveGames.length > 0 ? (
          <div className="grid gap-6">
            {liveGames.map((game) => (
              <Link 
                key={game.id} 
                href={`/${game.sport.toLowerCase()}/live/${game.id}`}
                className="group bg-[#1a0000] border border-red-500/30 p-8 rounded-3xl flex items-center justify-between hover:bg-red-900/10 transition-all"
              >
                <div>
                  <span className="text-red-500 font-bold uppercase tracking-widest text-sm">{game.sport}</span>
                  <h2 className="text-2xl font-black mt-1">{game.home} vs {game.away}</h2>
                </div>
                <div className="text-right">
                  <span className="text-4xl font-black text-red-500">{game.score}</span>
                  <div className="flex items-center gap-2 mt-2 justify-end">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    <span className="text-xs uppercase text-white/50">Live</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-white/10 rounded-3xl">
            <p className="text-white/30 text-xl font-bold uppercase tracking-widest">No games currently live</p>
          </div>
        )}
      </div>
    </main>
  );
}