import "./ResultsVisualization.css";
import Header from "./components/Header/Header.tsx";
import DataGrid from "./components/DataGrid/DataGrid.tsx";
import CurrentPlaybackContextProvider from "./store/CurrentPlaybackContextProvider.tsx";
import SelectedUnitContextProvider from "./store/SelectedUnitContextProvider.tsx";
import PlaybackControls from "./components/PlaybackControls/PlaybackControls.tsx";
import {useGridDataQuery} from "./components/service/useGridDataQuery.ts";

const ResultsVisualization: React.FC = () => {

    // Fetch initial grid data from API
    const {data, isLoading, isError, refetch} = useGridDataQuery();

  if(isError) {
      return <div>Error fetching Grid Data... <a onClick={() => refetch()}>retry</a></div>
  }

  if(isLoading) {
      return <p>Loading Grid Data...</p>;
  }

  return (
      <CurrentPlaybackContextProvider>
        <SelectedUnitContextProvider>
        <div className="container">
            <div className="header">
                <Header/>
            </div>
          <div className="grid">
            <DataGrid data={data} gridSize={3} />
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
