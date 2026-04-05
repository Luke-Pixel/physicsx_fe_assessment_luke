import {useContext} from "react";
import {Unit} from "../../../../utils/formating.ts";
import {SelectedUnitContext} from "../../store/SelectedUnitContext.ts";
import {capitalize} from "lodash";

const units = Object.values(Unit);

const Header = () => {
    const {selectedUnit, setSelectedUnit} = useContext(SelectedUnitContext);

    return (
        <div className="header">
            <div style={{display: "flex", gap: "12px"}}>
                {units.map((unit) => (
                    <button
                        key={unit}
                        type="button"
                        onClick={() => setSelectedUnit(unit)}
                        aria-pressed={selectedUnit === unit}
                    >
                        {capitalize((unit))}
                    </button>
                ))}
            </div>
            <h2>{capitalize(selectedUnit)}</h2>
        </div>
    );
};

export default Header;
