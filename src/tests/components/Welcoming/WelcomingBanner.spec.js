import { render, fireEvent, screen } from "@testing-library/vue";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";

import WelcomingBanner from "@/components/Welcoming/WelcomingBanner.vue";

describe("WelcomingBanner", () => {
  it("renders image properly", () => {
    render(WelcomingBanner);

    const img = screen.queryByRole("img");
    expect(img).toBeInTheDocument();
  });

  it("does not render image on error", async () => {
    render(WelcomingBanner);

    const img = screen.queryByRole("img");
    expect(img).toBeInTheDocument();

    await fireEvent.error(img);
    expect(img).not.toBeInTheDocument();
  });
});
