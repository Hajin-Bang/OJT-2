type TabItem<T> = {
  label: string;
  value: T;
};

interface ToggleTabProps<T> {
  tabs: TabItem<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: "sm" | "lg";
}

/**
 * 토글 탭
 * 사용 시 크기 조절 가능
 */
export default function ToggleTab<T extends string>({
  tabs,
  value,
  onChange,
  size = "sm",
}: ToggleTabProps<T>) {
  const isLarge = size === "lg";

  return (
    <div
      className={`flex ${
        isLarge ? "w-full p-1" : "w-fit p-[2px] gap-x-1"
      } border py-2 border-gray-200 rounded-lg bg-[#f9fafa]`}
    >
      {tabs.map((tab) => {
        const isSelected = value === tab.value;
        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`
              ${
                isLarge
                  ? "flex-1 h-[45px] text-[18px]"
                  : "w-[70px] h-[40px] text-sm"
              }
              rounded-md transition font-bold cursor-pointer
              ${
                isSelected
                  ? "bg-white text-green-700 shadow-sm z-10"
                  : "text-gray-500"
              }
            `}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
