'use client';
import Link from 'next/link';
import SportCategoryCard from '../components/SportCategoryCard';

export default function Home() {
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
        {/* Live Games Shortcut */}
        <Link href="/live" className="w-full h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center gap-4 hover:border-red-500 transition-all">
          <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span></span>
          <span className="font-black text-red-500 uppercase tracking-widest">View Live Games</span>
        </Link>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
         <SportCategoryCard name="Basketball" imageSrc="/images/basketball.png" href="/basketball/tournaments" />
<SportCategoryCard name="Pickleball" imageSrc="/images/pickleball.png" href="/pickleball/tournaments" />
<SportCategoryCard name="Volleyball" imageSrc="/images/volleyball.png" href="/volleyball/tournaments" />
<SportCategoryCard name="Esports" imageSrc="/images/esports.png" href="/esports" />
        </div>

        {/* Admin Portal */}
        <Link href="/admin" className="w-full h-24 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center gap-4 hover:border-yellow-500 transition-all group">
          <span className="text-2xl">⚙️</span>
          <span className="font-bold text-white/50 uppercase tracking-widest group-hover:text-white transition-colors">System Admin Dashboard</span>
        </Link>
      </div>
    </main>
  );
}