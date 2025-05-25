"use client";

import React, { useEffect } from "react";
import useSeasonsStore from "@/store/useSeasonsStore";
import useRacesStore from "@/store/useRacesStore";

const RacesList: React.FC = () => {
  const { races, setRaces, selectedSeason } = useRacesStore();

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
      } catch (error) {
        console.error("Error fetching races:", error);
      }
    };
    fetchRaces();
  }, [selectedSeason, setRaces]);

  if (!selectedSeason) {
    return <div>Please select a season to view races</div>;
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">
        Races for {selectedSeason} Season
      </h2>
      {races.length === 0 ? (
        <p>Loading races...</p>
      ) : (
        <ul className="space-y-2">
          {races.map((race) => (
            <li key={race.round} className="p-3 bg-gray-50 rounded-md border">
              <div className="font-medium">{race.raceName}</div>
              <div className="text-sm text-gray-600">
                {race.Circuit.circuitName} - {formatDate(race.date)}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RacesList;
