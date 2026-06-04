'use client'; // <-- THIS IS THE FIX

import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between bg-[#1a0000]/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      {/* Back Button */}
      <button 
        onClick={() => window.history.back()}
        className="flex items-center gap-2 text-white/70 hover:text-baham-yellow transition-colors"
      >
        <ArrowLeft size={20} />
        <span className="hidden md:inline font-bold uppercase text-sm">Back</span>
      </button>

      {/* Home Button */}
      <Link href="/" className="flex items-center gap-2 text-white hover:text-baham-yellow transition-colors">
        <Home size={20} />
        <span className="font-black uppercase tracking-tighter italic">Baham Sports</span>
      </Link>

      <div className="w-20"></div>
    </nav>
  );
}