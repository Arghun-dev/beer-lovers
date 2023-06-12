import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store/index';
import Layout from 'components/Layout';

describe('Layout component', () => {
  test('renders the header and content', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Layout>
            <div>Test Content</div>
          </Layout>
        </MemoryRouter>
      </Provider>
    );

    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();

    const contentElement = screen.getByText('Test Content');
    expect(contentElement).toBeInTheDocument();
  });
});
