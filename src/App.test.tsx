import { render, screen } from '@testing-library/react';
import App from './App';

test('renders navigation bar', () => {
  render(<App />);

  const navBar = screen.getByRole('navigation');
  expect(navBar).toBeInTheDocument();
  expect(navBar).toHaveTextContent('Beer Lovers');
});
