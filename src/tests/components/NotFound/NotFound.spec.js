import { render, fireEvent } from "@testing-library/vue";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";

import NotFound from "@/components/NotFound/NotFound.vue";

describe("NotFound", () => {
  it("renders error messages properly", () => {
    const { getByText } = render(NotFound);

    expect(getByText("404 - Not Found")).toBeInTheDocument();
    expect(getByText("The page you are looking for does not exist.")).toBeInTheDocument();
  });

  it("should updates router to home when Go to Home button clicked", async () => {
    const mockRouter = {
      push: vi.fn()
    };

    const { getByText } = render(NotFound, {
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    });

    const homeButton = getByText("Go to Home");
    await fireEvent.click(homeButton);

    expect(mockRouter.push).toHaveBeenCalledWith("/");
  });
});
