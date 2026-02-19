import React from 'react';

type MealType = '午餐' | '晚餐';

type MenuData = {
  day: string;
  lunch: string[];
  dinner: string[];
};

type Props = {
  data: MenuData[];
  className?: string;
};

export const FullWeekMealTable: React.FC<Props> = ({ data, className }) => {
  const allDays = ['週一', '週二', '週三', '週四', '週五', '週六', '週日'];

  const getMeals = (day: string, mealType: MealType): string => {
    const found = data.find((d) => d.day === day);
    const meals = mealType === '午餐' ? found?.lunch : found?.dinner;
    return meals?.length ? meals.join('\n') : '—';
  };

  return (
    <div className={`overflow-x-auto ${className ?? ''}`}>
      <table className="w-full table-fixed text-sm text-primary border-collapse">
        <thead>
          <tr>
            <th className="w-[4.5rem] p-2 text-center font-semibold text-primary" />
            {allDays.map((day) => (
              <th
                key={day}
                className="p-2 text-center font-semibold text-primary"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {['午餐', '晚餐'].map((mealType) => (
            <tr key={mealType}>
              <td className="p-2 text-center font-semibold">{mealType}</td>
              {allDays.map((day) => (
                <td
                  key={day}
                  className="p-2 align-middle whitespace-pre-wrap text-center border-t border-l border-primary/80"
                >
                  {getMeals(day, mealType as MealType)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
