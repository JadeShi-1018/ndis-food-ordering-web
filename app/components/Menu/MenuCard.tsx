'use client';

import React, { useState } from 'react';
import { FullWeekMealTable } from './MenuTable';
import { MealPlanHeader } from './MenuHeader';

type MenuData = {
  day: string;
  lunch: string[];
  dinner: string[];
};

type MenuCardProps = {
  menuData: MenuData[];
  planName?: string;
  WeekDays?: string[];
  mealTypes?: string[];
};

export const MenuCard: React.FC<MenuCardProps> = ({
  menuData,
  planName = '標準',
  WeekDays = [],
  mealTypes = [],
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-2xl border border-primary/30 bg-white shadow-md space-y-4">
      {/* Header with toggle button */}
      <MealPlanHeader
        planName={planName}
        WeekDays={WeekDays}
        mealTypes={mealTypes}
        isExpanded={isExpanded}
        onToggle={toggleExpand}
      />

      {isExpanded && (
        <div className="animate-fadeIn space-y-4">
          {/* Meal content title */}
          <div className="text-left text-sm font-semibold text-primary px-6">
            菜品內容
          </div>

          {/* Weekly meal table */}
          <div className="px-6">
            <FullWeekMealTable data={menuData} />
          </div>

          {/* Footer section (description + order button) */}
          <div className="px-6 pb-6">
            <div className="flex justify-between items-end gap-4 flex-wrap">
              {/* Delivery notes */}
              <div className="text-sm text-gray-700 text-left space-y-2">
                <div>
                  <div className="font-semibold text-primary">送餐時間：</div>
                  <div>當天 9:00 am（此為發車時間，實際抵達時間視交通狀況）</div>
                </div>
                <div>
                  <div className="font-semibold text-primary">備註：</div>
                  <div>若有特殊需求（如：特定食物過敏），請提前通知。</div>
                </div>
              </div>

              {/* Order button */}
              <div className="text-right self-end">
                <button
                  className="rounded-full bg-primary text-white px-12 py-2 text-sm font-semibold shadow hover:bg-primary/80 transition"
                  onClick={() => alert(`訂餐：${planName}`)}
                >
                  訂餐
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

