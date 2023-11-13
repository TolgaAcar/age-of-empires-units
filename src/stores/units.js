import { defineStore } from "pinia";

export const useUnitsStore = defineStore({
  id: "units",
  state: () => ({
    units: [],
    ageFilter: "All",
    filteredCostTypes: [],
    filteredCostRanges: {
      Food: [0, 200],
      Wood: [0, 200],
      Gold: [0, 200]
    }
  }),
  getters: {
    getUnits: (state) => state.units,
    getAgeFilter: (state) => state.ageFilter,
    getFilteredCostTypes: (state) => state.filteredCostTypes,
    getFilteredCostRanges: (state) => state.filteredCostRanges
  },
  actions: {
    setUnits(units) {
      this.units = units;
    },
    getUnitById(id) {
      return this.units.find((obj) => obj.id === id);
    },
    setAgeFilter(ageFilter) {
      this.ageFilter = ageFilter;
    },
    setFilteredCostTypes(filteredCostTypes) {
      this.filteredCostTypes = filteredCostTypes;
    },
    setFilteredCostRanges(filteredCostRanges) {
      this.filteredCostRanges = filteredCostRanges;
    }
  }
});
