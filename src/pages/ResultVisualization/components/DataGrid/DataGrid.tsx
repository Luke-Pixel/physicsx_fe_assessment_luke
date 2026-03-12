interface GridSizeProps {
    gridSize: number;
    data: any;
}

const DataGrid = ({gridSize, data}: GridSizeProps) => {
    return(
        <div className="data-grid-container">
            Data grid here
        </div>
    )
}

export default DataGrid;