import useRacesStore, { Race } from "@/store/useRacesStore";
import React from "react";
import { formatDate } from "./Races";
import { MdOutlinePushPin, MdPushPin } from "react-icons/md";

interface RaceListProps {
  race: Race;
  circuitImages: Record<string, string>;
  isPinned: boolean;
  onPinToggle: () => void;
  PinIcon: typeof MdPushPin;
  UnpinIcon: typeof MdOutlinePushPin;
}

const RaceList: React.FC<RaceListProps> = ({
  race,
  circuitImages,
  isPinned,
  onPinToggle,
  PinIcon,
  UnpinIcon,
}) => {
  const { selectRound, openModal } = useRacesStore();
  const handleViewParticipants = () => {
    selectRound(race.round);
    openModal();
  };
  const handlePinClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPinToggle();
  };
  return (
    <li className="p-4 bg-[var(--f1-black)] rounded-lg text-white opacity-90 border-b-4 border-[var(--f1-red)] mb-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-2">
          <h3 className="text-lg font-bold">{race.raceName}</h3>

          <div className="text-sm text-gray-300 mb-2">
            {race.Circuit.circuitName} - {formatDate(race.date)}
          </div>
          <div className="text-xs text-[var(--f1-lilac)]">
            Round {race.round}
          </div>

          <div className="mt-8 flex flex-row items-center gap-3">
            <div
              className="text-xs bg-[var(--f1-red)] inline-block px-3 py-2 rounded-md hover:cursor-pointer"
              onClick={handleViewParticipants}
            >
              View participants
            </div>
            {isPinned ? (
              <PinIcon
                className="cursor-pointer text-[var(--f1-white)]"
                onClick={handlePinClick}
              />
            ) : (
              <UnpinIcon
                className="cursor-pointer text-[var(--f1-white)]"
                onClick={handlePinClick}
              />
            )}
          </div>
        </div>

        <div className="md:w-64 h-32 overflow-hidden rounded-md border border-[var(--f1-darkgrey)]">
          <img
            src={`/circuits/${
              circuitImages[race.Circuit.circuitId] || "default.png"
            }`}
            alt={race.Circuit.circuitName}
            className="w-full h-full object-contain bg-[var(--f1-white)] p-1"
          />
        </div>
      </div>
    </li>
  );
};

export default RaceList;
