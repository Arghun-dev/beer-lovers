import React from 'react';
import { render } from '@testing-library/react';
import Error from 'components/Error';

describe('Error component', () => {
  it('should render correctly', () => {
    const { container } = render(<Error />);
    expect(container).toBeInTheDocument();
  });
});
