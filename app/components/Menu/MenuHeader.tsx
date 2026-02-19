'use client';

import React from 'react';
import { FiChevronDown } from 'react-icons/fi';

type MealPlanHeaderProps = {
  planName?: string;
  WeekDays?: string[];
  mealTypes?: string[];
  isExpanded?: boolean;
  onToggle?: () => void;
};

export const MealPlanHeader: React.FC<MealPlanHeaderProps> = ({
  planName = '標準',
  WeekDays = [],
  mealTypes = [],
  isExpanded = false,
  onToggle,
}) => {
  return (
    <div className="w-full rounded-2xl border border-primary/30 bg-secondary px-4 sm:px-6 py-2">
      <div className="grid gap-4 w-full grid-cols-1 sm:grid-cols-[6rem_1fr_12rem_3rem] items-center">
        {/* Plan Title */}
        <div className="flex flex-col text-primary font-semibold text-base leading-tight whitespace-nowrap">
          <span>餐食</span>
          <span>（{planName}）</span>
        </div>

        {/* Available Days */}
        <div className="sm:border-l-2 sm:border-primary sm:pl-4 flex items-center flex-wrap gap-2">
          <span className="text-sm text-primary whitespace-nowrap">供餐日程：</span>
          {WeekDays.map((day) => (
            <div
              key={day}
              className="rounded-full border border-primary px-3 py-1 text-sm text-primary bg-white leading-none"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Meal Types */}
        <div className="flex items-center flex-wrap gap-2">
          <span className="text-sm text-primary whitespace-nowrap">包含範圍：</span>
          {mealTypes.map((type) => (
            <div
              key={type}
              className="text-center rounded-full border border-primary px-2 py-1 text-sm text-primary bg-white"
            >
              {type}
            </div>
          ))}
        </div>

        {/* Expand/Collapse Button */}
        <div className="flex justify-end">
          <button
            onClick={onToggle}
            className="flex items-center justify-center w-9 h-9 text-primary hover:bg-primary/10 transition"
            aria-label="Toggle meal table"
          >
            <FiChevronDown
              className={`w-5 h-5 transform transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
