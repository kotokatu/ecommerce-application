/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import RegistrationPage from './RegistrationPage';
import ResizeObserver from 'resize-observer-polyfill';
import userEvent from '@testing-library/user-event';
import { userService } from '../../../services/UserService/UserService';
global.ResizeObserver = ResizeObserver;
jest.setTimeout(35000);
jest.mock('../../../services/UserService/UserService', () => ({
  userService: {
    signup: jest.fn(),
  },
}));

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

    expect(
      screen.getByText(
        'Minimum 8 characters, at least 1 uppercase Latin letter, 1 lowercase Latin letter, and 1 number',
      ),
    ).toBeInTheDocument();
  });

  it('should display an error message when the form is submitted with an empty first name', async () => {
    render(<RegistrationPage onSignIn={jest.fn()} />, {
      wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
    });

    fireEvent.change(screen.getByLabelText('First Name *'), { target: { value: '' } });
    fireEvent.click(screen.getByText('Sign up'));

    expect(screen.getByText('First name should only contain Latin letters and cannot be empty')).toBeInTheDocument();
  });

  it('should display an error message when the form is submitted with an empty last name', async () => {
    render(<RegistrationPage onSignIn={jest.fn()} />, {
      wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
    });

    fireEvent.change(screen.getByLabelText('Last Name *'), { target: { value: '' } });
    fireEvent.click(screen.getByText('Sign up'));

    expect(screen.getByText('Last name should only contain Latin letters and cannot be empty')).toBeInTheDocument();
  });

  it('should display an error message when the user submits the form with a date of birth indicating an age less than 13', async () => {
    const { container } = render(<RegistrationPage onSignIn={jest.fn()} />, {
      wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
    });

    await act(() => userEvent.click(container.querySelector('[data-dates-input]') as HTMLElement));
    await act(async () => userEvent.click(container.querySelector('table button') as HTMLElement));
    fireEvent.click(screen.getByText('Sign up'));

    expect(screen.getByText('Age must be greater than or equal to 13')).toBeInTheDocument();
  });

  it('should display an error message when the user submits the form with an empty shipping country', async () => {
    render(<RegistrationPage onSignIn={jest.fn()} />, {
      wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
    });

    fireEvent.click(screen.getByText('Sign up'));

    expect(screen.getAllByText('Please choose a country')[0]).toBeInTheDocument();
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

  it('should submit the form when all required fields are filled out correctly', async () => {
    const mockSignup = jest.spyOn(userService, 'signup');
    const { container } = render(<RegistrationPage onSignIn={jest.fn()} />, {
      wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
    });
    fireEvent.change(screen.getByLabelText('First Name *'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last Name *'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Email *'), { target: { value: 'johndoe@example.com' } });
    fireEvent.change(screen.getByLabelText('Password *'), { target: { value: 'Password1' } });

    await act(() => userEvent.click(container.querySelector('[data-dates-input]') as HTMLElement));
    await act(() =>
      userEvent.click(container.querySelector('.mantine-DatePickerInput-calendarHeaderLevel') as HTMLElement),
    );
    await act(() =>
      userEvent.click(container.querySelector('.mantine-DatePickerInput-calendarHeaderLevel') as HTMLElement),
    );
    await act(() => userEvent.click(container.querySelector('[data-previous=true]') as HTMLElement));
    await act(() => userEvent.click(container.querySelector('[data-previous=true]') as HTMLElement));
    await act(() => userEvent.click(container.querySelector('table button') as HTMLElement));
    await act(() => userEvent.click(container.querySelector('table button') as HTMLElement));
    await act(() => userEvent.click(container.querySelector('table button') as HTMLElement));

    await act(() => userEvent.click(screen.getAllByRole('searchbox')[0]));
    await act(() => userEvent.click(screen.getAllByRole('option')[0] as HTMLElement));

    fireEvent.change(screen.getAllByLabelText('City *')[0], { target: { value: 'Rome' } });
    fireEvent.change(screen.getAllByLabelText('Address *')[0], { target: { value: 'Via Roma 1' } });
    fireEvent.change(screen.getAllByLabelText('Postal Code *')[0], { target: { value: '00100' } });

    await act(() => userEvent.click(screen.getAllByRole('searchbox')[1]));
    await act(() => userEvent.click(screen.getAllByRole('option')[0] as HTMLElement));

    fireEvent.change(screen.getAllByLabelText('City *')[1], { target: { value: 'Rome' } });
    fireEvent.change(screen.getAllByLabelText('Address *')[1], { target: { value: 'Via Roma 1' } });
    fireEvent.change(screen.getAllByLabelText('Postal Code *')[1], { target: { value: '00100' } });
    fireEvent.click(screen.getByText('Sign up'));

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalled();
    });
  });
});
