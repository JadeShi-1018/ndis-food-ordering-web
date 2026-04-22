'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

type ServiceCardProps = {
  title: string;
  description?: string;
  image: string;
  icon: React.ReactNode;
  available: boolean;
};

export default function ServiceCard({
  title,
  description,
  image,
  icon,
  available,
}: ServiceCardProps) {
  const router = useRouter();

  return (
    <div
      className="relative w-full h-full rounded-3xl overflow-hidden shadow-md bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div
        className={`absolute inset-0 ${
          available ? 'bg-black/50' : 'bg-white/50'
        }`}
      />

      <div className="relative z-10 w-full h-full px-6 py-6 flex flex-col justify-center items-center text-white">
        <div className="text-8xl mb-4">{icon}</div>
        <h3 className="text-2xl font-bold tracking-widest mb-4 text-center">{title}</h3>
        <button
          disabled={!available}
          onClick={() => available && router.push('/delivery-service')}
          className={`
            mb-4 px-10 py-1.5 rounded-full border
            text-sm font-medium transition
            ${available
              ? 'text-black border-black bg-white hover:bg-gray-100'
              : 'text-black border-black bg-gray-200 cursor-not-allowed'}
          `}
        >
          Select
        </button>
        <p className="text-sm text-center leading-relaxed">
          {description || 'Coming soon...'}
        </p>
      </div>
    </div>
  );
}
