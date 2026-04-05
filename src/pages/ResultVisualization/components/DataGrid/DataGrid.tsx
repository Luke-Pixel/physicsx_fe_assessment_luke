import {type FormattedGridCell} from "../../../../utils/formating.ts";
import GridCell from "../GridCell/GridCell.tsx";
import styles from "./DataGrid.module.css"
import {memo} from "react";

interface GridSizeProps {
    gridProperties : GridProperties;
    cells: FormattedGridCell[];
}

export interface GridProperties {
    gridRows: number;
    gridColumns: number;
}

const DataGrid = ({gridProperties, cells}: GridSizeProps) => {

    const gridStyles = {
        gridTemplateColumns: `repeat(${gridProperties.gridColumns}, minmax(0, 1fr))`,
        girdTemplateRows: `repeat(${gridProperties.gridRows}, minmax(0, 1fr))`,
    }
    return (
        <div
            className={styles["data-grid"]}
            style={gridStyles}
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

const DataGridMemo = memo(DataGrid)

export default DataGridMemo;
