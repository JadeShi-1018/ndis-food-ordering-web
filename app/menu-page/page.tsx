'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MenuCard } from '../components/Menu/MenuCard';
import StepProgressBar from '../components/StepProgressBar';

const plans = [
  {
    planName: '標準',
    WeekDays: ['週一', '週三', '週五', '週日'],
    mealTypes: ['午餐', '晚餐'],
  },
  {
    planName: 'Plan 01',
    WeekDays: ['週二', '週四'],
    mealTypes: ['午餐'],
  },
];

const sampleMenuData = [
  {
    day: '週一',
    lunch: ['麻婆豆腐', '紅燒獅子頭', '螞蟻上樹(附白飯)'],
    dinner: ['手撕包菜', '滷雞腿排', '螞蟻上樹飯'],
  },
  {
    day: '週二',
    lunch: ['香菇滑雞拼炒冬瓜', '蒜炒空心菜', '茶油炒蛋飯'],
    dinner: ['冬瓜肋排湯', '金瓜排骨湯', '綠咖哩雞飯'],
  },
  {
    day: '週三',
    lunch: ['薑絲炒大腸', '青江菜', '茶油炒蛋飯'],
    dinner: ['蒸魚排', '炒三絲', '冬瓜排骨湯'],
  },
  {
    day: '週四',
    lunch: ['冬瓜肋排湯', '燙青江菜', '茶油炒蛋飯'],
    dinner: ['金瓜排骨湯', '香辣雞丁', '酸菜魚片'],
  },
  {
    day: '週五',
    lunch: ['薑絲炒大腸', '燙青江菜', '茶油炒蛋飯'],
    dinner: ['豆酥鱈魚', '麻油雞湯', '炒米粉'],
  },
  {
    day: '週六',
    lunch: ['手撕包菜', '冬瓜肋排湯', '蝦仁炒飯'],
    dinner: ['炒河粉', '蔥爆牛肉', '酸辣湯'],
  },
  {
    day: '週日',
    lunch: ['麻婆豆腐', '乾煎虱目魚', '螞蟻上樹(附白飯)'],
    dinner: ['手撕包菜', '冬瓜肋排湯', '蝦仁炒飯'],
  },
];

export default function MenuPage() {
  const router = useRouter();
  const handleBack = () => router.back();

  return (
    <div className="relative min-h-screen flex flex-col bg-white">
      {/* Step Progress Bar */}
      <div className="z-30 w-full max-w-7xl mx-auto mt-4 px-4">
        <StepProgressBar currentStep={1} onBack={handleBack} />
      </div>

      {/* Main content section with background */}
      <div className="relative w-full flex-1 mt-4">
        {/* Background image + overlay */}
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

        {/* Foreground content */}
        <div className="relative z-10 w-full flex-1 py-12 px-4 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">包餐選擇</h2>

          <div className="w-full max-w-6xl space-y-6">
            {plans.map((plan, index) => {
              const filteredMenu = sampleMenuData.filter(item =>
                plan.WeekDays.includes(item.day)
              );

              return (
                <MenuCard
                  key={index}
                  planName={plan.planName}
                  WeekDays={plan.WeekDays}
                  mealTypes={plan.mealTypes}
                  menuData={filteredMenu}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
