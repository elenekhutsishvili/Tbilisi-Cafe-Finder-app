
import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, within, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Preference from "./Preference";

describe("User Preference Form", () => {

  it("displays the preference page heading", () => {
    render(<Preference />);

    const heading = screen.getByRole("heading", {
      name: /your café preferences/i,
    });

    expect(heading).toBeTruthy();
  });

  it("displays all eight preference dropdowns", () => {
    render(<Preference />);

    const dropdowns = screen.getAllByRole("combobox");

    expect(dropdowns).toHaveLength(8);
  });

  it("allows users to change price and distance", async () => {
    const user = userEvent.setup();

    render(<Preference />);

    const dropdowns = screen.getAllByRole("combobox");

    const priceDropdown = dropdowns[0];
    const distanceDropdown = dropdowns[1];

    await user.selectOptions(priceDropdown, "2");
    await user.selectOptions(distanceDropdown, "3");

    expect(
      within(priceDropdown).getByRole("option", {
        name: /\$\$.*moderate/i,
        selected: true,
      })
    ).toBeTruthy();

    expect(
      within(distanceDropdown).getByRole("option", {
        name: /3 km/i,
        selected: true,
      })
    ).toBeTruthy();
  });

  it("allows users to select amenity preferences", async () => {
    const user = userEvent.setup();
    render(<Preference />);

    const dropdowns = screen.getAllByRole("combobox");

    // Dropdowns 2-6 represent the five amenities
    await user.selectOptions(dropdowns[2], "required");
    await user.selectOptions(dropdowns[3], "preferred");
    await user.selectOptions(dropdowns[4], "preferred");
    await user.selectOptions(dropdowns[5], "no_preference");
    await user.selectOptions(dropdowns[6], "required");

    expect(dropdowns[2].value).toBe("required");
    expect(dropdowns[3].value).toBe("preferred");
    expect(dropdowns[4].value).toBe("preferred");
    expect(dropdowns[5].value).toBe("no_preference");
    expect(dropdowns[6].value).toBe("required");
  });

  it("allows users to choose a food category", async () => {
    const user = userEvent.setup();
    render(<Preference />);

    const dropdowns = screen.getAllByRole("combobox");

    // Last dropdown is the food category
    await user.selectOptions(dropdowns[7], "4");

    expect(dropdowns[7].value).toBe("4");
  });

  it("shows confirmation when preferences are saved", async () => {
    const user = userEvent.setup();
    render(<Preference />);

    const saveButton = screen.getByRole("button", {
      name: /save preferences/i,
    });

    await user.click(saveButton);

    expect(
      screen.getByText(
        /preferences captured! backend saving is not connected yet/i
      )
    ).toBeTruthy();
  });

  it("captures the correct values when preferences are saved", async () => {
    const user = userEvent.setup();

    // Spy on console.log to inspect submitted preferences
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    try {
      render(<Preference />);

      const dropdowns = screen.getAllByRole("combobox");

      // Select user preferences
      await user.selectOptions(dropdowns[0], "2"); // Price
      await user.selectOptions(dropdowns[1], "3"); // Distance
      await user.selectOptions(dropdowns[2], "required"); // Wi-Fi
      await user.selectOptions(dropdowns[3], "preferred"); // Quiet
      await user.selectOptions(dropdowns[7], "4"); // Italian food

      // Click Save
      await user.click(
        screen.getByRole("button", { name: /save preferences/i })
      );

      // Verify the values captured by the form
      expect(consoleSpy).toHaveBeenCalledWith(
        "Selected preferences:",
        expect.objectContaining({
          max_price_level: "2",
          max_distance_km: "3",
          preferred_food_category_id: "4",
          amenities: expect.objectContaining({
            wifi: "required",
            quiet: "preferred",
            laptop_friendly: "no_preference",
            outdoor_seating: "no_preference",
            pet_friendly: "no_preference",
          }),
        })
      );
    } finally {
      consoleSpy.mockRestore();
    }
  });

  it("allows users to reset a preference to No Preference", async () => {
    const user = userEvent.setup();
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    try {
      render(<Preference />);

      const dropdowns = screen.getAllByRole("combobox");
      const wifiDropdown = dropdowns[2];

      // First, require Wi-Fi
      await user.selectOptions(wifiDropdown, "required");
      expect(wifiDropdown.value).toBe("required");

      // Change back to No Preference
      await user.selectOptions(wifiDropdown, "no_preference");
      expect(wifiDropdown.value).toBe("no_preference");

      // Save the updated preferences
      await user.click(
        screen.getByRole("button", { name: /save preferences/i })
      );

      // Verify that the updated selection was captured
      expect(consoleSpy).toHaveBeenCalledWith(
        "Selected preferences:",
        expect.objectContaining({
          amenities: expect.objectContaining({
            wifi: "no_preference",
          }),
        })
      );
    } finally {
      consoleSpy.mockRestore();
    }
  });



afterEach(() => {
  cleanup();
});

});
