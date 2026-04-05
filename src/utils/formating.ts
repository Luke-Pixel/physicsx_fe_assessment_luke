import { createColorScale } from "./createColorScale.ts";

export enum Unit {
  pressure = "pressure",
  kelvin = "kelvin",
  temperature = "temperature",
}

export interface GridMetricValues {
  temperature: string;
  pressure: number;
  kelvin: string;
}

export type GridValueTuple = [number, number, GridMetricValues];

export interface GridIteration {
  step: number;
  values: GridValueTuple[];
}

export interface GridDataResponse {
  iterations: GridIteration[];
}

export interface FormattedGridCell {
  row: number;
  column: number;
  value: number | string | undefined;
  backgroundColor: string;
}

export function formatValue(value: number, type: Unit) {
  if (type === "pressure") {
    return value;
  }

  if (type === "temperature") {
    return `${value} °C`;
  }

  if (type === "kelvin") {
    return `${value} K`;
  }
}

function parseMetricValue(value: string | number): number {
  if (typeof value === "number") {
    return value;
  }

  return Number.parseFloat(value);
}

export function formatGridData(
  data: GridDataResponse,
  selectedUnit: Unit,
  currentStep: number,
  gridSize: number,
): FormattedGridCell[] {
  const iterations = data.iterations;
  const activeIteration = iterations[currentStep] ?? iterations[0];

  if (!activeIteration) {
    return [];
  }

  const metricGrid = Array.from({ length: gridSize }, () =>
    Array.from({ length: gridSize }, () => 0),
  );

  activeIteration.values.forEach(([row, column, metrics]) => {
    metricGrid[row][column] = parseMetricValue(metrics[selectedUnit]);
  });

  const colorScale = createColorScale(metricGrid);

  return activeIteration.values.map(([row, column, metrics]) => {
    const rawValue = parseMetricValue(metrics[selectedUnit]);

    return {
      row,
      column,
      value: formatValue(rawValue, selectedUnit),
      backgroundColor: colorScale(rawValue),
    };
  });
}
