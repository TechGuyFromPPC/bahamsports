import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default async function ManageTeams({ params }: { params: { id: string } }) {
  const { id } = await params;

  const { data: tournament } = await supabase
    .from('tournaments')
    .select('name, teams(*, players(*))')
    .eq('id', id)
    .single();

    if (!tournament) {
    return <div className="p-20 text-white">Tournament not found.</div>;
  }
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-black uppercase italic">{tournament.name} - Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tournament.teams.map((team: any) => (
          <div key={team.id} className="bg-white/5 border border-white/10 p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-4">{team.name}</h2>
            <div className="space-y-2">
              {team.players.map((player: any) => (
                <div key={player.id} className="flex justify-between items-center bg-black/40 p-3 rounded">
                  <span>{player.full_name}</span>
                  <Link 
                    href={`/admin/mlbb/players/${player.id}/edit`}
                    className="text-[10px] bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded"
                  >
                    Edit Stats
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}