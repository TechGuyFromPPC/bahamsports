'use client';

export default function MatchResultDisplay({ gameNumber }: { gameNumber: number }) {
 const gameData: any = {
    1: {
      duration: "15m20sec",
      winner: { name: "Team Batang F", totalKills: 45, players: [
        { name: "Andrei Amada", hero: "Gusion", kda: "12/2/5", gold: 8313, isMvp: false },
        { name: "Xian Magallanes", hero: "Martis", kda: "8/3/10", gold: 8385, isMvp: false },
        { name: "Justin Sumalapao", hero: "Valentina", kda: "15/0/8", gold: 14460, isMvp: true },
        { name: "Christian Tomines", hero: "Fredrinn", kda: "5/5/12", gold: 8257, isMvp: false },
        { name: "Grant Matthew C.", hero: "Nana", kda: "5/6/10", gold: 9177, isMvp: false },
      ]},
      loser: { name: "Zone 1 E-Youths", totalKills: 16, players: [
        { name: "Steven Factor", hero: "Beatrix", kda: "5/7/0", gold: 8666 },
        { name: "Allen J. Factor", hero: "Yu Zhong", kda: "1/12/2", gold: 6953 },
        { name: "Accel Ace Obligar", hero: "Pharsa", kda: "2/11/0", gold: 7137 },
        { name: "Rex Panaligan", hero: "Khufra", kda: "3/8/3", gold: 6969 },
        { name: "Jasper Hagonoy", hero: "Joy", kda: "5/7/2", gold: 7708 },
      ]}
    },
    2: {
      duration: "18m45sec",
      winner: { name: "Zone 1 E-Youths", totalKills: 32, players: [
        { name: "Steven Factor", hero: "Beatrix", kda: "8/4/6", gold: 12400, isMvp: true },
        { name: "Allen J. Factor", hero: "Yu Zhong", kda: "6/5/8", gold: 11200 },
        { name: "Accel Ace Obligar", hero: "Pharsa", kda: "7/6/5", gold: 10800 },
        { name: "Rex Panaligan", hero: "Khufra", kda: "5/8/10", gold: 9500 },
        { name: "Jasper Hagonoy", hero: "Joy", kda: "6/7/9", gold: 9900 },
      ]},
      loser: { name: "Team Batang F", totalKills: 28, players: [
        { name: "Andrei Amada", hero: "Gusion", kda: "9/7/4", gold: 11500 },
        { name: "Xian Magallanes", hero: "Martis", kda: "7/8/6", gold: 10200 },
        { name: "Justin Sumalapao", hero: "Valentina", kda: "6/6/7", gold: 10900 },
        { name: "Christian Tomines", hero: "Fredrinn", kda: "3/5/12", gold: 9200 },
        { name: "Grant Matthew C.", hero: "Nana", kda: "3/6/10", gold: 9100 },
      ]}
    },
    3: {
      duration: "12m10sec",
      winner: { name: "Team Batang F", totalKills: 38, players: [
        { name: "Andrei Amada", hero: "Gusion", kda: "15/1/2", gold: 13200, isMvp: true },
        { name: "Xian Magallanes", hero: "Martis", kda: "8/2/8", gold: 11800 },
        { name: "Justin Sumalapao", hero: "Valentina", kda: "7/0/15", gold: 12100 },
        { name: "Christian Tomines", hero: "Fredrinn", kda: "4/3/18", gold: 9800 },
        { name: "Grant Matthew C.", hero: "Nana", kda: "4/4/14", gold: 9600 },
      ]},
      loser: { name: "Zone 1 E-Youths", totalKills: 10, players: [
        { name: "Steven Factor", hero: "Beatrix", kda: "2/8/1", gold: 7200 },
        { name: "Allen J. Factor", hero: "Yu Zhong", kda: "2/7/2", gold: 6800 },
        { name: "Accel Ace Obligar", hero: "Pharsa", kda: "2/8/3", gold: 6500 },
        { name: "Rex Panaligan", hero: "Khufra", kda: "2/8/4", gold: 6200 },
        { name: "Jasper Hagonoy", hero: "Joy", kda: "2/7/3", gold: 6400 },
      ]}
    }
  };

  const game = gameData[gameNumber] || gameData[1];
  const mvp = game.winner.players.find((p: any) => p.isMvp);

  return (
    <div className="bg-[#1a1f2e] border border-white/10 rounded-2xl p-6 text-white max-w-5xl mx-auto shadow-2xl">
 <div className="flex justify-between items-center mb-6 text-center">
        <div className="w-1/3">
          <h2 className="text-2xl font-black text-blue-400">{game.winner.name}</h2>
          <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded uppercase tracking-widest">Winner</span>
        </div>
        
        <div className="w-1/3 text-white/20 font-bold uppercase tracking-widest text-sm">VS</div>
        
        <div className="w-1/3">
          <h2 className="text-2xl font-black text-red-400">{game.loser.name}</h2>
          <span className="text-[10px] font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded uppercase tracking-widest">Loser</span>
        </div>
      </div>

      {/* Scoreboard Header: Kills and Duration */}
      <div className="flex justify-between items-center mb-8 border-y border-white/10 py-4">
        <div className="text-center w-1/3">
          <p className="text-xs text-white/40 uppercase mb-1">Total Kills</p>
          <p className="text-4xl font-black text-yellow-500">{game.winner.totalKills}</p>
        </div>
        
        <div className="text-center w-1/3">
          <h2 className="text-xl font-bold uppercase tracking-widest text-white/90">Victory</h2>
          <p className="text-sm text-white/50 mt-1">{game.duration}</p>
        </div>

        <div className="text-center w-1/3">
          <p className="text-xs text-white/40 uppercase mb-1">Total Kills</p>
          <p className="text-4xl font-black text-red-500">{game.loser.totalKills}</p>
        </div>
      </div>

      {/* Scoreboard Body */}
      <div className="grid grid-cols-2 gap-4">
        {/* Winner Table */}
        <div className="bg-blue-900/10 rounded-lg p-2">
          {game.winner.players.map((p: any, i: number) => (
            <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 text-sm">
              <div className="flex flex-col w-24">
                <span className={`font-bold truncate ${p.isMvp ? 'text-yellow-500' : ''}`}>{p.name}</span>
                <span className="text-[10px] text-blue-300">{p.hero}</span>
              </div>
              <span className="text-white font-mono w-16">{p.kda}</span>
              <span className="text-white/60 w-16 text-right">{p.gold}</span>
            </div>
          ))}
        </div>

        {/* Loser Table */}
        <div className="bg-red-900/10 rounded-lg p-2">
          {game.loser.players.map((p: any, i: number) => (
            <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 text-sm">
              <div className="flex flex-col w-24 text-right">
                <span className="font-bold truncate">{p.name}</span>
                <span className="text-[10px] text-red-300">{p.hero}</span>
              </div>
              <span className="text-white font-mono w-16 text-center">{p.kda}</span>
              <span className="text-white/60 w-16">{p.gold}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: MVP Highlights */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <p className="text-white/40 uppercase text-[10px] tracking-[0.2em] mb-4 text-center">Match MVP</p>
        <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-3xl font-black text-yellow-500">{mvp.name}</p>
            <p className="text-sm font-bold text-white mt-1">Hero: <span className="text-yellow-500">{mvp.hero}</span></p>
          </div>
          <div className="flex gap-8 text-center">
            <div><p className="text-[10px] uppercase text-white/40">KDA</p><p className="font-bold">{mvp.kda}</p></div>
            <div><p className="text-[10px] uppercase text-white/40">Gold</p><p className="font-bold">{mvp.gold}</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}