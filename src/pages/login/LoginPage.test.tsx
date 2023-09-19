import LoginPage from './LoginPage';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

describe('Login Page', () => {
  it('renders forms without errors', () => {
    render(<LoginPage />, {
      wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
    });
    expect(screen.getByLabelText('Email *')).toBeInTheDocument();
    expect(screen.getByLabelText('Password *')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('validates email format and displays error message', () => {
    render(<LoginPage />, {
      wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
    });

    const emailInput = screen.getByLabelText('Email *');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(screen.getByText('Sign in'));

    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('validates password format and displays error message', () => {
    render(<LoginPage />, {
      wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
    });

    const passwordInput = screen.getByLabelText('Password *');
    fireEvent.change(passwordInput, { target: { value: 'invalid-password' } });
    fireEvent.click(screen.getByText('Sign in'));

    expect(
      screen.getByText(
        'Minimum 8 characters, at least 1 uppercase Latin letter, 1 lowercase Latin letter, and 1 number',
      ),
    ).toBeInTheDocument();
  });
});
