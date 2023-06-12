import React from 'react';
import { render, screen } from '@testing-library/react';
import Container from 'components/Container';

describe('Container component', () => {
  test('renders children correctly', () => {
    render(
      <Container>
        <div>Test Content</div>
      </Container>
    );

    const contentElement = screen.getByText('Test Content');
    expect(contentElement).toBeInTheDocument();
  });

  test('renders with fluid class when fluid prop is true', () => {
    render(
      <Container fluid>
        <div>Test Content</div>
      </Container>
    );

    const containerElement = screen.getByTestId('container');
    expect(containerElement).toHaveClass('containerFluid');
  });

  test('renders with custom className', () => {
    render(
      <Container className="customClass">
        <div>Test Content</div>
      </Container>
    );

    const containerElement = screen.getByTestId('container');
    expect(containerElement).toHaveClass('customClass');
  });
});
