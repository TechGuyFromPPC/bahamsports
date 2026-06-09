import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default async function MLBBAdminDashboard() {
  // Fetch only esports tournaments
  const { data: tournaments } = await supabase
    .from('tournaments')
    .select('*')
    .eq('sport_type', 'esports');

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-black uppercase tracking-tighter">Tournament Control Center</h1>
      
      <div className="grid gap-6">
        {tournaments?.map((t) => (
          <div key={t.id} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{t.name}</h2>
              <p className="text-yellow-500 text-sm font-bold uppercase">{t.status} • {t.start_date}</p>
            </div>
            <div className="flex gap-4">
              <Link 
                href={`/admin/mlbb/tournaments/${t.id}`} 
                className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200"
              >
                Manage Teams
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}