'use client';

export default function EsportsCard({ tournament }: { tournament: any }) {
  return (
    <div className="bg-neutral-900 border border-yellow-500/30 rounded-2xl p-6 hover:border-yellow-500 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white">{tournament.name}</h3>
          <p className="text-yellow-500 text-xs font-mono tracking-widest uppercase">
           {/* Use optional chaining (?.) and a fallback value */}
{tournament.type?.replace('_', ' ') || 'GENERAL'}
          </p>
        </div>
        <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 rounded-full text-xs font-bold">
          LIVE
        </span>
      </div>
      
      <div className="space-y-2 mt-6">
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Status</span>
          <span className="text-white">{tournament.status}</span>
        </div>
        <div className="w-full bg-neutral-800 h-2 rounded-full mt-2 overflow-hidden">
          <div className="bg-yellow-500 h-full w-2/3"></div> {/* Progress bar placeholder */}
        </div>
      </div>
    </div>
  );
}