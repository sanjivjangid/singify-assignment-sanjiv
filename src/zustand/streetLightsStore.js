import { create } from "zustand";

// file to load and save street lights data. for this demo no db config on backend, adding data to zustand store only. 
const useStreetLightsStore = create((set) => ({
  data: [],
  loading: false,
  error: null,
  fetchLights: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/street/lights");
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      const resJson = await res.json();
      set({ data: resJson.data, loading: false });
    } catch (error) {
      set({
        error: { message: "Error: unable to fetch street lights", error },
        loading: false,
      });
    }
  },
  addLight: async (saveObj) => {
    set((state) => {
      return { data: [...state.data, saveObj] };
    });
  },
}));

export default useStreetLightsStore;
