import { Season } from "@/store/useSeasonsStore";
import React from "react";

interface SeasonListProps {
  season: Season;
  isSelected: boolean;
  onSelect: (season: string) => void;
}

const SeasonList: React.FC<SeasonListProps> = ({
  season,
  isSelected,
  onSelect,
}) => {
  return (
    <li
      onClick={() => onSelect(season.season)}
      className={`relative p-4 rounded-xl drop-shadow-lg cursor-pointer transition-all duration-200 overflow-hidden 
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
      <div className="absolute inset-0 bg-[var(--f1-black)] opacity-90 -z-10"></div>

      <div className="flex justify-between items-center relative z-10">
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

      <div className="absolute w-56 h-48 bg-white blur-[50px] -left-1/2 -top-1/2 opacity-5"></div>
    </li>
  );
};

export default SeasonList;
