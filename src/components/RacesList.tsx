"use client";

import React, { useEffect, useState } from "react";
import useSeasonsStore from "@/store/useSeasonsStore";
import useRacesStore from "@/store/useRacesStore";

const RacesList: React.FC = () => {
  const { races, setRaces, selectedSeason } = useRacesStore();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
  }, [selectedSeason, setRaces]);

  const totalPages = Math.ceil(races.length / itemsPerPage);
  const pageStart = (currentPage - 1) * itemsPerPage;
  const pageEnd = pageStart + itemsPerPage;
  const currentPageItems = races.slice(pageStart, pageEnd);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  if (!selectedSeason) {
    return (
      <div className="text-white font-bold text-xl">
        Please select a season to view races
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4 text-white">
        Races for {selectedSeason} Season
      </h2>
      {races.length === 0 ? (
        <p className="text-white">Loading races...</p>
      ) : (
        <>
          <ul className="space-y-1">
            {currentPageItems.map((race) => (
              <li
                key={race.round}
                className="p-3 bg-[#3d3c3d] rounded-md text-white border-b-2 border-gray-400"
              >
                <div className="font-medium">{race.raceName}</div>
                <div className="text-sm text-gray-400">
                  {race.Circuit.circuitName} - {formatDate(race.date)}
                </div>
              </li>
            ))}
          </ul>
          {
            <div className="flex items-center justify-center space-x-1 my-4">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-700 text-white rounded-md disabled:opacity-50 hover:bg-gray-600 cursor-pointer disabled:cursor-not-allowed"
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
                          ? "bg-violet-500 text-white"
                          : "bg-gray-600 text-white hover:bg-gray-500"
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
                className="px-3 py-1 bg-gray-700 text-white rounded-md disabled:opacity-50 hover:bg-gray-600 cursor-pointer disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          }
        </>
      )}
    </div>
  );
};

export default RacesList;
