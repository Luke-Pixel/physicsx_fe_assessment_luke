import {createContext, type Dispatch, type SetStateAction} from "react";
import {Unit} from "../../../utils/formating.ts";

export interface SelectedUnitContextValue {
    selectedUnit: Unit;
    setSelectedUnit: Dispatch<SetStateAction<Unit>>;
}

const defaultContextValue: SelectedUnitContextValue = {
    selectedUnit: Unit.temperature,
    setSelectedUnit: (_value: SetStateAction<Unit>) => undefined,
};

export const SelectedUnitContext = createContext<SelectedUnitContextValue>(defaultContextValue);
