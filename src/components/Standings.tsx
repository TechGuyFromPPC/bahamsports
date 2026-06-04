import { createClient } from '@/lib/supabase/server';

export default async function Standings({ tournamentId }: { tournamentId: number }) {
  const supabase = await createClient();

  const { data: matches } = await supabase
    .from('matches')
    .select('*, team_a:teams!matches_team_a_id_fkey(name), team_b:teams!matches_team_b_id_fkey(name)')
    .eq('tournament_id', tournamentId);

  const standingsMap: Record<string, { w: number; l: number }> = {};

  matches?.forEach((m) => {
    const nameA = m.team_a?.name;
    const nameB = m.team_b?.name;
    if (!nameA || !nameB) return;

    [nameA, nameB].forEach(name => { if (!standingsMap[name]) standingsMap[name] = { w: 0, l: 0 }; });

    // Ensure we are comparing numbers
    const scoreA = Number(m.team_a_score) || 0;
    const scoreB = Number(m.team_b_score) || 0;

    if (scoreA > scoreB) {
      standingsMap[nameA].w += 1;
      standingsMap[nameB].l += 1;
    } else if (scoreB > scoreA) {
      standingsMap[nameB].w += 1;
      standingsMap[nameA].l += 1;
    }
  });

  return (
    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
      <h3 className="text-baham-yellow font-bold uppercase mb-4">Live Standings</h3>
      <table className="w-full text-white/90">
        <thead>
          <tr className="text-left text-xs uppercase text-white/50">
            <th className="pb-2">Team</th>
            <th className="pb-2 text-center">W</th>
            <th className="pb-2 text-center">L</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(standingsMap).map(([name, stats]) => (
            <tr key={name} className="border-t border-white/5">
              <td className="py-3 font-medium">{name}</td>
              <td className="py-3 text-center">{stats.w}</td>
              <td className="py-3 text-center">{stats.l}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}