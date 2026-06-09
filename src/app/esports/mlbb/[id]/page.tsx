'use client';
import { useState, useEffect, use } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default function MLBBTournamentProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState('Teams Participating');
  const [tournament, setTournament] = useState<any>(null);
  const [teams, setTeams] = useState<any[]>([]);

  useEffect(() => {
  async function fetchTournamentData() {
    console.log("Fetching for ID:", id); // 1. Verify the ID is what you expect

    // 2. Remove .single() and select all columns to rule out syntax errors
    const response = await supabase
      .from('tournaments')
      .select('*')
      .eq('id', id);

    console.log("Raw Supabase Response:", response); // 3. Inspect this in the F12 Console

    if (response.error) {
      console.error("Detailed Supabase Error:", JSON.stringify(response.error, null, 2));
      return;
    }

    if (response.data && response.data.length > 0) {
      setTournament(response.data[0]); // Get the first item manually
    } else {
      console.warn("No tournament found with this ID.");
    }

    // 4. Fetch Teams
    const { data: teamData, error: teamError } = await supabase
      .from('teams')
      .select('*')
      .eq('tournament_id', id);
      
    if (teamError) {
      console.error("Teams Fetch Error:", teamError);
    } else {
      setTeams(teamData || []);
    }
  }
  
  if (id) fetchTournamentData();
}, [id]);

const tabs = [
  'Teams Participating', 
  'Game Schedule', 
  'Standings', 
  'Playoffs', 
  'Live Games', 
  'Previous Matches', 
  'Leaderboards' // Add this
];

  // Hardcoded Demo Brackets Structure (Handling 12 Teams)
  const playoffRounds = [
    {
      title: "Round 1 (Wildcard)",
      matches: [
        { teamA: 'Toto & Friends', teamB: 'Kurimoy', scoreA: 2, scoreB: 1, winner: 'Toto & Friends' },
        { teamA: 'Unknown', teamB: 'CNC', scoreA: 1, scoreB: 2, winner: 'CNC' },
        { teamA: 'Import-sports', teamB: 'NRNT', scoreA: 2, scoreB: 0, winner: 'Import-sports' },
        { teamA: 'Walang No. choice', teamB: '---', scoreA: 1, scoreB: 0, winner: 'Walang No. choice' }, // Handle odd numbers / no opponent
      ]
    },
    {
      title: "Quarterfinals (Top 8)",
      matches: [
        { teamA: 'Team Batang F ( )', teamB: 'Toto & Friends', scoreA: 2, scoreB: 0, winner: 'Team Batang F ( )' },
        { teamA: '5 little Mongkeys ( )', teamB: 'CNC', scoreA: 2, scoreB: 1, winner: '5 little Mongkeys ( )' },
        { teamA: 'Sacma Deck ( )', teamB: 'Import-sports', scoreA: 1, scoreB: 2, winner: 'Import-sports' },
        { teamA: 'Zone 1 E-Youths ( )', teamB: 'Walang No. choice', scoreA: 2, scoreB: 0, winner: 'Zone 1 E-Youths ( )' },
      ]
    },
    {
      title: "Semifinals (Top 4)",
      matches: [
        { teamA: 'Team Batang F ( )', teamB: '5 little Mongkeys ( )', scoreA: 2, scoreB: 0, winner: 'Team Batang F ( )' },
        { teamA: 'Import-sports', teamB: 'Zone 1 E-Youths ( )', scoreA: 0, scoreB: 2, winner: 'Zone 1 E-Youths ( )' },
      ]
    },
    {
      title: "Grand Finals",
      matches: [
        { teamA: 'Team Batang F ( )', teamB: 'Zone 1 E-Youths ( )', scoreA: 2, scoreB: 1, winner: 'Team Batang F ( )' },
      ]
    }
  ];

  const grandChampion = "Team Batang F ( )";
  const finalPrizePool = tournament?.prize_pool || "₱50,000";

  return (
    <main className="min-h-screen p-8 md:p-20 text-white">
      {/* Header Info */}
      <h1 className="text-5xl font-black italic mb-6 uppercase">
        {tournament ? tournament.name : "LOADING..."}
      </h1>

      <div className="mb-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/5 p-4 rounded-lg border border-white/5">
          <p className="text-white/40 text-[10px] uppercase font-bold">Dates</p>
          <p className="font-bold">{tournament?.start_date || '--'} to {tournament?.end_date || '--'}</p>
        </div>
        <div className="bg-white/5 p-4 rounded-lg border border-white/5">
          <p className="text-white/40 text-[10px] uppercase font-bold">Location</p>
          <p className="font-bold">{tournament?.location || "TBA"}</p>
        </div>
        <div className="bg-white/5 p-4 rounded-lg border border-white/5">
          <p className="text-white/40 text-[10px] uppercase font-bold">Prize Pool</p>
          <p className="font-bold text-yellow-500">{tournament?.prize_pool || "TBA"}</p>
        </div>
      </div>
      
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
                href={`/esports/mlbb/teams/${team.id}`}
                className="flex justify-between p-4 border border-white/5 rounded-xl hover:bg-yellow-500/10 hover:border-yellow-500/50 transition-all cursor-pointer"
              >
                <span className="font-bold text-lg">{team.name}</span>
                <span className="text-white/40 text-sm italic">View Roster</span>
              </Link>
            )) : <p className="text-white/50">No teams registered for this tournament yet.</p>}
          </div>
        )}
        

        {activeTab === 'Leaderboards' && (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 overflow-x-auto">
    <h2 className="text-3xl font-black italic mb-8 uppercase text-yellow-500">Tournament Leaderboard</h2>
    <table className="w-full text-left">
      <thead>
        <tr className="text-white/40 text-[10px] uppercase tracking-widest border-b border-white/10">
          <th className="p-4">Player</th>
          <th className="p-4">Kills</th>
          <th className="p-4">Assists</th>
          <th className="p-4">KDA</th>
          <th className="p-4">Dmg Recv</th>
          <th className="p-4">Kill Part.</th>
        </tr>
      </thead>
      <tbody className="text-sm">
        {[
          { name: "Justin Sumalapao", kills: 28, assists: 15, kda: "8.6", dmgRecv: 45200, kp: "78%" },
          { name: "Andrei Amada", kills: 24, assists: 12, kda: "7.2", dmgRecv: 38100, kp: "72%" },
          { name: "Xian Magallanes", kills: 18, assists: 20, kda: "6.5", dmgRecv: 41000, kp: "65%" },
          { name: "Steven Factor", kills: 15, assists: 7, kda: "4.1", dmgRecv: 32000, kp: "58%" },
          { name: "Christian Tomines", kills: 12, assists: 30, kda: "5.8", dmgRecv: 55000, kp: "55%" },
        ].map((p, i) => (
          <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
            <td className="p-4 font-bold">{p.name}</td>
            <td className="p-4 font-mono">{p.kills}</td>
            <td className="p-4 font-mono">{p.assists}</td>
            <td className="p-4 font-mono text-yellow-500 font-bold">{p.kda}</td>
            <td className="p-4 font-mono">{p.dmgRecv.toLocaleString()}</td>
            <td className="p-4 font-mono">{p.kp}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
        {/* Playoff Bracket Tab */}
        {activeTab === 'Playoffs' && (
          <div>
            <h2 className="text-3xl font-black italic mb-8 uppercase text-yellow-500">PLAYOFF BRACKET</h2>
            
            <div className="overflow-x-auto flex gap-10 items-start">
              {playoffRounds.map((round, roundIndex) => (
                <div key={roundIndex} className="flex-none w-[300px]">
                  <h3 className="text-center font-bold text-white/40 mb-4 tracking-wider uppercase text-[12px]">{round.title}</h3>
                  <div className="grid gap-6">
                    {round.matches.map((match, matchIndex) => (
                      <div key={matchIndex} className="bg-white/5 border border-white/10 p-4 rounded-xl relative">
                        {/* Match Connector Line (To previous round) */}
                        {roundIndex > 0 && (
                          <div className="absolute left-[-20px] top-[50%] h-0.5 w-[20px] bg-white/10"></div>
                        )}
                        
                        {/* Match Connector Line (To next round) */}
                        {roundIndex < playoffRounds.length - 1 && matchIndex % 2 === 0 && (
                          <div className="absolute right-[-20px] top-[50%] h-[calc(100%+2.5rem)] w-[20px] border-r-2 border-t-2 border-white/10 rounded-tr-lg"></div>
                        )}
                        {roundIndex < playoffRounds.length - 1 && matchIndex % 2 !== 0 && (
                          <div className="absolute right-[-20px] top-[-50%] h-[calc(100%+2.5rem)] w-[20px] border-r-2 border-b-2 border-white/10 rounded-br-lg"></div>
                        )}

                        {/* Team A */}
                        <div className={`flex justify-between p-2 rounded ${match.winner === match.teamA ? 'bg-green-500/10' : ''}`}>
                          <span className={`font-bold ${match.winner === match.teamA ? 'text-green-500' : 'text-white'}`}>{match.teamA}</span>
                          <span className="font-bold text-yellow-500">{match.scoreA}</span>
                        </div>
                        {/* Team B */}
                        <div className={`flex justify-between p-2 rounded ${match.winner === match.teamB ? 'bg-green-500/10' : ''}`}>
                          <span className={`font-bold ${match.winner === match.teamB ? 'text-green-500' : 'text-white'}`}>{match.teamB}</span>
                          <span className="font-bold text-yellow-500">{match.scoreB}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              
              
              {/* Grand Champion Finale Section */}
              <div className="flex-none text-center bg-white/5 border border-yellow-500/30 p-8 rounded-3xl mt-12">
                <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-1">GRAND CHAMPIONS</p>
                <div className="text-6xl text-yellow-500 mb-6">🏆</div>
                <h3 className="text-3xl font-black italic uppercase text-yellow-500">{grandChampion}</h3>
                <p className="text-sm font-bold text-white/60 mt-2">Winner's Prize: {finalPrizePool}</p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'Previous Matches' && (
  <div className="grid gap-6">
    <h3 className="text-xl font-bold uppercase tracking-widest text-white/50 mb-2">Grand Finals (BO3)</h3>
    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
      <div className="flex justify-between items-center mb-6">
        <span className="text-2xl font-black">Team Batang F <span className="text-yellow-500">2</span></span>
        <span className="text-white/30 italic">VS</span>
        <span className="text-2xl font-black">Zone 1 E-Youths <span className="text-yellow-500">1</span></span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((game) => (
          <Link 
            key={game} 
            href={`/esports/mlbb/matches/grand-final-game-${game}`} // Dynamic route to match detail
            className="border border-white/10 p-4 rounded-xl hover:border-yellow-500 transition-all text-center group"
          >
            <p className="text-[10px] font-bold text-white/40 uppercase mb-2">Game {game}</p>
            <p className="font-black text-lg group-hover:text-yellow-500">View Details</p>
          </Link>
        ))}
      </div>
    </div>
  </div>
)}
      </div>
    </main>
  );
}