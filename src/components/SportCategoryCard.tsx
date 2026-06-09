// src/components/SportCategoryCard.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function SportCategoryCard({ name, imageSrc, href }: { name: string, imageSrc: string, href: string }) {
  return (
    <Link href={href} className="h-48 rounded-2xl border border-white/10 bg-white/5 flex flex-col items-center justify-center transition-all hover:border-yellow-500 hover:bg-white/10 group">
      <div className="relative w-16 h-16 mb-4">
        <Image 
          src={imageSrc} 
          alt={name} 
          fill 
          className="object-contain" 
        />
      </div>
      {/* Text with high contrast and hover effects */}
      <span className="text-xl font-bold uppercase tracking-widest text-gray-100 group-hover:text-yellow-500">
        {name}
      </span>
    </Link>
  );
}