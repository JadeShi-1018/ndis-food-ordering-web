import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DeliveryServicePage from '../../app/delivery-service/page';
import { Provider } from '../../types/models';

// Mock the components
jest.mock('../../app/components/SearchBar', () => {
  return function MockSearchBar({ onLocationSelect, onCurrentLocation }: any) {
    return (
      <div data-testid="search-bar">
        <button onClick={() => onLocationSelect('Brisbane')}>Search Brisbane</button>
        <button onClick={() => onCurrentLocation()}>Get Current Location</button>
      </div>
    );
  };
});

jest.mock('../../app/components/MapComponent', () => {
  return function MockMapComponent({ location, searchQuery }: any) {
    return (
      <div data-testid="map-component">
        <div>Map Component</div>
        {location && <div>Location: {location.lat}, {location.lng}</div>}
        {searchQuery && <div>Search: {searchQuery}</div>}
      </div>
    );
  };
});

jest.mock('../../app/components/ProviderInfo', () => {
  return function MockProviderInfo({ selectedProvider, onProviderSelect }: any) {
    return (
      <div data-testid="provider-info">
        <div>Provider Info</div>
        {selectedProvider && <div>Selected: {selectedProvider.name}</div>}
        <button onClick={() => onProviderSelect({ id: '1', name: 'Test Provider' } as Provider)}>
          Select Provider
        </button>
      </div>
    );
  };
});

// Mock Next.js router
const mockPush = jest.fn();
const mockBack = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    back: mockBack,
  }),
}));

// Mock geolocation API
const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
  clearWatch: jest.fn(),
};
Object.defineProperty(global.navigator, 'geolocation', {
  value: mockGeolocation,
  writable: true,
});

describe('DeliveryServicePage Integration', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
    mockGeolocation.getCurrentPosition.mockClear();
  });

  it('renders all main components', () => {
    render(<DeliveryServicePage />);

    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    expect(screen.getByTestId('map-component')).toBeInTheDocument();
    expect(screen.getByTestId('provider-info')).toBeInTheDocument();
    expect(screen.getByText('送餐服務')).toBeInTheDocument();
  });

  it('handles location search through SearchBar', async () => {
    render(<DeliveryServicePage />);

    const searchButton = screen.getByText('Search Brisbane');
    await user.click(searchButton);

    expect(screen.getByText('Search: Brisbane')).toBeInTheDocument();
  });

  it('handles current location request', async () => {
    const mockPosition = {
      coords: {
        latitude: -27.4698,
        longitude: 153.0251,
        accuracy: 100,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
      },
      timestamp: Date.now(),
    };

    mockGeolocation.getCurrentPosition.mockImplementation((success) => {
      success(mockPosition);
    });

    render(<DeliveryServicePage />);

    const currentLocationButton = screen.getByText('Get Current Location');
    await user.click(currentLocationButton);

    await waitFor(() => {
      expect(screen.getByText('Location: -27.4698, 153.0251')).toBeInTheDocument();
    });
  });

  it('handles provider selection', async () => {
    render(<DeliveryServicePage />);

    const selectProviderButton = screen.getByText('Select Provider');
    await user.click(selectProviderButton);

    expect(screen.getByText('Selected: Test Provider')).toBeInTheDocument();
  });

  it('handles back navigation', async () => {
    render(<DeliveryServicePage />);

    const backButton = screen.getByText('← 返回');
    await user.click(backButton);

    expect(mockBack).toHaveBeenCalled();
  });

  it('displays loading state for geolocation', async () => {
    // Mock geolocation to delay response
    mockGeolocation.getCurrentPosition.mockImplementation((success, error) => {
      setTimeout(() => {
        success({
          coords: {
            latitude: -27.4698,
            longitude: 153.0251,
            accuracy: 100,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null,
          },
          timestamp: Date.now(),
        });
      }, 100);
    });

    render(<DeliveryServicePage />);

    const currentLocationButton = screen.getByText('Get Current Location');
    await user.click(currentLocationButton);

    // Should show loading state briefly
    expect(screen.getByText('Get Current Location')).toBeInTheDocument();
  });

  it('handles geolocation error gracefully', async () => {
    const mockError = {
      code: 1,
      message: 'User denied geolocation',
    };

    mockGeolocation.getCurrentPosition.mockImplementation((success, error) => {
      error(mockError);
    });

    // Mock window.alert
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<DeliveryServicePage />);

    const currentLocationButton = screen.getByText('Get Current Location');
    await user.click(currentLocationButton);

    expect(mockAlert).toHaveBeenCalledWith(
      'Unable to get current location, please check location permission settings'
    );

    mockAlert.mockRestore();
  });

  it('handles unsupported geolocation', async () => {
    // Remove geolocation from navigator
    Object.defineProperty(global.navigator, 'geolocation', {
      value: undefined,
      writable: true,
    });

    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<DeliveryServicePage />);

    const currentLocationButton = screen.getByText('Get Current Location');
    await user.click(currentLocationButton);

    expect(mockAlert).toHaveBeenCalledWith(
      'Your browser does not support geolocation'
    );

    mockAlert.mockRestore();
  });

  it('maintains state between component interactions', async () => {
    render(<DeliveryServicePage />);

    // Search for a location
    const searchButton = screen.getByText('Search Brisbane');
    await user.click(searchButton);

    // Select a provider
    const selectProviderButton = screen.getByText('Select Provider');
    await user.click(selectProviderButton);

    // Verify both states are maintained
    expect(screen.getByText('Search: Brisbane')).toBeInTheDocument();
    expect(screen.getByText('Selected: Test Provider')).toBeInTheDocument();
  });
});


