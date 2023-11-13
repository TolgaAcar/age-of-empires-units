import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import UnitsView from "../../views/UnitsView.vue";

describe("HelloWorld", () => {
  const wrapper = mount(UnitsView);

  it("renders title properly", () => {
    expect(wrapper.text()).toContain("Units Page");
  });

  it("renders image properly", () => {
    const img = wrapper.find("img");
    console.log(img);
    expect(img).toBeTruthy();
  });
});
