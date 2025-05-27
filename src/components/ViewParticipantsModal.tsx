import React, { useEffect } from "react";
import useRacesStore from "@/store/useRacesStore";
import { MdClose } from "react-icons/md";

const ViewParticipantsModal: React.FC = () => {
  const {
    selectedSeason,
    selectedRound,
    raceResults,
    setRaceResults,
    isModalOpen,
    closeModal,
  } = useRacesStore();

  useEffect(() => {
    const fetchRaceResults = async () => {
      if (!isModalOpen || !selectedSeason || !selectedRound) return;

      try {
        const response = await fetch(
          `https://ergast.com/api/f1/${selectedSeason}/${selectedRound}/results.json`
        );
        const data = await response.json();
        const results = data.MRData.RaceTable.Races[0]?.Results || [];
        setRaceResults(results);
      } catch (error) {
        console.error("Error fetching race results:", error);
      }
    };

    fetchRaceResults();
  }, [selectedSeason, selectedRound, isModalOpen]);

  if (!isModalOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex bg-[var(--f1-black)]/75 items-center justify-center z-50">
      <div className="bg-[var(--f1-darkgrey)] border-2 border-[var(--f1-darkgrey)] rounded-xl w-10/12 h-11/12 overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-[var(--f1-grey)]">
          <h2 className="text-xl text-white font-bold">
            Round {selectedRound} Results
          </h2>
          <button
            onClick={closeModal}
            className="text-white hover:text-[var(--f1-red)] p-1 rounded-full hover:cursor-pointer"
          >
            <MdClose size={24} />
          </button>
        </div>

        <div className="p-4">
          {raceResults.length === 0 ? (
            <p className="text-white text-center py-8">Loading results...</p>
          ) : (
            <>
              <div className="space-y-2">
                <div className="p-4 rounded-lg text-white opacity-90">
                  <div className="grid grid-cols-7 gap-4 w-full items-center">
                    <h2>Position</h2>
                    <h2>Name</h2>
                    <h2>Team</h2>
                    <h2>Nationality</h2>
                    <h2>Laps</h2>
                    <h2>Status</h2>
                    <h2>Points</h2>
                  </div>
                </div>
                {raceResults.map((result) => (
                  <div
                    key={result.Driver.driverId}
                    className="p-4 bg-[var(--f1-black)] rounded-lg text-white opacity-90 border-b-4 border-[var(--f1-red)] mb-2"
                  >
                    <div className="grid grid-cols-7 gap-4 w-full items-center">
                      <h2 className="">
                        {result.position === "1"
                          ? "Pole Position"
                          : "P" + result.position}
                      </h2>
                      <div className="text-sm text-gray-300">
                        {result.Driver.givenName} {result.Driver.familyName}
                      </div>
                      <div className="text-sm text-gray-300">
                        {result.Constructor.name}
                      </div>
                      <div className="text-sm text-gray-300">
                        {result.Driver.nationality}
                      </div>
                      <div className="text-sm text-gray-300">{result.laps}</div>
                      <div className="text-sm text-gray-300">
                        {result.time?.time || result.status}
                      </div>
                      <div className="text-sm text-gray-300">
                        {result.points}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewParticipantsModal;
