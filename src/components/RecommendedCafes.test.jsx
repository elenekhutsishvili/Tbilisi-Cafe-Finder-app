
import { describe, it, expect, afterEach } from "vitest";
import {
  render,
  screen,
  cleanup,
  within,
} from "@testing-library/react";

import RecommendedCafes from "./RecommendedCafes";

afterEach(() => {
  cleanup();
});

describe("Recommended Cafes Component", () => {
  it("displays recommended cafes", () => {
    render(<RecommendedCafes />);

    expect(screen.getByText("Garden Brew")).toBeTruthy();
    expect(screen.getByText("Study Bean")).toBeTruthy();
    expect(screen.getByText("City Espresso")).toBeTruthy();
  });

  it("displays match percentages", () => {
    render(<RecommendedCafes />);

    expect(screen.getByText("94.44% match")).toBeTruthy();
    expect(screen.getByText("77.78% match")).toBeTruthy();
    expect(screen.getByText("50% match")).toBeTruthy();
  });

  it("displays recommendation explanations", () => {
    render(<RecommendedCafes />);

    expect(screen.getAllByText("Offers Wi-Fi")).toHaveLength(3);
  });

  it("sorts cafes by highest match percentage", () => {
    const recommendations = [
      { id: 1, name: "Low Match", match_percentage: 30 },
      { id: 2, name: "High Match", match_percentage: 90 },
      { id: 3, name: "Medium Match", match_percentage: 60 },
    ];

    const { container } = render(
      <RecommendedCafes recommendations={recommendations} />
    );

    const articles = container.querySelectorAll("article");

    expect(within(articles[0]).getByText("High Match")).toBeTruthy();
    expect(within(articles[1]).getByText("Medium Match")).toBeTruthy();
    expect(within(articles[2]).getByText("Low Match")).toBeTruthy();
  });

  it("handles cafes without a match percentage", () => {
    const recommendations = [
      {
        id: 1,
        name: "Unscored Cafe",
        match_percentage: null,
        explanations: [],
      },
    ];

    render(<RecommendedCafes recommendations={recommendations} />);

    expect(
      screen.getByText("No personalized score available")
    ).toBeTruthy();
  });

  it("shows a message when no cafes match", () => {
    render(<RecommendedCafes recommendations={[]} />);

    expect(
      screen.getByText("No cafés match your selected preferences.")
    ).toBeTruthy();
  });
});
