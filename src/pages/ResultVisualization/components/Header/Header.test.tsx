import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Header from './Header.tsx';
import {
  SelectedUnitContext,
  type SelectedUnitContextValue,
} from '../../store/SelectedUnitContext.ts';
import { Unit } from '../../../../utils/formating.ts';

describe('Header', () => {
  it('renders a button for each unit and shows the selected one', () => {
    const contextValue: SelectedUnitContextValue = {
      selectedUnit: Unit.temperature,
      setSelectedUnit: vi.fn(),
    };

    render(
      <SelectedUnitContext.Provider value={contextValue}>
        <Header />
      </SelectedUnitContext.Provider>,
    );

    expect(screen.getByRole('button', { name: 'Pressure' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Kelvin' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Temperature' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Temperature' })).toBeTruthy();
  });

  it('updates the selected unit when a button is clicked', () => {
    const setSelectedUnit = vi.fn();
    const contextValue: SelectedUnitContextValue = {
      selectedUnit: Unit.temperature,
      setSelectedUnit,
    };

    render(
      <SelectedUnitContext.Provider value={contextValue}>
        <Header />
      </SelectedUnitContext.Provider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Pressure' }));

    expect(setSelectedUnit).toHaveBeenCalledWith(Unit.pressure);
  });
});
