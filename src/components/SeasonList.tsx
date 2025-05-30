import { Season } from "@/store/useSeasonsStore";
import React from "react";

// SeasonListProps interface defines the structure of the props expected by the SeasonList component
interface SeasonListProps {
  season: Season;
  isSelected: boolean;
  onSelect: (season: string) => void;
}

const SeasonList: React.FC<SeasonListProps> = ({
  // Destructuring props to access season data, selection state, and the selection handler
  season,
  isSelected,
  onSelect,
}) => {
  return (
    // List item representing a season, with click and keyboard accessibility for selection
    <li
      onClick={() => onSelect(season.season)}
      className={`relative p-4 rounded-xl drop-shadow-lg cursor-pointer overflow-hidden w-[98%] border-b-4 border-[var(--f1-lilac)]
        ${isSelected ? "ring-4 ring-[var(--f1-lilac)]" : "hover:bg-gray-700"}
      `}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onSelect(season.season);
        }
      }}
    >
      {/* Background overlay of a single season item */}
      <div className="absolute inset-0 bg-[var(--f1-black)] opacity-90"></div>

      {/* Season information */}
      <div className="flex justify-between items-center relative">
        <div className="flex flex-col">
          <span className="text-lg font-bold text-white">
            {season.season} F1 Season
          </span>
        </div>
        <div>
          {season.url && (
            <a
              href={season.url}
              target="_blank"
              className="text-[var(--f1-lilac)] text-sm hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              View details
            </a>
          )}
        </div>
      </div>
    </li>
  );
};

export default SeasonList;
