import "./ResultsVisualization.css";
import Header from "./components/Header/Header.tsx";
import DataGrid from "./components/DataGrid/DataGrid.tsx";
import CurrentPlaybackContextProvider from "./store/CurrentPlaybackContextProvider.tsx";
import SelectedUnitContextProvider from "./store/SelectedUnitContextProvider.tsx";
import PlaybackControls from "./components/PlaybackControls/PlaybackControls.tsx";
import {useGridDataQuery, useGridQuery} from "./components/service/useGridDataQuery.ts";
import {useContext} from "react";
import {SelectedUnitContext} from "./store/SelectedUnitContext.ts";

const ResultsVisualization: React.FC = () => {

    // Fetch initial grid data from API
    const {data: gridData, isLoading: isGridDataLoading, isError: isGridDataError, refetch: refetchGridData} = useGridDataQuery();
    const{data: grid, isLoading: isGridLoading, isError: isGridError, refetch: refetchGrid} = useGridQuery();

    const {selectedUnit} = useContext(SelectedUnitContext);

    function onRefetch() {
        refetchGridData();
        refetchGrid();
    }

  if(isGridDataError || isGridError) {
      return <div>Error fetching Grid Data... <a onClick={() => onRefetch()}>retry</a></div>
  }

  if(isGridDataLoading|| isGridLoading) {
      return <p>Loading Grid Data...</p>;
  }

    const maxStep = Math.max((gridData?.iterations?.length ?? 1) - 1, 0);
    const gridSize = grid.grid[`${selectedUnit}`].length

    return (
      <CurrentPlaybackContextProvider maxStep={maxStep}>
        <SelectedUnitContextProvider>
        <div className="container">
            <div className="header">
                <Header/>
            </div>
          <div className="grid">
            <DataGrid data={gridData} gridSize={gridSize} />
          </div>
          <div className="controls">
            <PlaybackControls/>
          </div>
        </div>
        </SelectedUnitContextProvider>
      </CurrentPlaybackContextProvider>
  );
};

export default ResultsVisualization;
