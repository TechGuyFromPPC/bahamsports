import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default async function MLBBTournamentsPage() {
  // Fetch all tournaments where sport_type is 'mlbb'
  const { data: tournaments } = await supabase
    .from('tournaments')
    .select('*')
    .eq('sport_type', 'mlbb')
    .order('start_date', { ascending: false });

  return (
    <div className="p-10 text-white">
      <h1 className="text-4xl font-black mb-10">MLBB Tournaments</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tournaments?.map((t) => (
          <Link href={`/esports/mlbb/${t.id}`} key={t.id} className="bg-white/5 border border-white/10 p-6 rounded-xl hover:border-yellow-500 transition">
            <h2 className="text-2xl font-bold">{t.name}</h2>
            <p className="text-sm text-white/50">{t.start_date}</p>
            <span className="mt-4 inline-block bg-yellow-500 text-black px-3 py-1 rounded text-xs font-bold">
              View Tournament
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}