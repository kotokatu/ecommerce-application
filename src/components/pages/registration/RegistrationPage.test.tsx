/* eslint-disable @typescript-eslint/no-empty-function */
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import RegistrationPage from './RegistrationPage';

describe('RegistrationPage', () => {
  it('displays an error message when the user submits the form with an invalid email format', () => {
    render(
      <BrowserRouter>
        <RegistrationPage onSignIn={() => {}} />
      </BrowserRouter>,
    );
    const emailInput = screen.getByLabelText('Email *');
    const submitButton = screen.getByText('Sign up');

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    expect(screen.getByText('Should be a valid email')).toBeInTheDocument();
  });
});
