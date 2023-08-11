import { getAge } from './date-helpers';

export const validation = {
  email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
  password: (value: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d#$@!%&*?]{8,}$/.test(value)
      ? null
      : 'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number',
  firstName: (value: string) => (/^[a-zA-Z]+$/.test(value) ? null : 'First name is too short'),
  lastName: (value: string) => (/^[a-zA-Z]+$/.test(value) ? null : 'Last name is too short'),
  dateOfBirth: (value: Date) => (!value || getAge(value) < 13 ? 'Age must be greater than or equal 13' : null),
  country: (value: string) => (value ? null : 'Please choose a country'),
  city: (value: string) => (/^[a-zA-Z]+$/.test(value) ? null : 'Should only contain letters'),
  streetName: (value: string) => (value ? null : 'Address is too short'),
  postalCode: (value: string) => (/\b\d{5}\b$/.test(value) ? null : 'Should be a valid postal code (5 digits)'),
};
