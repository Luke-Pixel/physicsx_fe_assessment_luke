import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DataGrid from "./DataGrid.tsx";
import { type FormattedGridCell } from "../../../../utils/formating.ts";

describe("DataGrid", () => {
  it("renders one grid cell per provided cell", () => {
    const cells: FormattedGridCell[] = [
      { row: 0, column: 0, value: "10 C", backgroundColor: "rgb(1, 1, 1)" },
      { row: 0, column: 1, value: "20 C", backgroundColor: "rgb(2, 2, 2)" },
    ];

    render(<DataGrid gridSize={2} cells={cells} />);

    expect(screen.getByText("10 C")).toBeTruthy();
    expect(screen.getByText("20 C")).toBeTruthy();
  });

  it("uses the provided grid size to set grid columns", () => {
    const cells: FormattedGridCell[] = [
      { row: 0, column: 0, value: "10 C", backgroundColor: "rgb(1, 1, 1)" },
    ];

    const { container } = render(<DataGrid gridSize={3} cells={cells} />);

    const grid = container.firstChild as HTMLElement;

    expect(grid.style.gridTemplateColumns).toBe("repeat(3, minmax(0, 1fr))");
  });
});
