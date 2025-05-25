"use client";

import useSeasonsStore from "@/store/useSeasonsStore";
import useRacesStore from "@/store/useRacesStore";
import React, { useEffect } from "react";

const SeasonsList: React.FC = () => {
  const { seasons, setSeasons } = useSeasonsStore();
  const { selectSeason, selectedSeason } = useRacesStore();

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        console.log("Fetching seasons data...");
        const response = await fetch("https://ergast.com/api/f1/seasons.json");
        const data = await response.json();
        console.log("Fetched seasons:", data.MRData.SeasonTable.Seasons);
        setSeasons(data.MRData.SeasonTable.Seasons);
      } catch (error) {
        console.error("Error fetching seasons:", error);
      }
    };
    fetchSeasons();
  }, [setSeasons]);

  const handleSeasonClick = (season: string) => {
    selectSeason(season);
  };

  return (
    <div>
      <h1>Seasons</h1>
      {seasons.length === 0 ? (
        <p>Loading seasons...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {seasons.map((season) => (
            <div key={season.season}>
              <button
                onClick={() => {
                  handleSeasonClick(season.season);
                  console.log(`Selected season: ${season.season}`);
                }}
                className={`w-full h-12 flex items-center justify-center text-center ${
                  selectedSeason === season.season
                    ? "text-white bg-gray-800"
                    : "text-blue-500 bg-[#3d3c3d] hover:bg-gray-800"
                } border transition-colors relative drop-shadow-xl w-48 h-64 overflow-hidden rounded-xl bg-[#3d3c3d] text-white`}
              >
                Season {season.season}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SeasonsList;
