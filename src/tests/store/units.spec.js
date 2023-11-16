import { describe, it, expect, beforeEach } from "vitest";

import { setActivePinia, createPinia } from "pinia";
import { useUnitsStore } from "@/stores/units";

const dummyUnitsList = [
  {
    id: 1,
    name: "Archer",
    description: "Quick and light. Weak at close range; excels at battle from distance",
    expansion: "Age of Kings",
    age: "Feudal",
    cost: {
      Wood: 25,
      Gold: 45
    },
    build_time: 35,
    reload_time: 2,
    attack_delay: 0.35,
    movement_rate: 0.96,
    line_of_sight: 6,
    hit_points: 4,
    range: 30,
    attack: 4,
    armor: "0/0",
    accuracy: "80%"
  }
];

const dummyUnitsList2 = [
  {
    id: 1,
    name: "Archer",
    description: "Quick and light. Weak at close range; excels at battle from distance",
    expansion: "Age of Kings",
    age: "Feudal",
    cost: {
      Wood: 25,
      Gold: 45
    },
    build_time: 35,
    reload_time: 2,
    attack_delay: 0.35,
    movement_rate: 0.96,
    line_of_sight: 6,
    hit_points: 4,
    range: 30,
    attack: 4,
    armor: "0/0",
    accuracy: "80%"
  },
  {
    id: 2,
    name: "Crossbowman",
    description: "Upgraded archer",
    expansion: "Age of Kings",
    age: "Castle",
    cost: {
      Wood: 25,
      Gold: 45
    },
    build_time: 27,
    reload_time: 2,
    attack_delay: 0.35,
    movement_rate: 0.96,
    line_of_sight: 7,
    hit_points: 35,
    range: 5,
    attack: 5,
    armor: "0/0",
    attack_bonus: ["+3 spearmen"],
    accuracy: "85%"
  }
];

describe("Units Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("Units", () => {
    it("initial value of units is []", () => {
      const unitsStore = useUnitsStore();

      expect(unitsStore.units).toStrictEqual([]);
    });

    it("setUnits should update the units array", () => {
      const unitsStore = useUnitsStore();

      unitsStore.setUnits(dummyUnitsList);
      expect(unitsStore.units).toStrictEqual(dummyUnitsList);
    });

    it("getUnits getter should return the current value of units", () => {
      const unitsStore = useUnitsStore();
      expect(unitsStore.getUnits).toStrictEqual([]);

      unitsStore.setUnits(dummyUnitsList);
      expect(unitsStore.getUnits).toStrictEqual(dummyUnitsList);
    });

    it("getUnitById should return the correct unit with valid and matched ID", () => {
      const validId = 2;
      const validUnitItem = dummyUnitsList2[1];

      const unitsStore = useUnitsStore();

      unitsStore.setUnits(dummyUnitsList2);
      expect(unitsStore.getUnitById(validId)).toStrictEqual(validUnitItem);
    });

    it("getUnitById should return undefined for a non-existent ID", () => {
      const invalidId = 99;
      const unitsStore = useUnitsStore();

      unitsStore.setUnits(dummyUnitsList2);
      expect(unitsStore.getUnitById(invalidId)).toBeUndefined();
    });

    it("getUnitById should return undefined for null ID", () => {
      const invalidId = null;
      const unitsStore = useUnitsStore();

      unitsStore.setUnits(dummyUnitsList2);
      expect(unitsStore.getUnitById(invalidId)).toBeUndefined();
    });

    it("getUnitById should return undefined for undefined ID", () => {
      const unitsStore = useUnitsStore();

      unitsStore.setUnits(dummyUnitsList2);
      expect(unitsStore.getUnitById()).toBeUndefined();
    });

    it("getUnitById should return undefined for empty units array", () => {
      const validId = 2;
      const unitsStore = useUnitsStore();

      expect(unitsStore.getUnitById(validId)).toBeUndefined();
    });
  });

  describe("AgeFilter", () => {
    it("initial value of ageFilter is All", () => {
      const unitsStore = useUnitsStore();

      expect(unitsStore.ageFilter).toBe("All");
    });

    it("setAgeFilter should update the ageFilter", () => {
      const validAge = "Feudal";
      const unitsStore = useUnitsStore();

      unitsStore.setAgeFilter(validAge);
      expect(unitsStore.ageFilter).toBe(validAge);
    });

    it("getAgeFilter getter should return the current value of ageFilter", () => {
      const validAge = "Feudal";

      const unitsStore = useUnitsStore();
      expect(unitsStore.getAgeFilter).toStrictEqual("All");

      unitsStore.setAgeFilter(validAge);
      expect(unitsStore.getAgeFilter).toBe(validAge);
    });
  });

  describe("FilteredCostTypes", () => {
    it("initial value of filteredCostTypes is []", () => {
      const unitsStore = useUnitsStore();

      expect(unitsStore.filteredCostTypes).toStrictEqual([]);
    });

    it("setFilteredCostTypes should update the filteredCostTypes", () => {
      const validFilteredCostTypes = ["Dark", "Castle"];
      const unitsStore = useUnitsStore();

      unitsStore.setFilteredCostTypes(validFilteredCostTypes);
      expect(unitsStore.filteredCostTypes).toStrictEqual(validFilteredCostTypes);
    });

    it("getFilteredCostTypes getter should return the current value of filteredCostTypes", () => {
      const validFilteredCostTypes = ["Dark", "Castle"];
      const unitsStore = useUnitsStore();

      expect(unitsStore.getFilteredCostTypes).toStrictEqual([]);

      unitsStore.setFilteredCostTypes(validFilteredCostTypes);
      expect(unitsStore.getFilteredCostTypes).toStrictEqual(validFilteredCostTypes);
    });
  });

  describe("FilteredCostRanges", () => {
    it("initial value of filteredCostRanges should set", () => {
      const initialValue = {
        Food: [0, 200],
        Wood: [0, 200],
        Gold: [0, 200]
      };
      const unitsStore = useUnitsStore();

      expect(unitsStore.filteredCostRanges).toStrictEqual(initialValue);
    });

    it("setFilteredCostRanges should update the filteredCostRanges", () => {
      const validFilteredCostRanges = {
        Food: [50, 100],
        Wood: [20, 90],
        Gold: [10, 90]
      };
      const unitsStore = useUnitsStore();

      unitsStore.setFilteredCostRanges(validFilteredCostRanges);
      expect(unitsStore.filteredCostRanges).toStrictEqual(validFilteredCostRanges);
    });

    it("getFilteredCostRanges getter should return the current value of filteredCostRanges", () => {
      const initialValue = {
        Food: [0, 200],
        Wood: [0, 200],
        Gold: [0, 200]
      };
      const validFilteredCostRanges = {
        Food: [50, 100],
        Wood: [20, 90],
        Gold: [10, 90]
      };
      const unitsStore = useUnitsStore();

      expect(unitsStore.getFilteredCostRanges).toStrictEqual(initialValue);

      unitsStore.setFilteredCostRanges(validFilteredCostRanges);
      expect(unitsStore.getFilteredCostRanges).toStrictEqual(validFilteredCostRanges);
    });
  });
});
