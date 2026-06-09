'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function UpdateStatsForm({ playerId }: { playerId: number }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const { error } = await supabase
      .from('players')
      .update({
        most_used_hero: formData.get('hero'),
        total_kills: parseInt(formData.get('kills') as string),
        total_assists: parseInt(formData.get('assists') as string),
        kill_participation: parseFloat(formData.get('kp') as string),
      })
      .eq('id', playerId);

    if (!error) alert('Stats updated successfully!');
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/5 p-6 rounded-xl border border-white/10 space-y-4">
      <h3 className="font-bold uppercase tracking-widest text-yellow-500">Update Match Stats</h3>
      <input name="hero" placeholder="Most Used Hero" className="w-full bg-black p-2 rounded" required />
      <input name="kills" type="number" placeholder="Total Kills" className="w-full bg-black p-2 rounded" required />
      <input name="assists" type="number" placeholder="Total Assists" className="w-full bg-black p-2 rounded" required />
      <input name="kp" type="number" step="0.01" placeholder="Kill Participation %" className="w-full bg-black p-2 rounded" required />
      <button 
        type="submit" 
        className="w-full bg-yellow-500 text-black font-bold py-2 rounded hover:bg-yellow-400 transition"
        disabled={loading}
      >
        {loading ? 'Updating...' : 'Save Stats'}
      </button>
    </form>
  );
}