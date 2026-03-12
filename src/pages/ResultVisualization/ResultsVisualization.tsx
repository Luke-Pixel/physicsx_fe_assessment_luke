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
        <div className="container">
            <div className="header">
                <Header/>
            </div>
            <div className="grid">
                <DataGrid cells={cells} gridSize={gridSize}/>
            </div>
            <div className="controls">
                <PlaybackControls/>
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
        return <div>Error fetching Grid Data... <a onClick={() => onRefetch()}>retry</a></div>;
    }

    if (isGridDataLoading || isGridLoading || !gridData || !grid) {
        return <p>Loading Grid Data...</p>;
    }

    const maxStep = Math.max((gridData.iterations.length ?? 1) - 1, 0);

    return (
        <CurrentPlaybackContextProvider maxStep={maxStep}>
            <SelectedUnitContextProvider>
                <ResultsVisualizationContent grid={grid} gridData={gridData}/>
            </SelectedUnitContextProvider>
        </CurrentPlaybackContextProvider>
    );
};

export default ResultsVisualization;
