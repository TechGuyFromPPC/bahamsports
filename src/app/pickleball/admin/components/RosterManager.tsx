'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function RosterManager() {
  const [players, setPlayers] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data: pData } = await supabase.from('players').select('*').eq('sport', 'pickleball');
      const { data: tData } = await supabase.from('teams').select('id, name').eq('sport', 'pickleball');
      setPlayers(pData || []);
      setTeams(tData || []);
    }
    fetchData();
  }, []);

  async function assignPlayer(playerId: number, teamId: string) {
    await supabase.from('players').update({ team_id: teamId }).eq('id', playerId);
    alert("Player assigned!");
  }

  return (
    <div className="space-y-4">
      {players.map(p => (
        <div key={p.id} className="flex justify-between items-center p-4 bg-neutral-800 rounded-lg">
          <span>{p.full_name}</span>
          <select onChange={(e) => assignPlayer(p.id, e.target.value)} value={p.team_id || ''} className="bg-neutral-950 p-2 rounded">
            <option value="">Select Team</option>
            {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>
      ))}
    </div>
  );
}