import { getAge } from './date-helpers';

export const validation = {
  email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Should be a valid email'),
  password: (value: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d#$@!%&*?]{8,}$/.test(value)
      ? null
      : 'Minimum 8 characters, at least 1 uppercase Latin letter, 1 lowercase Latin letter, and 1 number',
  firstName: (value: string) =>
    /^[a-zA-Z]+$/.test(value) ? null : 'First name should only contain Latin letters and cannot be empty',
  lastName: (value: string) =>
    /^[a-zA-Z]+$/.test(value) ? null : 'Last name should only contain Latin letters and cannot be empty',
  dateOfBirth: (value: Date) => (!value || getAge(value) < 13 ? 'Age must be greater than or equal 13' : null),
  country: (value: string) => (value ? null : 'Please choose a country'),
  city: (value: string) =>
    /^[a-zA-Z]+$/.test(value) ? null : 'City should only contain Latin letters and cannot be empty',
  streetName: (value: string) => (value ? null : 'Address cannot be empty'),
  postalCode: (value: string) => (/\b\d{5}\b$/.test(value) ? null : 'Should be a valid postal code (5 digits)'),
};
