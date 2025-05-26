"use client";

import React, { useEffect, useState } from "react";
import useRacesStore from "@/store/useRacesStore";
import useViewStore from "@/store/useViewStore";
import RaceCard from "./RaceCard";
import RaceList from "./RaceList";

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const Races: React.FC = () => {
  const { races, setRaces, selectedSeason } = useRacesStore();
  const { showCardView, showListView } = useViewStore();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(races.length / itemsPerPage);
  const pageStart = (currentPage - 1) * itemsPerPage;
  const pageEnd = pageStart + itemsPerPage;
  const currentPageItems = races.slice(pageStart, pageEnd);

  const circuitImages: Record<string, string> = {
    silverstone: "silverstone.png",
  };

  useEffect(() => {
    const fetchRaces = async () => {
      if (!selectedSeason) return;

      try {
        console.log(`Fetching races for season: ${selectedSeason}`);
        const response = await fetch(
          `https://ergast.com/api/f1/${selectedSeason}/races.json`
        );
        const data = await response.json();
        console.log("Fetched races:", data.MRData.RaceTable.Races);
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

  const showAsCards = showCardView && !showListView;

  if (!selectedSeason) {
    return (
      <div className="font-bold text-xl text-[var(--f1-red)] mt-6">
        Please select a season to view races
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4 text-[var(--f1-red)]">
        Races for {selectedSeason} Season
      </h2>
      {races.length === 0 ? (
        <p className="text-white">Loading races...</p>
      ) : (
        <>
          {showAsCards ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {currentPageItems.map((race) => (
                <RaceCard
                  key={race.round}
                  race={race}
                  circuitImages={circuitImages}
                />
              ))}
            </div>
          ) : (
            <ul>
              {currentPageItems.map((race) => (
                <RaceList
                  key={race.round}
                  race={race}
                  circuitImages={circuitImages}
                />
              ))}
            </ul>
          )}

          <div className="flex items-center justify-center space-x-1 my-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-[var(--f1-black)] text-white rounded-md disabled:opacity-50 hover:bg-gray-700 cursor-pointer disabled:cursor-not-allowed"
            >
              Previous
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
              className="px-3 py-1 bg-[var(--f1-black)] text-white rounded-md disabled:opacity-50 hover:bg-gray-700 cursor-pointer disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Races;
