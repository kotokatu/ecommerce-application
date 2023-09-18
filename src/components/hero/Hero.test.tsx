import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Hero } from './Hero';
import '@testing-library/jest-dom/extend-expect';

describe('Hero component', () => {
  it('renders the title and description correctly', () => {
    render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>,
    );

    expect(screen.getByText('NEW COLLECTION')).toBeInTheDocument();
    expect(screen.getByText('AUTUMN')).toBeInTheDocument();
  });

  it('renders the "SHOP" button correctly', () => {
    render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>,
    );

    expect(screen.getByText('SHOP')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/catalog');
  });
});
