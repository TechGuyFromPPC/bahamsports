'use client';
import Link from 'next/link';

const adminModules = [
  { title: "Live Scoreboards", desc: "Control active game clocks & scoring", href: "/admin/live/1", icon: "⚙️" },
  { title: "Team & Player Mgmt", desc: "Edit rosters and team stats", href: "/admin/teams", icon: "👥" },
  { title: "Tournament Setup", desc: "Configure brackets and schedules", href: "/admin/tournaments", icon: "🏆" },
];

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] p-8 md:p-20 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-black uppercase italic">System Admin</h1>
          <p className="text-yellow-500 font-bold tracking-widest uppercase">Baham Sports Management v2.0</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {adminModules.map((m) => (
            <Link key={m.title} href={m.href} 
                  className="bg-[#1a0000] border border-white/10 p-8 rounded-3xl hover:border-yellow-500 transition-all group">
              <div className="text-4xl mb-4">{m.icon}</div>
              <h2 className="text-xl font-bold uppercase mb-2">{m.title}</h2>
              <p className="text-white/50 text-sm">{m.desc}</p>
            </Link>
          ))}
        </div>

        {/* Demo Data Management View */}
        <div className="mt-12 bg-white/5 p-8 rounded-3xl border border-white/5">
          <h3 className="font-bold uppercase tracking-widest mb-6 text-white/40">Active Records Preview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
              <p className="text-xs text-white/30 uppercase">Teams Managed</p>
              <p className="text-2xl font-black">3</p>
            </div>
            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
              <p className="text-xs text-white/30 uppercase">Players Registered</p>
              <p className="text-2xl font-black">12</p>
            </div>
            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
              <p className="text-xs text-white/30 uppercase">Active Tournaments</p>
              <p className="text-2xl font-black">1</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}