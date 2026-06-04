import { createClient } from '@/lib/supabase/server';
import Link from 'next/link'; // 1. Import Link
import Standings from '@/components/Standings';

export default async function TournamentDashboard({
  searchParams,
}: {
  searchParams: { sport?: string };
}) {
  const supabase = await createClient();
  const sport = (await searchParams).sport;
  
  const { data: tournaments, error } = await supabase
    .from('tournaments')
    .select('*, teams(name)')
    .eq('sport_type', sport || 'basketball');

  if (error) {
    return <div className="p-8 text-white">Error loading data.</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-[linear-gradient(180deg,#2d0000_0%,#1a0000_100%)]">
      <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-10">
        {sport ? `${sport} Tournaments` : 'Tournaments'}
      </h1>

      <div className="space-y-6">
        {tournaments?.map((t) => (
          // 2. Wrap the card in a Link component for clickability
          <Link href={`/tournaments/${t.id}`} key={t.id} className="block group">
            <div className="backdrop-blur-md bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl transition-all hover:border-baham-yellow/50 hover:bg-white/10">
              <h2 className="text-2xl text-baham-yellow font-bold uppercase mb-4 group-hover:text-white transition-colors">
                {t.name}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black/20 p-4 rounded-lg border border-white/5">
                  <h3 className="text-white/70 text-sm font-bold uppercase mb-3">Registered Teams</h3>
                  <div className="flex flex-wrap gap-2">
                    {t.teams?.map((team: any) => (
                      <span key={team.name} className="px-3 py-1 bg-white/10 rounded-full text-sm text-white">
                        {team.name}
                      </span>
                    ))}
                  </div>
                </div>
                <Standings tournamentId={t.id} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}