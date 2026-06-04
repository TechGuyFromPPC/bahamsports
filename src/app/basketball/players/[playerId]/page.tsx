'use client';
import { useParams } from 'next/navigation';

export default function PlayerProfile() {
  const { playerId } = useParams();

  // Mock data - in a real app, you would fetch this from Supabase
  const player = {
    name: "Marck Balcorta",
    team: "Shooters",
    number: "#8",
    position: "Forward",
    stats: { ppg: 23.9, rpg: 6.7, apg: 0.0, bpg: 0.0, spg: 0.0 },
    tournaments: ["Summer Cup 2026", "City League 2026"],
    matches: [
      { date: "June 02", opponent: "Pirates", result: "W", pts: 28, ast: 7 },
      { date: "June 05", opponent: "Dunkers", result: "L", pts: 21, ast: 2 }
    ]
  };

  return (
    <div className="min-h-screen bg-[#1a0000] p-8 text-white">
      {/* Header Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Image */}
        <div className="lg:col-span-1">
          <img src="https://images.unsplash.com/photo-1546519638-68e109498ffc" alt={player.name} className="w-full h-96 object-cover rounded-2xl border-2 border-baham-yellow/30" />
          <h1 className="text-4xl font-black uppercase italic mt-4">{player.name}</h1>
          <p className="text-baham-yellow font-bold text-lg">{player.number} | {player.team}, {player.position}</p>
        </div>

        {/* Right: Data Cards */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#2d0000] p-6 rounded-2xl border border-white/10">
            <h2 className="text-baham-yellow font-bold uppercase mb-4">Season Stats (2026)</h2>
            <div className="grid grid-cols-5 gap-4 text-center">
              {Object.entries(player.stats).map(([key, val]) => (
                <div key={key}>
                  <div className="text-xs opacity-60 uppercase">{key}</div>
                  <div className="text-2xl font-black">{val}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#2d0000] p-6 rounded-2xl border border-white/10">
            <h2 className="text-baham-yellow font-bold uppercase mb-4">Tournament Participation</h2>
            <ul className="list-disc ml-5 space-y-1">
              {player.tournaments.map(t => <li key={t}>{t}</li>)}
            </ul>
          </div>
        </div>
      </div>

      {/* Recent Matches Table */}
      <div className="mt-8 bg-[#2d0000] p-6 rounded-2xl border border-white/10">
        <h2 className="text-xl font-bold mb-4 uppercase text-baham-yellow">Recent Matches</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead><tr className="text-white/50 border-b border-white/10"><th>Date</th><th>Opponent</th><th>Result</th><th>PTS</th><th>AST</th></tr></thead>
            <tbody>
              {player.matches.map((m, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-3">{m.date}</td>
                  <td>vs {m.opponent}</td>
                  <td className={m.result === 'W' ? 'text-green-500' : 'text-red-500'}>{m.result}</td>
                  <td>{m.pts}</td>
                  <td>{m.ast}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}