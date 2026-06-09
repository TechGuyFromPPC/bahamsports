// src/app/admin/mlbb/layout.tsx
import Link from 'next/link';

export default function MLBBAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <aside className="w-64 border-r border-white/10 p-6">
        <h2 className="text-yellow-500 font-black italic uppercase mb-8">MLBB Admin</h2>
        <nav className="space-y-4">
          <Link href="/admin/mlbb" className="block text-white hover:text-yellow-500">Dashboard</Link>
          <Link href="/admin/mlbb/teams" className="block text-white hover:text-yellow-500">Manage Teams</Link>
        </nav>
      </aside>
      <main className="flex-1 p-12">{children}</main>
    </div>
  );
}