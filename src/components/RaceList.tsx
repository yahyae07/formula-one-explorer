import useRacesStore, { Race } from "@/store/useRacesStore";
import React from "react";
import { formatDate } from "./Races";
import { TiPinOutline, TiPin } from "react-icons/ti";
import RaceStatusChart from "./RaceStatusChart";

interface RaceListProps {
  race: Race;
  isPinned: boolean;
  onPinToggle: () => void;
  PinIcon: typeof TiPin;
  UnpinIcon: typeof TiPinOutline;
}

const RaceList: React.FC<RaceListProps> = ({
  race,
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
    <li className="p-4 bg-[var(--f1-black)] rounded-lg text-white opacity-90 border-b-4 border-[var(--f1-red)] mb-4 relative  w-[98%]">
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={handlePinClick}
          className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-[rgba(255,255,255,0.1)] rounded-full"
        >
          {isPinned ? (
            <PinIcon size={24} className="text-white" />
          ) : (
            <UnpinIcon size={24} className="text-white" />
          )}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-2">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-lg font-bold">{race.raceName}</h3>
          </div>

          <div className="text-sm text-gray-300 mb-2">
            {race.Circuit.circuitName} - {formatDate(race.date)}
          </div>
          <div className="text-xs text-[var(--f1-lilac)]">
            Round {race.round}
          </div>

          <div className="mt-14 flex flex-row items-center gap-3">
            <div
              className="text-xs bg-[var(--f1-red)] inline-block px-3 py-2 rounded-md hover:cursor-pointer"
              onClick={handleViewParticipants}
            >
              View participants
            </div>
          </div>
        </div>

        <RaceStatusChart season={race.season} round={race.round} />
      </div>
    </li>
  );
};

export default RaceList;
