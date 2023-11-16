import { render, fireEvent } from "@testing-library/vue";
import "@testing-library/jest-dom";
import { describe, it, expect, beforeEach, vi } from "vitest";

import UnitList from "@/components/Units/UnitList.vue";
import { Headers } from "@/constants/TableHeaders";

import { setActivePinia, createPinia } from "pinia";
import { useUnitsStore } from "@/stores/units";

import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives
});

const unitList = [
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
      Food: 25,
      Wood: 45
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
  },
  {
    id: 3,
    name: "Arbalest",
    description: "Upgraded crossbowman",
    expansion: "Age of Kings",
    age: "Imperial",
    cost: {
      Food: 25,
      Gold: 45
    },
    build_time: 27,
    reload_time: 2,
    attack_delay: 0.35,
    movement_rate: 0.96,
    line_of_sight: 7,
    hit_points: 40,
    range: 5,
    attack: 6,
    armor: "0/0",
    attack_bonus: ["+3 spearmen"],
    accuracy: "90%"
  }
];

describe("UnitList", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("renders headers properly", () => {
    const { getByText } = render(UnitList, { global: { plugins: [vuetify] } });

    Headers.forEach((header) => {
      expect(getByText(header.title)).toBeInTheDocument();
    });
  });

  it("renders component table with given unit list when there is no filter", async () => {
    const { getByText } = render(UnitList, { global: { plugins: [vuetify] } });

    const unitsStore = useUnitsStore();
    await unitsStore.setUnits(unitList);

    unitList.forEach((unit) => {
      expect(getByText(unit.id)).toBeInTheDocument();
      expect(getByText(unit.name)).toBeInTheDocument();
      expect(getByText(unit.age)).toBeInTheDocument();
    });
  });

  it("renders component table with filtered unit list according to Age Filter", async () => {
    const { queryByText } = render(UnitList, { global: { plugins: [vuetify] } });

    const unitsStore = useUnitsStore();
    await unitsStore.setUnits(unitList);
    await unitsStore.setAgeFilter("Castle");

    expect(queryByText(unitList[0].id)).toBeNull();
    expect(queryByText(unitList[1].id)).toBeInTheDocument();
    expect(queryByText(unitList[2].id)).toBeNull();
  });

  it("renders component table with filtered unit list according to Single Cost Filter", async () => {
    const { queryByText } = render(UnitList, { global: { plugins: [vuetify] } });

    const unitsStore = useUnitsStore();
    await unitsStore.setUnits(unitList);
    await unitsStore.setAgeFilter("All");
    await unitsStore.setFilteredCostTypes(["Food"]);

    expect(queryByText(unitList[0].id)).toBeNull();
    expect(queryByText(unitList[1].id)).toBeInTheDocument();
    expect(queryByText(unitList[2].id)).toBeInTheDocument();
  });

  it("renders component table with filtered unit list according to Multi Cost Filter", async () => {
    const { queryByText } = render(UnitList, { global: { plugins: [vuetify] } });

    const unitsStore = useUnitsStore();
    await unitsStore.setUnits(unitList);
    await unitsStore.setAgeFilter("All");
    await unitsStore.setFilteredCostTypes(["Food", "Gold"]);

    expect(queryByText(unitList[0].id)).toBeNull();
    expect(queryByText(unitList[1].id)).toBeNull();
    expect(queryByText(unitList[2].id)).toBeInTheDocument();
  });

  it("renders component table with filtered unit list according to Single Cost Filter and Age Filter", async () => {
    const { queryByText } = render(UnitList, { global: { plugins: [vuetify] } });

    const unitsStore = useUnitsStore();
    await unitsStore.setUnits(unitList);
    await unitsStore.setAgeFilter("Imperial");
    await unitsStore.setFilteredCostTypes(["Food"]);

    expect(queryByText(unitList[0].id)).toBeNull();
    expect(queryByText(unitList[1].id)).toBeNull();
    expect(queryByText(unitList[2].id)).toBeInTheDocument();
  });

  it("renders component table with filtered unit list according to Multi Cost Filter and Age Filter", async () => {
    const { queryByText } = render(UnitList, { global: { plugins: [vuetify] } });

    const unitsStore = useUnitsStore();
    await unitsStore.setUnits(unitList);
    await unitsStore.setAgeFilter("Castle");
    await unitsStore.setFilteredCostTypes(["Food", "Wood"]);

    expect(queryByText(unitList[0].id)).toBeNull();
    expect(queryByText(unitList[1].id)).toBeInTheDocument();
    expect(queryByText(unitList[2].id)).toBeNull();
  });

  it("should update router with clicked unit's id", async () => {
    const mockRouter = {
      push: vi.fn()
    };

    const { queryByText } = render(UnitList, {
      global: {
        mocks: {
          $router: mockRouter
        },
        plugins: [vuetify]
      }
    });

    const clickedUnitId = unitList[1].id;
    const unitsStore = useUnitsStore();
    await unitsStore.setUnits(unitList);

    const unitRow = await queryByText(clickedUnitId);
    await fireEvent.click(unitRow);

    expect(mockRouter.push).toHaveBeenCalledWith({
      name: "UnitDetails",
      params: {
        id: clickedUnitId
      }
    });
  });
});
