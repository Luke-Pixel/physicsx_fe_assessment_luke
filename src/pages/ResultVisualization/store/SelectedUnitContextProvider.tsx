import { type ReactNode, useState } from "react";
import { SelectedUnitContext } from "./SelectedUnitContext.ts";
import { Unit } from "../../../utils/formating.ts";

interface SelectedUnitContextProviderProps {
  children: ReactNode;
}

const SelectedUnitContextProvider = ({
  children,
}: SelectedUnitContextProviderProps) => {
  const [selectedUnit, setSelectedUnit] = useState(Unit.pressure);

  return (
    <SelectedUnitContext.Provider value={{ selectedUnit, setSelectedUnit }}>
      {children}
    </SelectedUnitContext.Provider>
  );
};

export default SelectedUnitContextProvider;
