'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function MatchCreator() {
  const [teams, setTeams] = useState<any[]>([]);
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');
  const [gameTime, setGameTime] = useState('');

  useEffect(() => {
    supabase.from('teams').select('id, name').then(({ data }) => setTeams(data || []));
  }, []);

  async function createScheduleEntry() {
    if (!teamA || !teamB || teamA === teamB) {
      alert("Select two different teams.");
      return;
    }

    const { error } = await supabase.from('schedule').insert([{
      team_a_id: teamA,
      team_b_id: teamB,
      game_time: gameTime,
      status: 'scheduled'
    }]);

    if (!error) alert("Game scheduled successfully!");
  }

  return (
    <div className="bg-neutral-800 p-6 rounded-2xl border border-white/5 space-y-4">
      <h3 className="font-bold text-lg">Create New Matchup</h3>
      <div className="grid grid-cols-2 gap-4">
        <select onChange={(e) => setTeamA(e.target.value)} className="bg-neutral-950 p-3 rounded">
          <option value="">Home Team</option>
          {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
        <select onChange={(e) => setTeamB(e.target.value)} className="bg-neutral-950 p-3 rounded">
          <option value="">Away Team</option>
          {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </div>
      <input type="datetime-local" onChange={(e) => setGameTime(e.target.value)} className="w-full bg-neutral-950 p-3 rounded" />
      <button onClick={createScheduleEntry} className="w-full bg-yellow-500 text-black font-bold p-3 rounded">Schedule Match</button>
    </div>
  );
}