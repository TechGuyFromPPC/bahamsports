'use client';
import { useEffect, useState, use } from 'react'; // 1. Import 'use'
import { supabase } from '@/lib/supabaseClient';
import AddMatchStatsForm from '@/components/AddMatchStatsForm';
import MatchHistory from '@/components/MatchHistory';

// 2. Change the component to accept 'params' as a Promise
export default function EditPlayerStats({ params }: { params: Promise<{ id: string }> }) {
  const [stats, setStats] = useState<any[]>([]);
  
  // 3. Unwrap the params using the React 'use' hook
  const { id } = use(params);

  async function fetchStats() {
   // Example update for your fetch
const { data: player } = await supabase
  .from('mlbb_players') // Now referencing the dedicated table
  .select('*')
  .eq('id', id)
  .single();
  }

  useEffect(() => { 
    if (id) fetchStats(); 
  }, [id]);

  return (
    <div className="max-w-3xl p-8">
      <h1 className="text-2xl font-black mb-6 uppercase">Manage Player Stats (ID: {id})</h1>
      
      <AddMatchStatsForm playerId={parseInt(id)} />
      
      <MatchHistory stats={stats} refresh={fetchStats} />
    </div>
  );
}