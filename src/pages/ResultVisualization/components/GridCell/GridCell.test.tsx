import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import GridCell from "./GridCell.tsx";

describe("GridCell", () => {
    it("renders the provided value", () => {
        render(
            <GridCell
                value="42 C"
                row={1}
                column={2}
                backgroundColor="rgb(255, 0, 0)"
            />,
        );

        expect(screen.getByText("42 C")).toBeTruthy();
    });

    it("applies cell position and background color", () => {
        const {container} = render(
            <GridCell
                value="42 C"
                row={1}
                column={2}
                backgroundColor="rgb(255, 0, 0)"
            />,
        );

        const cell = container.firstChild as HTMLElement;

        expect(cell.dataset.row).toBe("1");
        expect(cell.dataset.column).toBe("2");
        expect(cell.style.backgroundColor).toBe("rgb(255, 0, 0)");
    });
});
