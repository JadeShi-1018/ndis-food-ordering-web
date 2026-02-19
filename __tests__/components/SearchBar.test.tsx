import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../../app/components/SearchBar';

describe('SearchBar Component', () => {
  const mockOnLocationSelect = jest.fn();
  const mockOnCurrentLocation = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders search input and location button', () => {
    render(
      <SearchBar
        onLocationSelect={mockOnLocationSelect}
        onCurrentLocation={mockOnCurrentLocation}
      />
    );

    expect(screen.getByPlaceholderText('Type Your Location')).toBeInTheDocument();
    expect(screen.getByLabelText('Search location')).toBeInTheDocument();
    expect(screen.getByLabelText('Use current location')).toBeInTheDocument();
  });

  it('updates search value on input change', async () => {
    const user = userEvent.setup();
    render(
      <SearchBar
        onLocationSelect={mockOnLocationSelect}
        onCurrentLocation={mockOnCurrentLocation}
      />
    );

    const searchInput = screen.getByPlaceholderText('Type Your Location');
    await user.type(searchInput, 'Brisbane');

    expect(searchInput).toHaveValue('Brisbane');
  });

  it('calls onLocationSelect when search button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <SearchBar
        onLocationSelect={mockOnLocationSelect}
        onCurrentLocation={mockOnCurrentLocation}
      />
    );

    const searchInput = screen.getByPlaceholderText('Type Your Location');
    const searchButton = screen.getByLabelText('Search location');

    await user.type(searchInput, 'Sydney');
    await user.click(searchButton);

    expect(mockOnLocationSelect).toHaveBeenCalledWith('Sydney');
  });

  it('calls onLocationSelect when Enter key is pressed', async () => {
    const user = userEvent.setup();
    render(
      <SearchBar
        onLocationSelect={mockOnLocationSelect}
        onCurrentLocation={mockOnCurrentLocation}
      />
    );

    const searchInput = screen.getByPlaceholderText('Type Your Location');
    await user.type(searchInput, 'Melbourne');
    await user.keyboard('{Enter}');

    expect(mockOnLocationSelect).toHaveBeenCalledWith('Melbourne');
  });

  it('calls onCurrentLocation when location button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <SearchBar
        onLocationSelect={mockOnLocationSelect}
        onCurrentLocation={mockOnCurrentLocation}
      />
    );

    const locationButton = screen.getByLabelText('Use current location');
    await user.click(locationButton);

    expect(mockOnCurrentLocation).toHaveBeenCalled();
  });

  it('does not call onLocationSelect with empty input', async () => {
    const user = userEvent.setup();
    render(
      <SearchBar
        onLocationSelect={mockOnLocationSelect}
        onCurrentLocation={mockOnCurrentLocation}
      />
    );

    const searchButton = screen.getByLabelText('Search location');
    await user.click(searchButton);

    expect(mockOnLocationSelect).not.toHaveBeenCalled();
  });

  it('applies custom wrapper className', () => {
    const customClassName = 'custom-search-wrapper';
    render(
      <SearchBar
        onLocationSelect={mockOnLocationSelect}
        onCurrentLocation={mockOnCurrentLocation}
        searchBarWrapperClassName={customClassName}
      />
    );

    const wrapper = screen.getByLabelText('Search location').closest('div')?.parentElement;
    expect(wrapper).toHaveClass(customClassName);
  });

  it('uses custom input placeholder', () => {
    const customPlaceholder = 'Enter your address';
    render(
      <SearchBar
        onLocationSelect={mockOnLocationSelect}
        onCurrentLocation={mockOnCurrentLocation}
        inputPlaceholder={customPlaceholder}
      />
    );

    expect(screen.getByPlaceholderText(customPlaceholder)).toBeInTheDocument();
  });
});


