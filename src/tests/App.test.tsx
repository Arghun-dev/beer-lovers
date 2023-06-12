import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../store';
import App from '../App';

describe('App', () => {
  it('renders Beers component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    const beersWrapper = screen.getByTestId('beers-list');
    expect(beersWrapper).toBeInTheDocument();
  });

  it('renders BeerDetail component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/beers/1']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    const beerDetailElement = screen.getByTestId('beer-detail-wrapper');
    expect(beerDetailElement).toBeInTheDocument();
  });
});
