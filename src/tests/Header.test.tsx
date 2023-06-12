import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from 'components/Layout/Header';

describe('Header component', () => {
  test('renders the logo and title', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const logoElement = screen.getByAltText('logo');
    expect(logoElement).toBeInTheDocument();

    const titleElement = screen.getByRole('heading', { name: /beer lovers/i });
    expect(titleElement).toBeInTheDocument();
  });

  test('navigates to home page when clicking the title', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const titleElement = screen.getByTestId('home-page-link');
    expect(titleElement).toHaveAttribute('href', '/');
  });
});
