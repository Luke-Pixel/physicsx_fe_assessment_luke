import { useEffect } from "react";
import "./ResultsVisualization.css";
import Header from "./components/Header/Header.tsx";
import DataGrid from "./components/DataGrid/DataGrid.tsx";

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
    <div className="container">
        <div className="header">
            <Header/>
        </div>
      <div className="grid">
        <DataGrid gridSize={3} />
      </div>
      <div className="controls">
        {/* paste your code here */}
      </div>
    </div>
  );
};

export default ResultsVisualization;
