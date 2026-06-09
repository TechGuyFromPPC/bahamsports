'use client';
import { supabase } from '@/lib/supabaseClient';

export default function AddMatchStatsForm({ playerId }: { playerId: number }) {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // 1. Insert the new match result
    await supabase.from('match_stats').insert({
      player_id: playerId,
      tournament_id: parseInt(formData.get('tournament_id') as string),
      kills: parseInt(formData.get('kills') as string),
      assists: parseInt(formData.get('assists') as string),
      hero_used: formData.get('hero'),
    });

    alert('Match stats added and totals updated!');
    window.location.reload(); // Refresh to see new totals
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/5 p-6 rounded-xl border border-white/10 space-y-4">
      <h3 className="font-bold text-yellow-500 uppercase">Log New Match Stats</h3>
      
      <input name="tournament_id" type="number" placeholder="Tournament ID" className="w-full bg-black p-2 rounded" required />
      <input name="hero" placeholder="Hero Used" className="w-full bg-black p-2 rounded" required />
      <input name="kills" type="number" placeholder="Kills in this match" className="w-full bg-black p-2 rounded" required />
      <input name="assists" type="number" placeholder="Assists in this match" className="w-full bg-black p-2 rounded" required />
      
      <button type="submit" className="w-full bg-yellow-500 text-black font-bold py-2 rounded">Submit Match Stats</button>
    </form>
  );
}