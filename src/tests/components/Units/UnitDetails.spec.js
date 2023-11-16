import { render } from "@testing-library/vue";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";

import UnitDetails from "@/components/Units/UnitDetails.vue";

import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives
});

describe("UnitDetails", () => {
  it("renders title properly", () => {
    const { getByText } = render(UnitDetails);

    expect(getByText("Unit Detail Page")).toBeInTheDocument();
  });

  it("renders the component with a given unit", () => {
    const unit = {
      id: 1,
      name: "Test Unit",
      description: "Test Description"
    };

    const displayableFields = [
      "Id:",
      "1",
      "Name:",
      "Test Unit",
      "Description:",
      "Test Description"
    ];

    const { getByText } = render(UnitDetails, {
      props: {
        unit
      },
      global: { plugins: [vuetify] }
    });

    displayableFields.forEach((field) => expect(getByText(field)).toBeInTheDocument());
  });

  it("renders the component with a given unit which has costs", () => {
    const unit = {
      id: 1,
      name: "Test Unit",
      description: "Test Description",
      cost: {
        Wood: 25,
        Gold: 45
      }
    };

    const displayableFields = [
      "Id:",
      "1",
      "Name:",
      "Test Unit",
      "Description:",
      "Test Description",
      "Wood Cost:",
      "25",
      "Gold Cost:",
      "45"
    ];

    const { getByText } = render(UnitDetails, {
      props: {
        unit
      },
      global: { plugins: [vuetify] }
    });

    displayableFields.forEach((field) => expect(getByText(field)).toBeInTheDocument());
  });

  describe("getDisplayFieldName", () => {
    it("getDisplayFieldName transforms underscore-separated string into camel-case", () => {
      const component = shallowMount(UnitDetails);

      const transformedString = component.vm.getDisplayFieldName("some_field_name");

      expect(transformedString).toBe("Some Field Name");
    });

    it("getDisplayFieldName handles single-word input", () => {
      const component = shallowMount(UnitDetails);

      const transformedString = component.vm.getDisplayFieldName("singleword");

      expect(transformedString).toBe("Singleword");
    });

    it("getDisplayFieldName handles empty input", () => {
      const component = shallowMount(UnitDetails);

      const transformedString = component.vm.getDisplayFieldName("");

      expect(transformedString).toBe("");
    });
  });
});
