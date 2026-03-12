import { useEffect } from "react";
import "./ResultsVisualization.css";
import Header from "./components/Header/Header.tsx";
import DataGrid from "./components/DataGrid/DataGrid.tsx";
import CurrentPlaybackContextProvider from "./store/CurrentPlaybackContextProvider.tsx";
import SelectedUnitContextProvider from "./store/SelectedUnitContextProvider.tsx";
import PlaybackControls from "./components/PlaybackControls/PlaybackControls.tsx";

const ResultsVisualization: React.FC = () => {

  // Fetch initial grid data from API
  useEffect(() => {
    const fetchGridData = async () => {
      const allDataResponse = await fetch(
        "http://localhost:5001/api/iterations"
      );
      console.log(allDataResponse.json());
    };
    fetchGridData();
  }, []);


  return (
      <CurrentPlaybackContextProvider>
        <SelectedUnitContextProvider>
        <div className="container">
            <div className="header">
                <Header/>
            </div>
          <div className="grid">
            <DataGrid gridSize={3} />
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
