import CurrentPlaybackContextProvider from "../../store/CurrentPlaybackContextProvider.tsx";
import PlaybackControls from "../PlaybackControls/PlaybackControls.tsx";
import {useGridDataQuery, useGridQuery} from "../service/useGridDataQuery.ts";
import {useContext, useMemo} from "react";
import {SelectedUnitContext} from "../../store/SelectedUnitContext.ts";
import {formatGridData, FormattedGridCell, GridDataResponse} from "../../../../utils/formating.ts";
import {CurrentPlaybackContext} from "../../store/CurrentPlaybackContext.ts";
import DataGrid from "../DataGrid/DataGrid.tsx";

interface GridResponse {
    grid: Record<string, number[][]>;
}
interface ResultsVisualizationContentProps {
    grid: GridResponse;
    gridData: GridDataResponse;
}


export const GridView = () => {
    const {data: gridData} = useGridDataQuery();
    const {data: grid} = useGridQuery();

    const maxStep = gridData.iterations.length ? gridData.iterations.length - 1 : 0;

    return (
        <CurrentPlaybackContextProvider maxStep={maxStep}>
            <div className="grid-view-content">
                <GridViewContent grid={grid} gridData={gridData}/>
            </div>
            <div className="controls">
                <PlaybackControls/>
            </div>
        </CurrentPlaybackContextProvider>
    )
}

const GridViewContent = ({grid, gridData}: ResultsVisualizationContentProps) => {
    const {selectedUnit} = useContext(SelectedUnitContext);
    const {
        state: {currentStep},
    } = useContext(CurrentPlaybackContext);

    const gridSize = useMemo<number>(() => grid.grid[selectedUnit].length, [grid, selectedUnit])
    const cells = useMemo<FormattedGridCell[]>(() => formatGridData(gridData, selectedUnit, currentStep, gridSize), [selectedUnit, currentStep, gridData, gridSize]);

    return (
        <div className="grid">
            <DataGrid cells={cells} gridSize={gridSize}/>
        </div>
    );
};

