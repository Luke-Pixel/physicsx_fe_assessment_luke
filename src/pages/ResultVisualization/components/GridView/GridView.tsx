import CurrentPlaybackContextProvider from '../../store/CurrentPlaybackContextProvider.tsx';
import PlaybackControls from '../PlaybackControls/PlaybackControls.tsx';
import { useGridDataQuery, useGridQuery } from '../service/useGridDataQuery.ts';
import { useContext, useMemo } from 'react';
import { SelectedUnitContext } from '../../store/SelectedUnitContext.ts';
import {
  formatGridData,
  FormattedGridCell,
  GridDataResponse,
} from '../../../../utils/formating.ts';
import { CurrentPlaybackContext } from '../../store/CurrentPlaybackContext.ts';
import DataGrid, { GridProperties } from '../DataGrid/DataGrid.tsx';
import gridViewStyles from './GridView.module.css';

interface GridResponse {
  grid: Record<string, number[][]>;
}
interface ResultsVisualizationContentProps {
  grid: GridResponse;
  gridData: GridDataResponse;
}

export const GridView = () => {
  const { data: gridData } = useGridDataQuery();
  const { data: grid } = useGridQuery();

  const maxStep = gridData.iterations.length ? gridData.iterations.length - 1 : 0;

  return (
    <CurrentPlaybackContextProvider maxStep={maxStep}>
      <div className={gridViewStyles['grid-view-content']}>
        <GridViewContent grid={grid} gridData={gridData} />
      </div>
      <div className="controls">
        <PlaybackControls />
      </div>
    </CurrentPlaybackContextProvider>
  );
};

const GridViewContent = ({ grid, gridData }: ResultsVisualizationContentProps) => {
  const { selectedUnit } = useContext(SelectedUnitContext);
  const {
    state: { currentStep },
  } = useContext(CurrentPlaybackContext);

  const gridSize = useMemo<number>(() => grid.grid[selectedUnit].length, [grid, selectedUnit]);
  const cells = useMemo<FormattedGridCell[]>(
    () => formatGridData(gridData, selectedUnit, currentStep, gridSize),
    [selectedUnit, currentStep, gridData, gridSize],
  );

  const gridProperties = useMemo<GridProperties>(
    () => ({
      gridColumns: grid.grid[selectedUnit][0].length,
      gridRows: grid.grid[selectedUnit].length,
    }),
    [grid, selectedUnit],
  );

  return (
    <div className={gridViewStyles['grid']}>
      <DataGrid cells={cells} gridProperties={gridProperties} />
    </div>
  );
};
