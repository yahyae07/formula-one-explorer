import { create } from 'zustand';

interface Race {
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
    selectSeason: (season: string) => void;
    setRaces: (races: Race[]) => void;
}

const useRacesStore = create<RacesStore>((set) => ({
    selectedSeason: null,
    races: [],
    selectSeason: (season) => set({ selectedSeason: season }),
    setRaces: (races) => set({ races }),
}));

export default useRacesStore;