'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function TeamProfilePage() {
  const { id } = useParams();

  // Mock Data
const teams: Record<string, any> = {
  "bancao-bancao-shooters": { 
    name: "Bancao-Bancao Shooters", 
    record: "2-0", coach: "Coach Juan", 
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=1200&auto=format&fit=crop",
    stats: { ppg: "102.5", def: "98.2", streak: "W2" },
    history: [{ opp: "Sta. Monica Dunkers", res: "W 105-98" }],
    upcoming: [{ opp: "San Pedro Pirates", date: "June 12" }],
    players: [{ name: "John Doe", number: "7", pos: "PG" }, { name: "Mike Smith", number: "23", pos: "SG" }]
  },
  "san-pedro-pirates": { 
    name: "San Pedro Pirates", 
    record: "0-2", coach: "Coach Pedro", 
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&auto=format&fit=crop",
    stats: { ppg: "88.4", def: "105.1", streak: "L2" },
    history: [{ opp: "Bancao-Bancao Shooters", res: "L 89-94" }],
    upcoming: [{ opp: "Bancao-Bancao Shooters", date: "June 12" }],
    players: [{ name: "Alex Cruz", number: "10", pos: "PG" }, { name: "Ben Reyes", number: "15", pos: "C" }]
  },
  "sta.-monica-dunkers": { 
    name: "Sta. Monica Dunkers", 
    record: "1-1", coach: "Coach Monica", 
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=1200&auto=format&fit=crop",
    stats: { ppg: "95.2", def: "96.5", streak: "L1" },
    history: [{ opp: "Bancao-Bancao Shooters", res: "L 98-105" }],
    upcoming: [{ opp: "San Pedro Pirates", date: "June 19" }],
    players: [{ name: "Dave Lim", number: "33", pos: "SF" }, { name: "Eric Tan", number: "21", pos: "PF" }]
  }
};

  const team = teams[id as string];
  if (!team) return <div className="p-10 text-center text-white">Team not found.</div>;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pb-20">
      {/* Hero Header */}
      <div className="relative h-64 w-full overflow-hidden mb-8">
        <img src={team.image} alt={team.name} className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        <div className="absolute bottom-8 left-8 md:left-20">
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">{team.name}</h1>
          <p className="text-yellow-500 font-bold text-lg">{team.coach} • {team.record}</p>
        </div>
      </div>

      {/* Grid Container */}
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Column: Stats & Roster */}
        <div className="md:col-span-8 space-y-8">
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(team.stats).map(([k, v]) => (
              <div key={k} className="bg-[#1a0000] border border-white/10 p-4 rounded-xl text-center">
                <p className="text-[10px] uppercase opacity-50">{k}</p>
                <p className="text-xl font-black text-yellow-500">{v as string}</p>
              </div>
            ))}
          </div>

          {/* Roster Section */}
          <section className="bg-[#1a0000] p-6 rounded-2xl border border-white/10">
            <h3 className="text-yellow-500 font-bold uppercase mb-4 text-sm tracking-widest">Active Roster</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {team.players.map((p: any, i: number) => (
                <Link key={i} href={`/basketball/players/${p.name.toLowerCase().replace(/ /g, '-')}`}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-red-900/20 transition-all border border-white/5">
                  <div className="text-xl font-black text-yellow-500 w-10">{p.number}</div>
                  <div>
                    <p className="font-bold">{p.name}</p>
                    <p className="text-xs opacity-50 uppercase">{p.pos}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Upcoming */}
        <div className="md:col-span-4 space-y-8">
          <div className="bg-[#1a0000] p-6 rounded-2xl border border-white/10">
            <h3 className="text-yellow-500 font-bold uppercase mb-4 text-sm">Upcoming Match</h3>
            {team.upcoming.map((m: any, i: number) => (
              <div key={i} className="text-center py-4">
                <p className="text-2xl font-black italic">vs {m.opp}</p>
                <p className="text-yellow-500 font-mono">{m.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}