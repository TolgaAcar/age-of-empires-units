import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import HomeView from "@/views/HomeView.vue";

describe("HomeView", () => {
  const wrapper = mount(HomeView);

  it("renders title properly", () => {
    expect(wrapper.text()).toContain("Home Page");
  });

  it("renders image properly", () => {
    const img = wrapper.find("img");
    expect(img).toBeTruthy();
  });
});
