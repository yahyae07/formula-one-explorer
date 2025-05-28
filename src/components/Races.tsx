"use client";

import React, { useEffect, useState } from "react";
import useRacesStore from "@/store/useRacesStore";
import useViewStore from "@/store/useViewStore";
import RaceCard from "./RaceCard";
import RaceList from "./RaceList";
import { MdPushPin, MdOutlinePushPin } from "react-icons/md";
import ViewParticipantsModal from "./ViewParticipantsModal";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { TiPinOutline, TiPin } from "react-icons/ti";

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const Races: React.FC = () => {
  const { races, setRaces, selectedSeason, pinnedRaces, togglePin, isPinned } =
    useRacesStore();
  const { showCardView, showListView } = useViewStore();
  const [currentPage, setCurrentPage] = useState(1);
  const showAsCards = showCardView && !showListView;
  const itemsPerPage = showAsCards ? 6 : 3;
  const sortedRaces = [...races].sort((a, b) => {
    const aIsPinned = isPinned(`${a.season}-${a.round}`);
    const bIsPinned = isPinned(`${b.season}-${b.round}`);
    if (aIsPinned && !bIsPinned) return -1;
    if (!aIsPinned && bIsPinned) return 1;
    return 0;
  });

  const totalPages = Math.ceil(sortedRaces.length / itemsPerPage);
  const pageStart = (currentPage - 1) * itemsPerPage;
  const pageEnd = pageStart + itemsPerPage;
  const currentPageItems = sortedRaces.slice(pageStart, pageEnd);

  useEffect(() => {
    const fetchRaces = async () => {
      if (!selectedSeason) return;

      try {
        const response = await fetch(
          `https://ergast.com/api/f1/${selectedSeason}/races.json`
        );
        const data = await response.json();
        setRaces(data.MRData.RaceTable.Races);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching races:", error);
      }
    };
    fetchRaces();
  }, [selectedSeason]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  if (!selectedSeason) {
    return (
      <div className="font-bold text-2xl text-[var(--f1-red)] mt-6">
        Please select a season to view races
      </div>
    );
  }

  return (
    <div id="races-section" className="mt-6 relative">
      <div className="relative mb-4">
        <h1 className="text-2xl font-bold text-[var(--f1-red)] relative inline-block pr-4 bg-[var(--f1-grey)] z-10">
          {selectedSeason} RACES
        </h1>
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[var(--f1-red)] -z-0"></div>
      </div>
      <div className="absolute top-[1rem] right-0 w-0.5 bg-[var(--f1-red)] h-[calc(100%-4rem)]" />
      {races.length === 0 ? (
        <p className="text-[var(--f1-red)] text-xl font-bold">
          Loading races...
        </p>
      ) : (
        <>
          {showAsCards ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {currentPageItems.map((race) => (
                <RaceCard
                  key={race.round}
                  race={race}
                  isPinned={pinnedRaces.includes(
                    `${race.season}-${race.round}`
                  )}
                  onPinToggle={() => togglePin(`${race.season}-${race.round}`)}
                  PinIcon={MdPushPin}
                  UnpinIcon={MdOutlinePushPin}
                />
              ))}
            </div>
          ) : (
            <ul>
              {currentPageItems.map((race) => (
                <RaceList
                  key={race.round}
                  race={race}
                  isPinned={pinnedRaces.includes(
                    `${race.season}-${race.round}`
                  )}
                  onPinToggle={() => togglePin(`${race.season}-${race.round}`)}
                  PinIcon={TiPin}
                  UnpinIcon={TiPinOutline}
                />
              ))}
            </ul>
          )}

          <div className="flex items-center justify-center space-x-1 my-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="px-2 py-1 bg-[var(--f1-black)] text-white rounded-md disabled:opacity-50 hover:bg-gray-700 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center"
            >
              <IoIosArrowBack size={24} />
            </button>

            <div className="flex space-x-1">
              {Array.from({ length: totalPages }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => paginate(pageNum)}
                    className={`w-8 h-8 flex items-center justify-center rounded-md cursor-pointer ${
                      currentPage === pageNum
                        ? "bg-[var(--f1-red)] text-white"
                        : "bg-[var(--f1-black)] text-white hover:bg-gray-700"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="px-2 py-1 bg-[var(--f1-black)] text-white rounded-md disabled:opacity-50 hover:bg-gray-700 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center"
            >
              <IoIosArrowForward size={24} />
            </button>
          </div>
        </>
      )}
      <ViewParticipantsModal />
    </div>
  );
};

export default Races;
