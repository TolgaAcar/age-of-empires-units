import { describe, it, expect, beforeEach } from "vitest";
import { render } from "@testing-library/vue";
import "@testing-library/jest-dom";

import { setActivePinia, createPinia } from "pinia";
import { useUnitsStore } from "@/stores/units";

import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import CostFilter from "@/components/Filters/CostFilter.vue";
import { CostTypes } from "@/constants/CostTypes";

import { shallowMount } from "@vue/test-utils";

const vuetify = createVuetify({
  components,
  directives
});

describe("CostFilter", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("renders cost types and range sliders correctly", () => {
    const { getByLabelText, getByTestId } = render(CostFilter, { global: { plugins: [vuetify] } });

    // Ensure that each cost type
    CostTypes.forEach((costType) => {
      const costTypeLabel = getByLabelText(costType);
      expect(costTypeLabel).toBeInTheDocument();

      const costRangeSlider = getByTestId(`range-slider${costType}`);
      expect(costRangeSlider).toBeInTheDocument();
    });
  });

  describe("Computed: selectedCostTypes", () => {
    it("computed selectedCostTypes should be updated when state filteredCostTypes changes", () => {
      const comp = shallowMount(CostFilter);
      const unitsStore = useUnitsStore();
      const validFilteredCostTypes = ["Dark", "Castle"];

      expect(comp.vm.selectedCostTypes).toStrictEqual([]);

      unitsStore.setFilteredCostTypes(validFilteredCostTypes);
      expect(comp.vm.selectedCostTypes).toStrictEqual(validFilteredCostTypes);
    });

    it("state filteredCostTypes should be updated when computed selectedCostTypes changes", () => {
      const comp = shallowMount(CostFilter);
      const unitsStore = useUnitsStore();
      const validFilteredCostTypes = ["Dark", "Castle"];

      comp.vm.selectedCostTypes = validFilteredCostTypes;

      expect(unitsStore.filteredCostTypes).toStrictEqual(validFilteredCostTypes);
    });
  });

  describe("Computed: costRanges", () => {
    it("computed costRanges should be updated when state filteredCostRanges changes", () => {
      const comp = shallowMount(CostFilter);
      const unitsStore = useUnitsStore();
      const validFilteredCostRange = {
        Food: [50, 100],
        Wood: [20, 90],
        Gold: [10, 90]
      };
      const initialValue = {
        Food: [0, 200],
        Wood: [0, 200],
        Gold: [0, 200]
      };

      expect(comp.vm.costRanges).toStrictEqual(initialValue);

      unitsStore.setFilteredCostRanges(validFilteredCostRange);
      expect(comp.vm.costRanges).toStrictEqual(validFilteredCostRange);
    });

    it("state filteredCostRanges should be updated when computed costRanges changes", () => {
      const comp = shallowMount(CostFilter);
      const unitsStore = useUnitsStore();
      const validFilteredCostRange = {
        Food: [50, 100],
        Wood: [20, 90],
        Gold: [10, 90]
      };

      comp.vm.costRanges = validFilteredCostRange;

      expect(unitsStore.filteredCostRanges).toStrictEqual(validFilteredCostRange);
    });
  });
});
