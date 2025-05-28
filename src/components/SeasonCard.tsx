import { Season } from "@/store/useSeasonsStore";
import React from "react";

// SeasonCardProps interface defines the structure of the props expected by the SeasonCard component
interface SeasonCardProps {
  season: Season;
  isSelected: boolean;
  onSelect: (season: string) => void;
}

const SeasonCard: React.FC<SeasonCardProps> = ({
  // Destructuring props to access season data, selection state, and the selection handler
  season,
  isSelected,
  onSelect,
}) => {
  return (
    // Card representing a season, with click and keyboard accessibility for selection
    <div
      className={`relative drop-shadow-xl w-48 h-64 overflow-hidden rounded-xl hover:bg-gray-700 hover:cursor-pointer ${
        isSelected ? "ring-4 ring-[var(--f1-lilac)]" : ""
      }`}
      onClick={() => onSelect(season.season)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onSelect(season.season);
        }
      }}
    >
      {/* Background overlay of a single season card */}
      <div className="absolute flex items-center justify-center text-white z-[1] opacity-90 rounded-xl inset-0.5 bg-[var(--f1-black)] border-b-4 border-[var(--f1-lilac)]">
        {/* Season Information */}
        <div className="w-full h-24 flex flex-col items-center justify-center text-center">
          <span className="text-lg font-bold">{season.season}</span>
          {season.url && (
            <a
              href={season.url}
              target="_blank"
              className="text-[var(--f1-lilac)] text-xs mt-2 hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              View details
            </a>
          )}
        </div>
      </div>
      <div className="absolute w-56 h-48 bg-white blur-[50px] -left-1/2 -top-1/2"></div>
    </div>
  );
};

export default SeasonCard;
