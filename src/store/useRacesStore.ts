import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Race {
    season: string;
    round: string;
    raceName: string;
    Circuit: {
        circuitId: string;
        circuitName: string;
        Location: {
            locality: string;
            country: string;
        }
    };
    date: string;
    time?: string;
}

interface RacesStore {
    selectedSeason: string | null;
    races: Race[];
    pinnedRaces: string[];
    selectSeason: (season: string) => void;
    setRaces: (races: Race[]) => void;
    togglePin: (raceId: string) => void;
    isPinned: (raceId: string) => boolean;
}

const useRacesStore = create<RacesStore>()(
    persist(
      (set, get) => ({
        selectedSeason: null,
        races: [],
        pinnedRaces: [],
        selectSeason: (season) => set({ selectedSeason: season }),
        setRaces: (races) => set({ races }),
        togglePin: (raceId) => set((state) => {
          const isPinned = state.pinnedRaces.includes(raceId);
          const pinnedRaces = isPinned
            ? state.pinnedRaces.filter(id => id !== raceId)
            : [...state.pinnedRaces, raceId];
          return { pinnedRaces };
        }),
        isPinned: (raceId) => get().pinnedRaces.includes(raceId),
      }),
      {
        name: 'races-storage',
        partialize: (state) => ({ pinnedRaces: state.pinnedRaces }),
      }
    )
  );

export default useRacesStore;