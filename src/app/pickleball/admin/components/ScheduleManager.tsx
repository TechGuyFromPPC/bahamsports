'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function ScheduleManager() {
  const [schedule, setSchedule] = useState<any[]>([]);

  useEffect(() => {
    async function fetchSchedule() {
      // Fetch schedule with joined team names
      const { data } = await supabase
        .from('schedule')
        .select('*, team_a:teams!team_a_id(name), team_b:teams!team_b_id(name)')
        .eq('status', 'scheduled');
      setSchedule(data || []);
    }
    fetchSchedule();
  }, []);

  async function completeGame(game: any, winnerId: number) {
    // 1. Log result
    await supabase.from('matches').insert([{ 
      winner_team_id: winnerId, 
      loser_team_id: winnerId === game.team_a_id ? game.team_b_id : game.team_a_id,
      sport: 'pickleball'
    }]);

    // 2. Mark schedule as completed
    await supabase.from('schedule').update({ status: 'completed' }).eq('id', game.id);
    
    // Update local state to remove the completed game
    setSchedule(schedule.filter(s => s.id !== game.id));
    alert("Match finalized and added to standings!");
  }

  return (
    <div className="space-y-4">
      {schedule.length === 0 && <p className="text-white/40">No upcoming games scheduled.</p>}
      {schedule.map(game => (
        <div key={game.id} className="flex justify-between items-center p-4 bg-neutral-800 rounded-lg border border-white/10">
          <span className="font-bold">{game.team_a.name} vs {game.team_b.name}</span>
          <div className="flex gap-2">
            <button onClick={() => completeGame(game, game.team_a_id)} className="bg-green-600 text-xs px-3 py-1 rounded">Winner: A</button>
            <button onClick={() => completeGame(game, game.team_b_id)} className="bg-green-600 text-xs px-3 py-1 rounded">Winner: B</button>
          </div>
        </div>
      ))}
    </div>
  );
}