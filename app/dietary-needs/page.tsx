'use client';

import { useEffect, useState } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import StepProgressBar from '../components/StepProgressBar';
import { getCategories } from '@/apis/category';
import { CategoryResponseDto } from '@/types/category';

export default function DietaryPage() {
  const router = useRouter();
  const providerServiceId = '25b862f0-0cb7-44c0-8f1c-10c663e938b2'; // Example provider service ID, replace with actual value

  const [categories, setCategories] = useState<CategoryResponseDto[]>([]);
  const [loading, setLoading] = useState(true);

  const handleBack = () => {
    router.back();
  };

  const handleSelect = (option: string) => {
    console.log('Selected:', option);
    router.push('/package-selection');
  };

  useEffect(() => {
    getCategories(providerServiceId)
      .then(setCategories)
      .catch((err) => console.error('Error loading categories', err))
      .finally(() => setLoading(false));
  }, [providerServiceId]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* StepProgressBar */}
      <div className="w-full max-w-7xl mx-auto mt-4 px-4 z-20 relative">
        <StepProgressBar currentStep={0} onBack={handleBack} />
      </div>

      {/* main */}
      <div className="relative w-full flex-1 mt-4">
        <div className="absolute inset-0 z-0">
          <Image
            src="/background.jpg"
            alt="Cafeteria background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-white/50" />
        </div>

        <div className="relative z-10 flex flex-col items-center px-4 py-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Provider’s Name 飲食需求
          </h2>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
              {categories.map((category) => (
                <button
                  key={category.categoryId}
                  onClick={() => handleSelect(category.categoryName)}
                  title={category.categoryDescription}
                  className="w-full aspect-[1.77] rounded-[20px] border border-[#285770]/50 bg-white text-[#285770] text-2xl shadow-md hover:bg-[#f5f5f5] transition font-semibold flex items-center justify-center text-center"
                >
                  {category.categoryName}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
