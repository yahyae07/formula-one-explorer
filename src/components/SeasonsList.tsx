"use client";

import useSeasonsStore from "@/store/useSeasonsStore";
import React, { useEffect } from "react";

const SeasonsList: React.FC = () => {
  const { seasons, setSeasons } = useSeasonsStore();

  useEffect(() => {
    console.log("Fetching seasons data...");

    const fetchSeasons = async () => {
      try {
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

  return (
    <div>
      <h1>Seasons</h1>
      {seasons.length === 0 ? (
        <p>Loading seasons...</p>
      ) : (
        <ul>
          {seasons.map((season) => (
            <li key={season.season}>{season.season}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SeasonsList;
