'use client';
import { useEffect, useState, use } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default function TeamProfile({ params }: { params: Promise<{ id: string }> }) {
  const [team, setTeam] = useState<any>(null);
  const [players, setPlayers] = useState<any[]>([]);
  const { id } = use(params);

 // Inside src/app/pickleball/teams/[id]/page.tsx

useEffect(() => {
  async function fetchData() {
    if (!id) return;
    
    // 1. Fetch the team profile
    const { data: teamData } = await supabase
      .from('teams')
      .select('*')
      .eq('id', id)
      .single();
    setTeam(teamData);

    // 2. UPDATED LOGIC: Fetch players for this specific team AND sport
    // This ensures no basketball players accidentally show up here
    const { data: playerData } = await supabase
      .from('players')
      .select('id, full_name')
      .eq('team_id', id)
      .eq('sport', 'pickleball'); // <--- ADD THIS LINE
      
    setPlayers(playerData || []);
  }
  fetchData();
}, [id]);

  if (!team) return <p className="p-20 text-neutral-500">Loading team profile...</p>;

  return (
    <main className="min-h-screen bg-neutral-950 p-8 md:p-20 text-white">
      <header className="mb-12 border-b border-white/10 pb-8">
        <h1 className="text-6xl font-extrabold italic tracking-tighter text-yellow-500">{team.name}</h1>
        <p className="text-white/40 mt-2 uppercase tracking-widest text-sm font-semibold">Official Team Roster</p>
      </header>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Roster Section */}
        <section className="bg-neutral-900 p-8 rounded-3xl border border-white/10">
          <h2 className="text-xl font-bold mb-6 tracking-widest uppercase text-white/60">Players</h2>
          {players.length > 0 ? (
            <ul className="space-y-4">
           {players.map((player) => (
  <Link 
    key={player.id} 
    href={`/pickleball/players/${player.id}`} // New route
    className="flex items-center p-4 bg-neutral-800 rounded-xl border border-white/5 hover:border-yellow-500/30 transition-colors"
  >
    <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500 font-bold mr-4">
      {player.full_name.charAt(0)}
    </div>
    <span className="font-semibold hover:text-yellow-500 transition-colors">{player.full_name}</span>
  </Link>
))}
            </ul>
          ) : (
            <p className="text-white/40 italic">No players assigned yet.</p>
          )}
        </section>

        {/* Stats Summary Section */}
        <section className="bg-neutral-900 p-8 rounded-3xl border border-white/10">
          <h2 className="text-xl font-bold mb-6 tracking-widest uppercase text-white/60">Quick Stats</h2>
          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 bg-neutral-800 rounded-xl border border-white/5 text-center">
                <div className="text-3xl font-black text-yellow-500">{players.length}</div>
                <div className="text-xs text-white/40 uppercase">Total Players</div>
             </div>
             <div className="p-4 bg-neutral-800 rounded-xl border border-white/5 text-center">
                <div className="text-3xl font-black text-white">2</div>
                <div className="text-xs text-white/40 uppercase">Matches</div>
             </div>
          </div>
        </section>
      </div>
    </main>
  );
}