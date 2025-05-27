import { Race } from "@/store/useRacesStore";
import React from "react";
import { formatDate } from "./Races";
import { MdOutlinePushPin, MdPushPin } from "react-icons/md";

interface RaceCardProps {
  race: Race;
  circuitImages: Record<string, string>;
  isPinned: boolean;
  onPinToggle: () => void;
  PinIcon: typeof MdPushPin;
  UnpinIcon: typeof MdOutlinePushPin;
}

const RaceCard: React.FC<RaceCardProps> = ({
  race,
  circuitImages,
  isPinned,
  onPinToggle,
  PinIcon,
  UnpinIcon,
}) => {
  const handlePinClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPinToggle();
  };

  return (
    <div className="relative drop-shadow-xl w-full h-64 overflow-hidden rounded-xl">
      <div className="absolute flex flex-col justify-between text-white opacity-90 rounded-xl inset-0.5 bg-[var(--f1-black)] p-4">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold">{race.raceName}</h3>
            {isPinned ? (
              <PinIcon
                className="mt-2 cursor-pointer"
                onClick={handlePinClick}
              />
            ) : (
              <UnpinIcon
                className="mt-2 cursor-pointer"
                onClick={handlePinClick}
              />
            )}
          </div>
          <div className="text-xs text-gray-300 mt-1">
            {race.Circuit.circuitName} <br />
            {formatDate(race.date)}
          </div>
          <div className="text-xs text-[var(--f1-lilac)] mt-1">
            Round {race.round}
          </div>
        </div>

        <div className="flex justify-center items-center my-1">
          <div className="w-full h-24 overflow-hidden rounded-md border border-[var(--f1-darkgrey)]">
            <img
              src={`/circuits/${
                circuitImages[race.Circuit.circuitId] || "default.png"
              }`}
              alt={race.Circuit.circuitName}
              className="w-full h-full object-contain bg-[var(--f1-white)] p-1"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <div className="text-xs bg-[var(--f1-red)] px-3 py-2 rounded-md hover:cursor-pointer">
            View participants
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaceCard;
function onPinToggle() {
  throw new Error("Function not implemented.");
}
