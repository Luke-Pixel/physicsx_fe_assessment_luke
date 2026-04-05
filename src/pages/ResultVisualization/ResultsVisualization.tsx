import {useContext} from "react";
import "./ResultsVisualization.css";
import Header from "./components/Header/Header.tsx";
import DataGrid from "./components/DataGrid/DataGrid.tsx";
import CurrentPlaybackContextProvider from "./store/CurrentPlaybackContextProvider.tsx";
import SelectedUnitContextProvider from "./store/SelectedUnitContextProvider.tsx";
import PlaybackControls from "./components/PlaybackControls/PlaybackControls.tsx";
import {useGridDataQuery, useGridQuery} from "./components/service/useGridDataQuery.ts";
import {CurrentPlaybackContext} from "./store/CurrentPlaybackContext.ts";
import {SelectedUnitContext} from "./store/SelectedUnitContext.ts";
import {formatGridData, type GridDataResponse} from "../../utils/formating.ts";

interface GridResponse {
    grid: Record<string, number[][]>;
}

interface ResultsVisualizationContentProps {
    grid: GridResponse;
    gridData: GridDataResponse;
}

const ResultsVisualizationContent = ({grid, gridData}: ResultsVisualizationContentProps) => {
    const {selectedUnit} = useContext(SelectedUnitContext);
    const {
        state: {currentStep},
    } = useContext(CurrentPlaybackContext);

    const gridSize = grid.grid[selectedUnit].length;
    const cells = formatGridData(gridData, selectedUnit, currentStep, gridSize);

    return (
        <div>
            <div className="header">
                <Header/>
            </div>
            <div className="grid">
                <DataGrid cells={cells} gridSize={gridSize}/>
            </div>
        </div>
    );
};

const ResultsVisualization = () => {
    const {data: gridData, isLoading: isGridDataLoading, isError: isGridDataError, refetch: refetchGridData} = useGridDataQuery();
    const {data: grid, isLoading: isGridLoading, isError: isGridError, refetch: refetchGrid} = useGridQuery();

    function onRefetch() {
        refetchGridData();
        refetchGrid();
    }

    if (isGridDataError || isGridError) {
        return <span>Error fetching Grid Data... <button onClick={() => onRefetch()}>retry</button></span>;
    }

    if (isGridDataLoading || isGridLoading || !gridData || !grid) {
        return <p>Loading Grid Data...</p>;
    }

    const maxStep = gridData.iterations.length ? gridData.iterations.length - 1 : 0;

    return (
        <div className="container">
            <CurrentPlaybackContextProvider maxStep={maxStep}>
                <SelectedUnitContextProvider>
                    <ResultsVisualizationContent grid={grid} gridData={gridData}/>
                </SelectedUnitContextProvider>
                <div className="controls">
                    <PlaybackControls/>
                </div>
            </CurrentPlaybackContextProvider>
        </div>
    );
};

export default ResultsVisualization;
