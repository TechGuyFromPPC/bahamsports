'use client';
import { useState } from 'react';
import RosterManager from './components/RosterManager';
import MatchLogger from './components/MatchLogger';
import ScheduleManager from './components/ScheduleManager';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('roster');

  const modules = [
    { id: 'roster', label: 'Roster Manager' },
    { id: 'matches', label: 'Log Matches' },
    { id: 'schedule', label: 'Schedule Manager' }, // Add this
  ];

  return (
    <main className="min-h-screen bg-neutral-950 p-8 md:p-20 text-white">
      <h1 className="text-4xl font-bold mb-10 text-yellow-500">Admin Control Center</h1>
      
      <div className="flex gap-4 mb-8">
        {modules.map((m) => (
          <button 
            key={m.id}
            onClick={() => setActiveTab(m.id)}
            className={`px-6 py-3 rounded-lg font-bold ${activeTab === m.id ? 'bg-yellow-500 text-black' : 'bg-neutral-900 border border-white/10'}`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="bg-neutral-900 p-8 rounded-3xl border border-white/10">
        {activeTab === 'roster' && <RosterManager />}
        {activeTab === 'matches' && <MatchLogger />}
        {activeTab === 'schedule' && <ScheduleManager />} {/* Add this */}
      </div>
    </main>
  );
}