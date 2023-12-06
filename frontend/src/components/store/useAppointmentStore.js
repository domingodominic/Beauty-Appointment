import { create } from "zustand";

const useAppointmentStore = create((set) => ({
  municipality: "",
  branch: "",
  services: [],
  chosenService: {},
  price: 0,
  date: "",
  availableTime: [],
  time: "",
  branchID: "",

  setMunicipality: (municipality) => set({ municipality }),
  setBranch: (branch) => set({ branch }),
  setServices: (services) => set({ services }),
  setChosenService: (chosenService) => set({ chosenService }),
  setPrice: (price) => set({ price }),
  setTime: (time) => set({ time }),
  setBranchID: (branchID) => set({ branchID }),
  setAvailableTime: (availableTime) => set({ availableTime }),
  setDate: (date) => set({ date }),
}));

export default useAppointmentStore;
