import { getAge } from './date-helpers';

const emailRegex = /^\S+@\S+$/;
const defaultRegex = /^[a-zA-Z]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const postalCodeRegex = /\b\d{5}\b$/;

export const validation = {
  email: (value: string) => (emailRegex.test(value) ? null : 'Invalid email'),
  password: (value: string) =>
    passwordRegex.test(value)
      ? null
      : 'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number',
  firstName: (value: string) => (defaultRegex.test(value) ? null : 'First name is too short'),
  lastName: (value: string) => (defaultRegex.test(value) ? null : 'Last name is too short'),
  dateOfBirth: (value: Date) => (!value || getAge(value) < 13 ? 'Age must be greater than or equal 13' : null),
  country: (value: string) => (value ? null : 'Please choose a country'),
  city: (value: string) => (defaultRegex.test(value) ? null : 'Should only contain letters'),
  streetName: (value: string) => (value ? null : 'Address is too short'),
  postalCode: (value: string) => (postalCodeRegex.test(value) ? null : 'Should be a valid postal code (5 digits)'),
};
