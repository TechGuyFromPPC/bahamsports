'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function TournamentContent() {
  const searchParams = useSearchParams();
  const sport = searchParams.get('sport');

  // Logic to show content based on the sport
  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Displaying tournaments for: {sport}</h1>
      
      <div className="grid gap-4">
        {/* Replace this with your actual database fetch or map logic */}
        <div className="bg-[#2d0000] p-6 rounded-xl border border-white/10">
          <h2 className="text-xl">Sample Tournament 1</h2>
          <p className="text-white/60">Details about this {sport} tournament go here.</p>
        </div>
      </div>
    </div>
  );
}

export default function TournamentPage() {
  return (
    <Suspense fallback={<div className="text-white p-8">Loading...</div>}>
      <TournamentContent />
    </Suspense>
  );
}