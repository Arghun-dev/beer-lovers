import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import BeersFilter from 'components/BeersFilter';

describe('BeersFilter component', () => {
  it('should render correctly', () => {
    const search = 'IPA';
    const abvGt = '5';
    const abvLt = '10';
    const setSearch = jest.fn();
    const setGreaterABV = jest.fn();
    const setLowerABV = jest.fn();

    render(
      <BeersFilter
        search={search}
        abvGt={abvGt}
        abvLt={abvLt}
        setSearch={setSearch}
        setGreaterABV={setGreaterABV}
        setLowerABV={setLowerABV}
      />
    );

    // Verify search input value and onChange callback
    const searchInput = screen.getByLabelText('Search beer');
    expect(searchInput.getAttribute('value')).toBe(search);
    fireEvent.change(searchInput, { target: { value: 'New search' } });
    expect(setSearch).toHaveBeenCalledWith('New search');

    // Verify greater than ABV input value and onChange callback
    const abvGtInput = screen.getByLabelText('ABV greater than');
    expect(abvGtInput.getAttribute('value')).toBe(abvGt);
    fireEvent.change(abvGtInput, { target: { value: '8' } });
    expect(setGreaterABV).toHaveBeenCalledWith('8');

    // Verify lower than ABV input value and onChange callback
    const abvLtInput = screen.getByLabelText('ABV lower than');
    expect(abvLtInput.getAttribute('value')).toBe(abvLt);
    fireEvent.change(abvLtInput, { target: { value: '5' } });
    expect(setLowerABV).toHaveBeenCalledWith('5');
  });
});
