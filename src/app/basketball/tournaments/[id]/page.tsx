'use client';
import { useParams } from 'next/navigation';
import { demoTournaments } from '@/lib/demo-data';

export default function TournamentPage() {
  const params = useParams();
  // Ensure we are grabbing the correct ID from the URL
  const id = params.id as string; 
  
  // Look up the tournament in our demo data
  const tournament = demoTournaments[id as keyof typeof demoTournaments];

  // If the ID in the URL doesn't match our data, show an error
  if (!tournament) {
    return (
      <div className="p-8 text-white">
        <h1>Tournament not found!</h1>
        <p>You tried to access ID: {id}</p>
      </div>
    );
  }

  // Render the actual data
  return (
    <div className="min-h-screen bg-[#1a0000] p-8 text-white">
      <h1 className="text-4xl font-black uppercase italic text-baham-yellow mb-8">
        {tournament.name}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 bg-[#2d0000] p-6 rounded-2xl border border-white/10">
          <h2 className="text-xl font-bold mb-6 uppercase">Teams</h2>
          {tournament.teams.map((team) => (
            <div key={team} className="block mb-4 p-4 bg-black/20 rounded-lg">
              {team}
            </div>
          ))}
        </div>

        <div className="md:col-span-2 bg-[#2d0000] p-6 rounded-2xl border border-white/10">
          <h2 className="text-xl font-bold mb-6 uppercase">Upcoming Games</h2>
          {tournament.games.map((game, i) => (
            <div key={i} className="flex justify-between items-center bg-black/30 p-4 rounded-xl border border-white/5">
              <span>{game.home} vs {game.away}</span>
              <span className="text-baham-yellow font-mono">{game.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}