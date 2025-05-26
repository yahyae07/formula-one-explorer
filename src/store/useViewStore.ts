import { create } from 'zustand';

interface ViewStore {
    showCardView: boolean;
    toggleCardView: () => void;
    showListView: boolean;
    toggleListView: () => void;
}

const useViewStore = create<ViewStore>((set) => ({
    showCardView: true,
    toggleCardView: () => set((state) => ({ showCardView: !state.showCardView })),
    showListView: false,
    toggleListView: () => set((state) => ({ showListView: !state.showListView })),
}));

export default useViewStore;