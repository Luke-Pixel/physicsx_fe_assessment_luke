import {fireEvent, render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import SelectedUnitContextProvider from "./SelectedUnitContextProvider.tsx";
import {SelectedUnitContext} from "./SelectedUnitContext.ts";
import {Unit} from "../../../utils/formating.ts";

const SelectedUnitConsumer = () => (
    <SelectedUnitContext.Consumer>
        {({selectedUnit, setSelectedUnit}) => (
            <div>
                <span>{selectedUnit}</span>
                <button type="button" onClick={() => setSelectedUnit(Unit.pressure)}>
                    Change Unit
                </button>
            </div>
        )}
    </SelectedUnitContext.Consumer>
);

describe("SelectedUnitContextProvider", () => {
    it("provides the default selected unit", () => {
        render(
            <SelectedUnitContextProvider>
                <SelectedUnitConsumer/>
            </SelectedUnitContextProvider>,
        );

        expect(screen.getByText("temperature")).toBeTruthy();
    });

    it("updates the selected unit through context", () => {
        render(
            <SelectedUnitContextProvider>
                <SelectedUnitConsumer/>
            </SelectedUnitContextProvider>,
        );

        fireEvent.click(screen.getByRole("button", {name: "Change Unit"}));

        expect(screen.getByText("pressure")).toBeTruthy();
    });
});
