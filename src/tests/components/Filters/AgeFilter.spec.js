import { describe, it, expect, beforeEach } from "vitest";
import { render, fireEvent } from "@testing-library/vue";
import "@testing-library/jest-dom";
import { setActivePinia, createPinia } from "pinia";

import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import AgeFilter from "@/components/Filters/AgeFilter.vue";
import { Ages } from "@/constants/Ages";

const vuetify = createVuetify({
  components,
  directives
});

describe("AgeFilter", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  const renderComponent = () => {
    const { component, ...rest } = render(AgeFilter, { global: { plugins: [vuetify] } });
    return { component, ...rest };
  };

  it("renders title properly", async () => {
    const { getByTestId } = renderComponent();

    expect(getByTestId("age-filter-title")).toBeInTheDocument();
  });

  it("renders age filter buttons properly", async () => {
    const { getByText } = renderComponent();

    Ages.forEach((age) => {
      expect(getByText(age.name)).toBeInTheDocument();
    });
  });

  it("selects an age when button is clicked", async () => {
    const { getByText, emitted } = render(AgeFilter, { global: { plugins: [vuetify] } });

    // Click the second age button
    const ageButton = getByText(Ages[1].name);
    await fireEvent.click(ageButton);

    // Check if the emitted event is correct
    expect(emitted().onAgeButtonClick[0]).toEqual([Ages[1].value]);
  });

  it("applies selected style to the clicked age button", async () => {
    const { getByText } = render(AgeFilter);

    // Click the fourth age button
    const ageButton = getByText(Ages[3].name);
    await fireEvent.click(ageButton);

    // Check if the selected style is applied
    expect(ageButton).toHaveStyle("color: var(--selected-link)");
  });
});
