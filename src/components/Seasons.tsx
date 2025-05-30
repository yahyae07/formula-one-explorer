"use client";

import useSeasonsStore from "@/store/useSeasonsStore";
import useRacesStore from "@/store/useRacesStore";
import useViewStore from "@/store/useViewStore";
import React, { useEffect, useState } from "react";
import SeasonCard from "./SeasonCard";
import SeasonList from "./SeasonList";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Seasons: React.FC = () => {
  // Using Zustand stores to manage states of seasons, selected season, and view mode allowing global state management across the application
  const { seasons, setSeasons } = useSeasonsStore();
  const { selectSeason, selectedSeason } = useRacesStore();
  const { showCardView, showListView } = useViewStore();
  // Local state to manage pagination
  const [currentPage, setCurrentPage] = useState(1);
  // Determine if seasons should be displayed as cards or list based on the view mode
  const showAsCards = showCardView && !showListView;
  const itemsPerPage = showAsCards ? 10 : 7;
  // Calculate total pages based on the number of seasons and per page and slice the seasons array to get the items for the current page
  const totalPages = Math.ceil(seasons.length / itemsPerPage);
  const pageStart = (currentPage - 1) * itemsPerPage;
  const pageEnd = pageStart + itemsPerPage;
  const currentPageItems = seasons.slice(pageStart, pageEnd);

  // Reset current page to 1 whenever the view mode changes to ensure consistent pagination due to the different number of items displayed per page
  useEffect(() => {
    setCurrentPage(1);
  }, [showCardView, showListView]);

  // Fetch seasons from the API when the component mounts and sort them in descending order by season year, storing them in the Zustand store for global access
  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const response = await fetch("https://ergast.com/api/f1/seasons.json");
        const data = await response.json();
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

  // Handle season selection and animation scroll after a season is clicked
  const handleSeasonClick = (season: string) => {
    selectSeason(season);
    setTimeout(() => {
      const racesSection = document.getElementById("races-section");
      if (racesSection) {
        racesSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 500);
  };

  // Pagination functions to navigate through the pages
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="relative">
      {/* Header section for the seasons */}
      <div className="relative mb-8">
        <h1 className="text-2xl font-bold text-[var(--f1-red)] relative inline-block pr-4 bg-[var(--f1-specialgrey)] z-10">
          SEASONS
        </h1>
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[var(--f1-red)] -z-0"></div>
      </div>
      <div className="absolute top-[1rem] right-0 w-0.5 bg-[var(--f1-red)] h-[calc(100%-4rem)]" />

      {/* Loading state */}
      {seasons.length === 0 ? (
        <p className="text-[var(--f1-red)] text-xl font-bold">
          Loading seasons...
        </p>
      ) : (
        <>
          {/* Display seasons either as cards or list based on the view mode */}
          {showAsCards ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-4">
              {currentPageItems.map((season) => (
                <div key={season.season}>
                  <SeasonCard
                    season={season}
                    isSelected={selectedSeason === season.season}
                    onSelect={handleSeasonClick}
                  />
                </div>
              ))}
            </div>
          ) : (
            <ul className="space-y-3 mb-4">
              {currentPageItems.map((season) => (
                <SeasonList
                  key={season.season}
                  season={season}
                  isSelected={selectedSeason === season.season}
                  onSelect={handleSeasonClick}
                />
              ))}
            </ul>
          )}

          {/* Pagination controls */}
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
              className="px-2 py-1 bg-[var(--f1-black)] text-white rounded-md disabled:opacity-50 hover:bg-gray-700 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center"
            >
              <IoIosArrowForward size={24} />
            </button>
          </div>
          {!showAsCards && <div className="mb-13"></div>}
        </>
      )}
    </div>
  );
};

export default Seasons;
