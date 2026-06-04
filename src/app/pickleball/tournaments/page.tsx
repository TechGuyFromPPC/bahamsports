'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default function PickleballTournaments() {
  const [activeTab, setActiveTab] = useState('Teams Participating');
  const [tournament, setTournament] = useState<any>(null);
  const [teams, setTeams] = useState<any[]>([]);

useEffect(() => {
  async function fetchTournamentData() {
    // 1. Fetch the Tournament metadata (ID 2)
    const { data: tournamentData, error: tourneyError } = await supabase
      .from('tournaments')
      .select('*')
      .eq('id', 2)
      .single();

    if (tournamentData) {
      setTournament(tournamentData);

      // 2. Fetch Teams where tournament_id is 2
      const { data: teamData, error: teamError } = await supabase
        .from('teams') // Note: ensure this matches your table name in screenshot
        .select('*')
        .eq('tournament_id', 2); 
      
      if (teamData) {
        setTeams(teamData);
      }
    }
  }
  fetchTournamentData();
}, []);

  const tabs = ['Teams Participating', 'Game Schedule', 'Standings', 'Playoffs', 'Live Games', 'Previous Matches'];

  return (
    <main className="min-h-screen p-8 md:p-20 text-white">
      <h1 className="text-5xl font-black italic mb-2">
        {tournament ? tournament.name : "PICKLEBALL TOURNAMENT"}
      </h1>
      
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-12 border-b border-white/10 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-bold uppercase tracking-widest transition-all ${
              activeTab === tab ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-white/40 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-white/5 border border-white/10 p-8 rounded-2xl min-h-[300px]">

     {activeTab === 'Teams Participating' && (
  <div className="grid gap-4">
    {teams.length > 0 ? teams.map(team => (
      <Link 
        key={team.id} 
        href={`/pickleball/teams/${team.id}`}
        className="flex justify-between p-4 border border-white/5 rounded-xl hover:bg-yellow-500/10 hover:border-yellow-500/50 transition-all cursor-pointer"
      >
        <span className="font-bold text-lg">{team.name}</span>
        <span className="text-white/40 text-sm italic">Click to view profile</span>
      </Link>
    )) : <p className="text-white/50">No teams registered for this tournament yet.</p>}
  </div>
)}
      </div>
    </main>
  );
}