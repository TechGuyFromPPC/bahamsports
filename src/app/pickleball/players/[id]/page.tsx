'use client';
import { useEffect, useState, use } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function PlayerProfile({ params }: { params: Promise<{ id: string }> }) {
  const [player, setPlayer] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const { id } = use(params);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from('players')
        .select('*, teams(name)')
        .eq('id', id)
        .single();
      setPlayer(data);
    }
    fetchData();
  }, [id]);

function calculateAge(birthdate: string) {
  const diff = Date.now() - new Date(birthdate).getTime();
  return Math.abs(new Date(diff).getUTCFullYear() - 1970);
}

  async function handleUpload(event: any) {
    try {
      setUploading(true);
      const file = event.target.files[0];
      const filePath = `profiles/${id}.${file.name.split('.').pop()}`;

      const { error: uploadError } = await supabase.storage
        .from('player-photos')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('player-photos').getPublicUrl(filePath);
      await supabase.from('players').update({ photo_url: data.publicUrl }).eq('id', id);
      
      setPlayer({ ...player, photo_url: data.publicUrl });
      alert('Photo updated!');
    } catch (error) {
      alert('Upload failed.');
    } finally {
      setUploading(false);
    }
  }

  if (!player) return <div className="p-20 text-white">Loading...</div>;

  return (
    <main className="min-h-screen bg-neutral-950 p-8 md:p-20 text-white">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="relative">
          {player.photo_url ? (
            <img src={player.photo_url} className="w-48 h-48 rounded-full border-4 border-yellow-500 object-cover" />
          ) : (
            <div className="w-48 h-48 rounded-full bg-neutral-800 flex items-center justify-center border-2 border-neutral-700">No Photo</div>
          )}
          <input type="file" onChange={handleUpload} disabled={uploading} className="absolute inset-0 opacity-0 cursor-pointer" />
        </div>
        
        <div>
          <h1 className="text-6xl font-black italic tracking-tighter">{player.full_name.toUpperCase()}</h1>
          <p className="text-2xl text-yellow-500 font-bold">{player.teams?.name || 'FREE AGENT'}</p>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="grid gap-6">
        
        {/* Personal Details */}
        <section className="bg-neutral-900 p-8 rounded-3xl border border-white/10">
          <h3 className="text-white/40 uppercase text-xs font-bold mb-6 tracking-widest">Personal Details</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <DetailItem label="Nationality" value={player.nationality} />
            <DetailItem label="Birthdate" value={player.birthdate} />
            <DetailItem label="Age" value={player.birthdate ? calculateAge(player.birthdate) : 'N/A'} />
            <DetailItem label="Current Team" value={player.teams?.name || 'Free Agent'} />
          </div>
        </section>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard title="DUPR Rating" value={player.dupr_rating || 0} />
          <StatCard title="Games Played" value={player.games_played || 0} />
          <StatCard title="Win Rate" value={`${player.win_rate || 0}%`} />
          <StatCard title="Side" value={player.preferred_side || 'N/A'} />
        </div>
      </div>
    </main>
  );
}

// Helper components for clean layout
function DetailItem({ label, value }: { label: string, value: string | number | null }) {
  return (
    <div>
      <div className="text-white/40 text-[10px] uppercase tracking-widest">{label}</div>
      <div className="text-lg font-semibold truncate">{value || 'N/A'}</div>
    </div>
  );
}

function StatCard({ title, value }: { title: string, value: string | number }) {
  return (
    <div className="bg-neutral-900 p-6 rounded-3xl border border-white/10 text-center">
      <div className="text-white/40 text-[10px] uppercase tracking-widest mb-2">{title}</div>
      <div className="text-3xl font-black">{value}</div>
    </div>
  );
}