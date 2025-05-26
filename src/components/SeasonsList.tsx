"use client";

import useSeasonsStore from "@/store/useSeasonsStore";
import useRacesStore from "@/store/useRacesStore";
import React, { useEffect, useState } from "react";

const SeasonsList: React.FC = () => {
  const { seasons, setSeasons } = useSeasonsStore();
  const { selectSeason, selectedSeason } = useRacesStore();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(seasons.length / itemsPerPage);
  const pageStart = (currentPage - 1) * itemsPerPage;
  const pageEnd = pageStart + itemsPerPage;
  const currentPageItems = seasons.slice(pageStart, pageEnd);

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        console.log("Fetching seasons data...");
        const response = await fetch("https://ergast.com/api/f1/seasons.json");
        const data = await response.json();
        console.log("Fetched seasons:", data.MRData.SeasonTable.Seasons);
        const sortedSeasons = [...data.MRData.SeasonTable.Seasons].sort(
          (a, b) => parseInt(b.season) - parseInt(a.season)
        );

        setSeasons(sortedSeasons);
      } catch (error) {
        console.error("Error fetching seasons:", error);
      }
    };
    fetchSeasons();
  }, []);

  const handleSeasonClick = (season: string) => {
    selectSeason(season);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-[var(--f1-red)]">
        F1 Seasons
      </h1>
      {seasons.length === 0 ? (
        <p className="text-white text-xl font-bold">Loading seasons...</p>
      ) : (
        <>
          <ul className="space-y-3 mb-4">
            {currentPageItems.map((season) => (
              <li
                key={season.season}
                onClick={() => handleSeasonClick(season.season)}
                className={`relative p-4 rounded-xl drop-shadow-lg cursor-pointer transition-all duration-200 overflow-hidden 
                  ${
                    selectedSeason === season.season
                      ? "ring-4 ring-[var(--f1-lilac)]"
                      : "hover:bg-gray-700"
                  }
                `}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSeasonClick(season.season);
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
            ))}
          </ul>

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
                        ? "bg-[var(--f1-lilac)] text-white"
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

export default SeasonsList;
