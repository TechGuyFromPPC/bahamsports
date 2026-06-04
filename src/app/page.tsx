'use client';
import Link from 'next/link';

export default function Home() {
  const sports = ['Basketball', 'Pickleball', 'Volleyball'];

  return (
    <main className="min-h-screen flex flex-col items-center p-8 md:p-20 text-white">
      {/* Brand Header */}
      <div className="text-center mb-16">
        <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter mb-2">
          BAHAM <span className="text-yellow-500">SPORTS</span>
        </h1>
        <p className="text-white/40 text-sm tracking-[0.3em] uppercase">Management System v2.0</p>
      </div>

      <div className="w-full max-w-6xl space-y-12">
        {/* Live Games */}
        <Link href="/live" className="w-full h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center gap-4 hover:border-red-500 transition-all">
          <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span></span>
          <span className="font-black text-red-500 uppercase tracking-widest">View Live Games</span>
        </Link>

        {/* Featured Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/leaderboard/season-1" className="h-32 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between px-8 hover:border-yellow-500 transition-all">
            <span className="text-2xl font-black uppercase italic">Season 1 Leaderboard</span>
            <span className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold text-sm">VIEW</span>
          </Link>
          <Link href="/mvp-rankings" className="h-32 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between px-8 hover:border-white/30 transition-all">
            <span className="text-2xl font-black uppercase italic">MVP Tracker</span>
            <span className="text-4xl">🏆</span>
          </Link>
        </div>

        {/* Sports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sports.map((sport) => (
            <Link key={sport} href={`/${sport.toLowerCase()}/tournaments`}
                  className="h-48 rounded-2xl border border-white/10 bg-white/5 flex flex-col items-center justify-center transition-all hover:border-yellow-500 hover:bg-white/10">
              <span className="text-4xl mb-4">{sport === 'Basketball' ? '🏀' : sport === 'Pickleball' ? '🎾' : '🏐'}</span>
              <span className="text-xl font-bold uppercase tracking-widest">{sport}</span>
            </Link>
          ))}
        </div>


<Link 
  href="/pickleball/tournaments" 
  className="h-48 rounded-2xl border border-white/10 bg-white/5 flex flex-col items-center justify-center transition-all hover:border-yellow-500 hover:bg-white/10"
>
  <span className="text-4xl mb-4">🎾</span>
  <span className="text-xl font-bold uppercase tracking-widest">Pickleball</span>
</Link>

        {/* --- ADDED BACK: Admin Portal --- */}
        <Link href="/admin" 
              className="w-full h-24 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center gap-4 hover:border-yellow-500 transition-all group">
          <span className="text-2xl">⚙️</span>
          <span className="font-bold text-white/50 uppercase tracking-widest group-hover:text-white transition-colors">System Admin Dashboard</span>
        </Link>
      </div>
    </main>
  );
}