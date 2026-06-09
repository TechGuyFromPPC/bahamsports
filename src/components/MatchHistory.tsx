'use client';
import { supabase } from '@/lib/supabaseClient';

export default function MatchHistory({ stats, refresh }: { stats: any[], refresh: () => void }) {
  async function deleteMatch(id: number) {
    if (!confirm('Are you sure you want to delete this match record?')) return;
    await supabase.from('match_stats').delete().eq('id', id);
    refresh(); // Refresh the parent data
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden mt-8">
      <h3 className="p-4 border-b border-white/10 font-bold uppercase text-yellow-500">Match Audit Log</h3>
      <table className="w-full text-left text-sm">
        <thead className="bg-white/5 uppercase text-white/50">
          <tr>
            <th className="p-3">Hero</th>
            <th className="p-3">Kills</th>
            <th className="p-3">Assists</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((m) => (
            <tr key={m.id} className="border-b border-white/5">
              <td className="p-3 font-bold">{m.hero_used}</td>
              <td className="p-3">{m.kills}</td>
              <td className="p-3">{m.assists}</td>
              <td className="p-3">
                <button onClick={() => deleteMatch(m.id)} className="text-red-500 hover:text-red-400 font-bold">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}