import {type FormattedGridCell} from "../../../../utils/formating.ts";
import GridCell from "../GridCell/GridCell.tsx";

interface GridSizeProps {
    gridSize: number;
    cells: FormattedGridCell[];
}

const DataGrid = ({gridSize, cells}: GridSizeProps) => {
    const gridTemplateColumns = `repeat(${gridSize}, minmax(0, 1fr))`;

    return (
        <div
            className="data-grid-container"
            style={{display: "grid", gap: "12px", gridTemplateColumns}}
        >
            {cells.map(({row, column, value, backgroundColor}) => (
                <GridCell
                    key={`${row}-${column}`}
                    value={value}
                    row={row}
                    column={column}
                    backgroundColor={backgroundColor}
                />
            ))}
        </div>
    );
};

export default DataGrid;
