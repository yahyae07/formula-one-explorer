import React, { useEffect } from "react";
import useRacesStore from "@/store/useRacesStore";
import { MdClose } from "react-icons/md";

const ViewParticipantsModal: React.FC = () => {
  // Using Zustand store to retrieve the selected season, selected round, and race results to manage the state of the modal displaying
  const {
    selectedSeason,
    selectedRound,
    raceResults,
    setRaceResults,
    isModalOpen,
    closeModal,
  } = useRacesStore();

  // Fetch race results when the modal is opened
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

  // If the modal is not open, return null to avoid rendering
  if (!isModalOpen) {
    return null;
  }

  return (
    // Modal container with a dark background and centered content
    <div className="fixed inset-0 flex bg-[var(--f1-black)]/75 items-center justify-center z-50">
      <div className="bg-[var(--f1-specialgrey)] border-2 border-[var(--f1-darkgrey)] rounded-xl w-10/12 h-11/12 overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-[var(--f1-red)]">
          {/* Modal header */}
          <h2 className="text-xl text-[var(--f1-red)] font-bold">
            Round {selectedRound} Results
          </h2>
          <button
            onClick={closeModal}
            className="text-[var(--f1-red)] p-1 rounded-full hover:cursor-pointer"
          >
            <MdClose size={24} />
          </button>
        </div>

        {/* Modal body */}
        <div className="p-4">
          {raceResults.length === 0 ? (
            <p className="text-center py-8 text-[var(--f1-red)]]">
              Loading results...
            </p>
          ) : (
            <>
              {/* Race results table header */}
              <div className="space-y-2">
                <div className="p-4 rounded-lg opacity-90">
                  <div className="grid grid-cols-8 gap-4 w-full items-center text-[var(--f1-red)] font-bold">
                    <h2>Position</h2>
                    <h2>Name</h2>
                    <h2>Team</h2>
                    <h2>Nationality</h2>
                    <h2>Laps</h2>
                    <h2>Status</h2>
                    <h2>Time</h2>
                    <h2>Points</h2>
                  </div>
                </div>
                {/* Race results */}
                {raceResults.map((result) => (
                  <div
                    key={result.Driver.driverId}
                    className="p-4 bg-[var(--f1-black)] rounded-lg text-white opacity-90 border-b-4 border-[var(--f1-red)] mb-2"
                  >
                    <div className="grid grid-cols-8 gap-4 w-full items-center">
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
                        {result.status}
                      </div>
                      <div className="text-sm text-gray-300">
                        {result.Time?.time || "N/A"}
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
