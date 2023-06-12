import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import BeerDetail from 'components/BeerDetail';
import { beersService } from 'services/beersService';

const store = configureStore({
  reducer: {
    [beersService.reducerPath]: beersService.reducer,
  },
});

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
};

const mockBeerData = {
  id: '1',
  name: 'Test Beer',
  description: 'A test beer',
  abv: 5,
  ibu: 10,
  ebc: 20,
  first_brewed: '01/2020',
  brewers_tips: 'Test tips',
  food_pairing: ['Food 1', 'Food 2'],
  image_url: 'https://test-image-url.com',
};

describe('BeerDetail', () => {
  beforeEach(() => {
    // Mock the useGetSingleBeerQuery hook to return the mockBeerData
    jest
      .spyOn(require('services/beersService'), 'useGetSingleBeerQuery')
      .mockImplementation(() => ({
        data: [mockBeerData],
        isLoading: false,
      }));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders the component with beer data', async () => {
    renderWithProviders(<BeerDetail />);

    expect(screen.getByTestId('beer-detail-wrapper')).toBeInTheDocument();
  });

  it('renders the BeerDetail component with correct content', async () => {
    renderWithProviders(<BeerDetail />);

    // Check if the beer-detail-wrapper is rendered
    expect(
      await screen.findByTestId('beer-detail-wrapper')
    ).toBeInTheDocument();

    // Check if the breadcrumb is rendered with the correct items
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();

    // Check if the image is rendered with the correct src and alt attributes
    expect(screen.getByRole('img', { name: 'Test Beer' })).toHaveAttribute(
      'src',
      'https://test-image-url.com'
    );

    // Check if the beer name and description are rendered
    expect(
      screen.getByRole('heading', { name: 'Test Beer' })
    ).toBeInTheDocument();
    expect(screen.getByText('A test beer')).toBeInTheDocument();

    // Check if the food pairing section is rendered
    expect(screen.getByText(/food pairing:/i)).toBeInTheDocument();
    ['Food 1', 'Food 2'].forEach((food) => {
      expect(screen.getByText(food)).toBeInTheDocument();
    });

    // Check if the details section is rendered with correct values
    expect(screen.getByText(/abv:/i)).toBeInTheDocument();
    expect(screen.getByText(`${5}%`)).toBeInTheDocument();
    expect(screen.getByText(/ibu:/i)).toBeInTheDocument();
    expect(screen.getByText(10)).toBeInTheDocument();
    expect(screen.getByText(/ebc:/i)).toBeInTheDocument();
    expect(screen.getByText(20)).toBeInTheDocument();
    expect(screen.getByText(/first brewed:/i)).toBeInTheDocument();
    expect(screen.getByText('01/2020')).toBeInTheDocument();
    expect(screen.getByText(/brewer's tips:/i)).toBeInTheDocument();
    expect(screen.getByText('Test tips')).toBeInTheDocument();

    // Check if the share button is rendered
    expect(screen.getByTestId('popover-wrapper')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /share/i })).toBeInTheDocument();
    expect(screen.getByText(/share/i)).toBeInTheDocument();
  });

  it('handles ShareBeerPopover functionality', async () => {
    renderWithProviders(<BeerDetail />);

    await waitFor(() => {
      expect(screen.getByTestId('beer-detail-wrapper')).toBeInTheDocument();
    });

    const shareButton = screen.getByText('Share');
    act(() => {
      userEvent.click(shareButton);
    });

    // Check if the ShareBeerPopover is displayed
    expect(screen.getByTestId('share-popover-list')).toBeInTheDocument();
  });
});
