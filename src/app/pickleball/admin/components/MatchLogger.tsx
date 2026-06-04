'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function MatchLogger() {
  const [teams, setTeams] = useState<any[]>([]);
  const [winnerId, setWinnerId] = useState('');
  const [loserId, setLoserId] = useState('');

  useEffect(() => {
    supabase.from('teams').select('id, name').eq('sport', 'pickleball').then(({ data }) => setTeams(data || []));
  }, []);

  async function logMatch() {
    const { error } = await supabase.from('matches').insert([{ winner_team_id: winnerId, loser_team_id: loserId, sport: 'pickleball' }]);
    if (!error) alert("Match Saved!");
  }

  return (
    <div className="flex gap-4 items-end">
      <select onChange={(e) => setWinnerId(e.target.value)} className="bg-neutral-800 p-3 rounded flex-1">
        <option value="">Winner</option>
        {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
      </select>
      <select onChange={(e) => setLoserId(e.target.value)} className="bg-neutral-800 p-3 rounded flex-1">
        <option value="">Loser</option>
        {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
      </select>
      <button onClick={logMatch} className="bg-yellow-500 text-black px-6 py-3 rounded font-bold">Log Match</button>
    </div>
  );
}