import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Race {
    season: string;
    round: string;
    raceName: string;
    Circuit: {
        circuitId: string;
        circuitName: string;
    };
    date: string;
}

export interface Participant {
    position: string;
    Driver: {
      driverId: string;
      givenName: string;
      familyName: string;
      nationality: string;
    }
  Constructor: {
    constructorId: string;
    name: string;
  }
  laps: string;
  time: {
    millis: string;
    time: string;
  }
  points: string;
  status: string;
}

interface RacesStore {
  selectedSeason: string | null;
  selectedRound: string | null;
  races: Race[];
  pinnedRaces: string[];
  raceResults: Participant[];
  isModalOpen: boolean;
  selectSeason: (season: string) => void;
  selectRound: (round: string) => void;
  clearSelectedRound: () => void;
  setRaces: (races: Race[]) => void;
  setRaceResults: (results: Participant[]) => void;
  togglePin: (raceId: string) => void;
  isPinned: (raceId: string) => boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useRacesStore = create<RacesStore>()(
    persist(
      (set, get) => ({
        selectedSeason: null,
        selectedRound: null,
        races: [],
        pinnedRaces: [],
        raceResults: [],
        isModalOpen: false,
        selectSeason: (season) => set({ selectedSeason: season }),
        selectRound: (round) => set({ selectedRound: round }),
        clearSelectedRound: () => set({ selectedRound: null }),
        setRaces: (races) => set({ races }),
        setRaceResults: (results) => set({ raceResults: results }),
        togglePin: (raceId) => set((state) => {
          const isPinned = state.pinnedRaces.includes(raceId);
          const pinnedRaces = isPinned
            ? state.pinnedRaces.filter(id => id !== raceId)
            : [...state.pinnedRaces, raceId];
          return { pinnedRaces };
        }),
        isPinned: (raceId) => get().pinnedRaces.includes(raceId),
        openModal: () => set({ isModalOpen: true }),
        closeModal: () => set({ isModalOpen: false }),
      }),
      {
        name: 'races-storage',
        partialize: (state) => ({ pinnedRaces: state.pinnedRaces }),
      }
    )
  );

export default useRacesStore;