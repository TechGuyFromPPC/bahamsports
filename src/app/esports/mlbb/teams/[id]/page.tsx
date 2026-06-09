// src/app/esports/mlbb/teams/[id]/page.tsx
import { supabase } from '@/lib/supabaseClient';

import Link from 'next/link';

export default async function TeamProfile({ params }: { params: { id: string } }) {
  const { id } = await params; // Get the ID from the URL

  // Fetch the specific team data
  const { data: team } = await supabase
  .from('teams')
  .select(`
    *,
    tournaments(name),
    players(*)
  `)
  .eq('id', id)
  .single();

  if (!team) return <div className="p-20 text-white">Team not found.</div>;

  return (
    <main className="min-h-screen p-8 md:p-20 text-white">

        
      <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 p-12 rounded-3xl">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center text-4xl font-black">
            {team.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tight">{team.name}</h1>
            <p className="text-yellow-500 uppercase tracking-widest text-sm font-bold">
              {team.sport} Team
            </p>
          </div>
        </div>

        <div className="mt-8">
  <h2 className="text-sm uppercase tracking-widest text-white/40 mb-4">Roster</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
   {team.players.map((player: any) => (
  <Link 
    key={player.id} 
    href={`/esports/mlbb/players/${player.id}`}
    className="p-4 bg-white/5 rounded-lg border border-white/5 hover:border-yellow-500 transition-all block"
  >
    <p className="font-bold text-lg">{player.full_name}</p>
    <p className="text-yellow-500 text-xs italic">{player.preferred_side}</p>
  </Link>
))}
  </div>
</div>

        <div className="border-t border-white/10 pt-8 mt-8">
          <h2 className="text-sm uppercase tracking-widest text-white/40 mb-4">Tournament Participation</h2>
          <p className="text-xl font-bold">{team.tournaments?.name || 'No tournament assigned'}</p>
        </div>
      </div>
    </main>
  );
}