'use client';

import Link from 'next/link';

export default function TournamentDashboard() {
  // Demo Data - Replace with database fetch later
  const tournament = {
    name: "Baham Sports League 2026",
    teams: [
      { name: "Bancao-Bancao Shooters" },
      { name: "San Pedro Pirates" },
      { name: "Sta. Monica Dunkers" }
    ],
    games: [
      { home: "Bancao-Bancao Shooters", away: "Sta. Monica Dunkers", date: "June 05, 2026" },
      { home: "San Pedro Pirates", away: "Bancao-Bancao Shooters", date: "June 12, 2026" }
    ]
  };

  return (
    <div className="min-h-screen bg-[#1a0000] p-8 text-white">
      <h1 className="text-4xl font-black uppercase italic text-baham-yellow mb-8">
        {tournament.name}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Participating Teams */}
        <div className="md:col-span-1 bg-[#2d0000] p-6 rounded-2xl border border-white/10">
          <h2 className="text-xl font-bold mb-6 uppercase">Teams</h2>
          {tournament.teams.map((team) => (
            <Link 
              key={team.name}
              href={`/basketball/teams/${team.name.toLowerCase().replace(/ /g, '-')}`}
              className="block mb-4 p-4 bg-black/20 rounded-lg hover:bg-baham-yellow/10 transition-colors border border-white/5"
            >
              {team.name}
            </Link>
          ))}
        </div>

        {/* Upcoming Games */}
        <div className="md:col-span-2 bg-[#2d0000] p-6 rounded-2xl border border-white/10">
          <h2 className="text-xl font-bold mb-6 uppercase">Upcoming Games</h2>
          {tournament.games.map((game, i) => (
            <div key={i} className="flex justify-between items-center bg-black/30 p-4 rounded-xl mb-4 border border-white/5">
              <span>{game.home} vs {game.away}</span>
              <span className="text-baham-yellow font-mono">{game.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}