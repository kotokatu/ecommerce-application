/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable @typescript-eslint/no-empty-function */
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import RegistrationPage from './RegistrationPage';
import ResizeObserver from 'resize-observer-polyfill';
global.ResizeObserver = ResizeObserver;

describe('RegistrationPage', () => {
  it('should display an error message when the user submits the form with an invalid email format', () => {
    render(<RegistrationPage onSignIn={jest.fn()} />, {
      wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
    });

    fireEvent.change(screen.getByLabelText('Email *'), { target: { value: 'invalid-email' } });
    fireEvent.click(screen.getByText('Sign up'));

    expect(screen.getByText('Should be a valid email')).toBeInTheDocument();
  });

  it('should display an error message when the form is submitted with a weak password', async () => {
    render(<RegistrationPage onSignIn={jest.fn()} />, {
      wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
    });

    fireEvent.change(screen.getByLabelText('Password *'), { target: { value: 'weak' } });
    fireEvent.click(screen.getByText('Sign up'));

    await screen.findByText(
      'Minimum 8 characters, at least 1 uppercase Latin letter, 1 lowercase Latin letter, and 1 number',
    );
  });

  it('should display an error message when the form is submitted with an empty first name', async () => {
    render(<RegistrationPage onSignIn={jest.fn()} />, {
      wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
    });

    fireEvent.change(screen.getByLabelText('First Name *'), { target: { value: '' } });
    fireEvent.click(screen.getByText('Sign up'));

    await screen.findByText('First name should only contain Latin letters and cannot be empty');
  });

  it('should display an error message when the form is submitted with an empty last name', async () => {
    render(<RegistrationPage onSignIn={jest.fn()} />, {
      wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
    });

    fireEvent.change(screen.getByLabelText('Last Name *'), { target: { value: '' } });
    fireEvent.click(screen.getByText('Sign up'));

    await screen.findByText('Last name should only contain Latin letters and cannot be empty');
  });

  it('should display an error message when the user submits the form with a date of birth indicating an age less than 13', async () => {
    render(<RegistrationPage onSignIn={jest.fn()} />, {
      wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
    });

    fireEvent.change(await screen.findByText('__.__.____'), { value: Date.now() });
    fireEvent.click(screen.getByText('Sign up'));

    expect(screen.getByText('Age must be greater than or equal to 13')).toBeInTheDocument();
  });

  it('should display an error message when the user submits the form with an empty shipping country', async () => {
    render(<RegistrationPage onSignIn={jest.fn()} />, {
      wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
    });

    fireEvent.change(screen.getAllByLabelText('Country *')[0], { target: { value: '' } });
    fireEvent.click(screen.getByText('Sign up'));

    expect(screen.getByText('Please choose a country')).toBeInTheDocument();
  });

  it('should display an error message when the user submits the form with an invalid shipping city', async () => {
    render(<RegistrationPage onSignIn={jest.fn()} />, {
      wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
    });

    fireEvent.change(screen.getAllByLabelText('City *')[0], { target: { value: '!invalid-city!' } });
    fireEvent.click(screen.getByText('Sign up'));

    expect(screen.getAllByText('City should only contain Latin letters')[0]).toBeInTheDocument();
  });

  it('should display an error message when the user submits the form with an invalid shipping postal code', () => {
    render(<RegistrationPage onSignIn={jest.fn()} />, {
      wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
    });

    fireEvent.change(screen.getAllByLabelText('Postal Code *')[0], { target: { value: '1234' } });
    fireEvent.click(screen.getByText('Sign up'));

    expect(screen.getAllByText('Should be a valid postal code (5 digits)')[0]).toBeInTheDocument();
  });
});
