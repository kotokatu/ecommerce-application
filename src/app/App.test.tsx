import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders App element', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  const appElement = screen.getByText(/30 FINGERS/i);
  expect(appElement).toBeInTheDocument();
});
