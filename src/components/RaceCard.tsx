import useRacesStore, { Race } from "@/store/useRacesStore";
import React from "react";
import { formatDate } from "./Races";
import { MdOutlinePushPin, MdPushPin } from "react-icons/md";
import RaceStatusChart from "./RaceStatusChart";

interface RaceCardProps {
  race: Race;
  isPinned: boolean;
  onPinToggle: () => void;
  PinIcon: typeof MdPushPin;
  UnpinIcon: typeof MdOutlinePushPin;
}

const RaceCard: React.FC<RaceCardProps> = ({
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
    <div className="relative drop-shadow-xl w-full h-86 overflow-hidden rounded-xl">
      <div className="absolute flex flex-col justify-between text-white opacity-90 rounded-xl inset-0.5 bg-[var(--f1-black)] p-4  w-[92.5%] border-b-4 border-[var(--f1-red)]">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold">{race.raceName}</h3>
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
          <div className="text-xs text-gray-300 mt-1">
            {race.Circuit.circuitName} <br />
            {formatDate(race.date)}
          </div>
          <div className="text-xs text-[var(--f1-lilac)] mt-1">
            Round {race.round}
          </div>
        </div>
        <RaceStatusChart season={race.season} round={race.round} />

        <div className="flex justify-end">
          <div
            className="text-xs bg-[var(--f1-red)] px-3 py-2 rounded-md hover:cursor-pointer"
            onClick={handleViewParticipants}
          >
            View participants
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaceCard;
