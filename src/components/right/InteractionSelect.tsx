import { FiChevronDown } from "react-icons/fi";
import { useInteractionStore } from "../../store/useInteractionStore";

export default function InteractionSelect() {
  const { type, setType } = useInteractionStore();

  return (
    <div className="flex items-center gap-2 mb-5 cursor-pointer">
      <label className="font-semibold text-xl pr-4">Interaction</label>

      {/* 드롭다운 영역 */}
      <div className="relative w-[200px] ">
        <select
          className="w-full h-[45px] border border-gray-300 rounded-md px-3 pr-10 text-md bg-white appearance-none"
          value={type}
          onChange={(e) => setType(e.target.value as "choice" | "match")}
        >
          <option value="choice">choice</option>
          <option value="match">match</option>
        </select>

        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
          <FiChevronDown size={18} />
        </div>
      </div>
    </div>
  );
}
