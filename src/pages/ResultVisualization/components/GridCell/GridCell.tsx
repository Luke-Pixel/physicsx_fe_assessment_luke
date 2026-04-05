import {memo} from "react";

interface GridCellProps {
    value: number | string | undefined;
    row: number;
    column: number;
    backgroundColor: string;
}

const GridCell = ({value, row, column, backgroundColor}: GridCellProps) => {
    return (
        <div
            className="grid-cell"
            data-row={row}
            data-column={column}
            style={{
                alignItems: "center",
                backgroundColor,
                border: "1px solid #d0d0d0",
                display: "flex",
                justifyContent: "center",
                minHeight: "72px",
                padding: "8px",
            }}
        >
            {value}
        </div>
    );
};

const GridCellMemo = memo(GridCell)

export default GridCellMemo;
