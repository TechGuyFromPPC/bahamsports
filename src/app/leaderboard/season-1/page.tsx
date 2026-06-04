'use client';
import Link from 'next/link';

const standings = [
  { rank: 1, team: "Bancao-Bancao Shooters", slug: "bancao-bancao-shooters", points: 120, trend: "+10" },
  { rank: 2, team: "Sta. Monica Dunkers", slug: "sta.-monica-dunkers", points: 95, trend: "+5" },
  { rank: 3, team: "San Pedro Pirates", slug: "san-pedro-pirates", points: 40, trend: "-2" },
];

const SeasonLeaderboard = () => {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 border-l-4 border-yellow-500 pl-6">
          <h1 className="text-5xl font-black uppercase italic tracking-tighter">Season 1</h1>
          <p className="text-white/60 tracking-widest uppercase text-sm">Official League Standings</p>
        </div>

        <div className="bg-[#1a0000] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-12 gap-4 p-6 border-b border-white/10 bg-black/20 text-white/40 uppercase text-xs font-bold tracking-widest">
            <div className="col-span-2">Rank</div>
            <div className="col-span-6">Team</div>
            <div className="col-span-2">Trend</div>
            <div className="col-span-2 text-right">Points</div>
          </div>

          {standings.map((t) => (
            <Link 
              key={t.rank} 
              href={`/basketball/teams/${t.slug}`} 
              className="grid grid-cols-12 gap-4 p-6 items-center border-b border-white/5 hover:bg-yellow-500/10 transition-colors group"
            >
              <div className="col-span-2 text-3xl font-black text-white/20 group-hover:text-yellow-500 transition-colors">#{t.rank}</div>
              <div className="col-span-6 font-bold text-lg group-hover:text-yellow-500">{t.team}</div>
              <div className="col-span-2 text-green-500 text-sm font-mono">{t.trend}</div>
              <div className="col-span-2 text-right text-xl font-black text-yellow-500">{t.points}</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default SeasonLeaderboard;