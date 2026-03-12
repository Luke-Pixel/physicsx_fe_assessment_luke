import {useContext} from "react";
import {Unit} from "../../../../utils/formating.ts";
import {SelectedUnitContext} from "../../store/SelectedUnitContext.ts";

const units = Object.values(Unit);

const Header = () => {
    const {selectedUnit, setSelectedUnit} = useContext(SelectedUnitContext);

    return (
        <div style={{display: "flex", gap: "12px"}}>
            {units.map((unit) => (
                <button
                    key={unit}
                    type="button"
                    onClick={() => setSelectedUnit(unit)}
                    aria-pressed={selectedUnit === unit}
                >
                    {unit}
                </button>
            ))}
        </div>
    );
};

export default Header;
