// src/app/esports/mlbb/players/[id]/page.tsx
import { supabase } from '@/lib/supabaseClient';


export default async function PlayerProfile({ params }: { params: { id: string } }) {
  const { id } = await params;
  
  // Update select query to include new fields
  const { data: player } = await supabase
    .from('players')
    .select('*, teams(name)')
    .eq('id', id)
    .single();

   // Use ?. to safely access match_stats, and || [] to ensure reduce() has an array to work with
const totalKills = player?.match_stats?.reduce((acc: number, m: any) => acc + (m.kills || 0), 0) || 0;
const totalAssists = player?.match_stats?.reduce((acc: number, m: any) => acc + (m.assists || 0), 0) || 0;
  if (!player) return <div className="p-20 text-white">Player not found.</div>;

  return (
    <main className="min-h-screen p-8 md:p-20 text-white">
      <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 p-10 rounded-3xl">
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-1">{player.full_name}</h1>
        <p className="text-yellow-500 font-bold mb-8">{player.preferred_side} | {player.teams?.name}</p>


<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Most Used Hero" value={player.most_used_hero || 'N/A'} />
        <StatCard label="Total Kills" value={player.total_kills} />
        <StatCard label="Assists" value={player.total_assists} />
        <StatCard label="Kill Participation" value={`${player.kill_participation}%`} />
      </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 p-4 rounded-xl text-center">
            <div className="text-2xl font-black">{player.dupr_rating}</div>
            <div className="text-[10px] uppercase text-white/40">Power Rating</div>
          </div>
          <div className="bg-white/5 p-4 rounded-xl text-center">
            <div className="text-2xl font-black">{player.win_rate}%</div>
            <div className="text-[10px] uppercase text-white/40">Win Rate</div>
          </div>
          <div className="bg-white/5 p-4 rounded-xl text-center">
            <div className="text-2xl font-black">{player.games_played}</div>
            <div className="text-[10px] uppercase text-white/40">Games</div>
          </div>
        </div>

        <h3 className="text-sm uppercase tracking-widest text-white/40 mb-4">Core Attributes</h3>
        <div className="flex flex-wrap gap-2">
          {player.attributes?.map((attr: string) => (
            <span key={attr} className="px-3 py-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-full text-xs font-bold">
              {attr}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}

function StatCard({ label, value }: { label: string, value: string | number }) {
  return (
    <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
      <div className="text-xl font-black text-white">{value}</div>
      <div className="text-[9px] uppercase tracking-wider text-white/40 mt-1">{label}</div>
    </div>
  );
}