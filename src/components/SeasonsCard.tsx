"use client";

import useSeasonsStore from "@/store/useSeasonsStore";
import useRacesStore from "@/store/useRacesStore";
import React, { useEffect, useState } from "react";

const SeasonsCard: React.FC = () => {
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-4">
            {currentPageItems.map((season) => (
              <div key={season.season}>
                <div
                  className={`relative drop-shadow-xl w-48 h-64 overflow-hidden rounded-xl hover:bg-gray-700 hover:cursor-pointer transition-colors ${
                    selectedSeason === season.season
                      ? "ring-4 ring-[var(--f1-lilac)]"
                      : ""
                  }`}
                  onClick={() => handleSeasonClick(season.season)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSeasonClick(season.season);
                    }
                  }}
                >
                  <div className="absolute flex items-center justify-center text-white z-[1] opacity-90 rounded-xl inset-0.5 bg-[var(--f1-black)]">
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
              </div>
            ))}
          </div>

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

export default SeasonsCard;
