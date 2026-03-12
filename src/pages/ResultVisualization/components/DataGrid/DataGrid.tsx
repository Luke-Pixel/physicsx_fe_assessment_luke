import {useContext} from "react";
import {formatValue, Unit} from "../../../../utils/formating.ts";
import {createColorScale} from "../../../../utils/createColorScale.ts";
import {CurrentPlaybackContext} from "../../store/CurrentPlaybackContext.ts";
import {SelectedUnitContext} from "../../store/SelectedUnitContext.ts";
import GridCell from "../GridCell/GridCell.tsx";

interface GridMetricValues {
    temperature: string;
    pressure: number;
    kelvin: string;
}

type GridValueTuple = [number, number, GridMetricValues];

interface GridIteration {
    step: number;
    values: GridValueTuple[];
}

interface GridDataSet {
    iterations: GridIteration[];
}

interface GridSizeProps {
    gridSize: number;
    data: GridDataSet;
}

const parseMetricValue = (value: string | number): number => {
    if (typeof value === "number") {
        return value;
    }

    return Number.parseFloat(value);
};

const DataGrid = ({gridSize, data}: GridSizeProps) => {
    const {selectedUnit} = useContext(SelectedUnitContext);
    const {
        state: {currentStep},
    } = useContext(CurrentPlaybackContext);

    const iterations = data.iterations;
    const activeIteration = iterations[currentStep] ?? iterations[0];
    const gridTemplateColumns = `repeat(${gridSize}, minmax(0, 1fr))`;
    const metricGrid = Array.from({length: gridSize}, () => Array.from({length: gridSize}, () => 0));

    activeIteration?.values.forEach(([row, column, metrics]) => {
        metricGrid[row][column] = parseMetricValue(metrics[selectedUnit] as string | number);
    });

    const colorScale = createColorScale(metricGrid);

    return (
        <div
            className="data-grid-container"
            style={{display: "grid", gap: "12px", gridTemplateColumns}}
        >
            {activeIteration?.values.map(([row, column, metrics]) => {
                const rawValue = parseMetricValue(metrics[selectedUnit] as string | number);
                const displayValue = formatValue(rawValue, selectedUnit as Unit);
                const backgroundColor = colorScale(rawValue);

                return (
                    <GridCell
                        key={`${row}-${column}`}
                        value={displayValue}
                        row={row}
                        column={column}
                        backgroundColor={backgroundColor}
                    />
                );
            })}
        </div>
    );
};

export default DataGrid;
