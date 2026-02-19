import { FiChevronLeft, FiChevronRight, FiCheckCircle } from "react-icons/fi";

const steps = ["飲食需求", "包餐選擇", "資料填寫", "確認/付款", "完成"];

type Props = {
  currentStep: number;
  onBack?: () => void;
};

export default function StepProgressBar({ currentStep, onBack }: Props) {
  return (
    <div className="w-full flex items-center justify-between px-6 py-4 flex-wrap gap-y-4">
      {/* Back */}
      <div className="flex-shrink-0">
        <button
          onClick={onBack}
          className="flex items-center justify-center min-w-[110px] px-5 py-2.5 border border-primary rounded-full text-primary font-semibold gap-2 hover:bg-gray-100 transition"
        >
          <FiChevronLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      {/* Step Tracker */}
      <div className="flex flex-wrap items-center gap-2 min-w-0">
        {steps.map((label, i) => {
          const isActive = i === currentStep;

          return (
            <div key={i} className="flex items-center gap-2">
              <div
                className={`flex items-center justify-center min-w-[100px] px-4 py-2.5 rounded-full border font-semibold text-sm transition whitespace-nowrap
                  ${
                    isActive
                      ? "bg-secondary border-primary text-primary"
                      : "border-primary text-primary hover:bg-gray-100"
                  }`}
              >
                {label === "完成" ? (
                  <span className="flex items-center gap-1">
                    <FiCheckCircle className="w-5 h-5 text-primary" />
                    {label}
                  </span>
                ) : (
                  label
                )}
              </div>

              {i < steps.length - 1 && (
                <FiChevronRight className="text-primary w-4 h-4" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
