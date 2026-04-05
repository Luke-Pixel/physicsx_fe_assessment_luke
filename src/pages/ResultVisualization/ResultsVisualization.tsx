import './ResultsVisualization.module.css';
import Header from './components/Header/Header.tsx';
import SelectedUnitContextProvider from './store/SelectedUnitContextProvider.tsx';
import { useGridDataQuery, useGridQuery } from './components/service/useGridDataQuery.ts';
import { GridView } from './components/GridView/GridView.tsx';
import styles from './ResultsVisualization.module.css';

const ResultsVisualization = () => {
  const {
    data: gridData,
    isLoading: isGridDataLoading,
    isError: isGridDataError,
    refetch: refetchGridData,
  } = useGridDataQuery();
  const {
    data: grid,
    isLoading: isGridLoading,
    isError: isGridError,
    refetch: refetchGrid,
  } = useGridQuery();

  function onRefetch() {
    refetchGridData();
    refetchGrid();
  }

  if (isGridDataError || isGridError) {
    return (
      <span>
        Error fetching Grid Data... <button onClick={() => onRefetch()}>retry</button>
      </span>
    );
  }

  if (isGridDataLoading || isGridLoading || !gridData || !grid) {
    return <p>Loading Grid Data...</p>;
  }

  return (
    <div className={styles.container}>
      <SelectedUnitContextProvider>
        <div className={styles.content}>
          <div className={styles['header-wrapper']}>
            <Header />
          </div>
          <div className={styles['grid-wrapper']}>
            <GridView />
          </div>
        </div>
      </SelectedUnitContextProvider>
    </div>
  );
};

export default ResultsVisualization;
