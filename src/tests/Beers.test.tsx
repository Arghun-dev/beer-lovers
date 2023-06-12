import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store';
import Beers from 'components/Beers';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const customRender = (ui: any, options = {}) =>
  render(ui, {
    wrapper: ({ children }) => (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    ),
    ...options,
  });

const server = setupServer(
  rest.get('https://api.punkapi.com/v2/beers', async (req, res, ctx) => {
    return await res(
      ctx.json([
        {
          id: 1,
          name: 'Beer 1',
          description: 'Description 1',
          image_url: 'https://example.com/beer1.jpg',
        },
        {
          id: 2,
          name: 'Beer 2',
          description: 'Description 2',
          image_url: 'https://example.com/beer2.jpg',
        },
      ])
    );
  })
);

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

describe('Beers', () => {
  beforeEach(async () => {
    customRender(<Beers />);
    await waitFor(() => {
      expect(screen.queryByTestId('beers-loading')).not.toBeInTheDocument();
    });
  });

  it('renders the Beers component with correct content', () => {
    // Check if the beers-list is rendered
    expect(screen.getByTestId('beers-list')).toBeInTheDocument();

    // Check if the BeersFilter component is rendered
    expect(screen.getByTestId('beers-filter')).toBeInTheDocument();
  });

  it('updates the search input value', () => {
    const searchInput = screen.getByLabelText('Search beer');

    fireEvent.change(searchInput, { target: { value: 'IPA' } });

    expect(searchInput).toHaveValue('IPA');
  });

  it('renders the beer cards with correct content', async () => {
    await waitFor(() => {
      expect(screen.queryAllByRole('link')).toHaveLength(2);
    });

    const beerCards = screen.getAllByRole('link');

    beerCards.forEach((card, index) => {
      const beer = card.querySelector('img');
      const meta = card.querySelector('.ant-card-meta');

      expect(beer).toHaveAttribute(
        'src',
        `https://example.com/beer${index + 1}.jpg`
      );
      expect(beer).toHaveAttribute('alt', `Beer ${index + 1}`);
      expect(meta).toHaveTextContent(`Beer ${index + 1}`);
      expect(meta).toHaveTextContent(`Description ${index + 1}`);
    });
  });

  it('navigates to the correct beer detail page when a beer card is clicked', async () => {
    await waitFor(() => {
      expect(screen.queryAllByRole('link')).toHaveLength(2);
    });

    const beerCards = screen.getAllByRole('link');

    fireEvent.click(beerCards[0]);

    expect(window.location.pathname).toBe('/beers/1');
  });
});
