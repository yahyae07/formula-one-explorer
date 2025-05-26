import {create} from 'zustand';

interface Season {
    season: string;
    url: string;
}

interface SeasonsStore {
    seasons: Season[];
    setSeasons: (seasons: Season[]) => void;
}

const useSeasonsStore = create<SeasonsStore>((set) => ({
    seasons: [],
    setSeasons: (seasons) => set({ seasons }),
}));

export default useSeasonsStore;