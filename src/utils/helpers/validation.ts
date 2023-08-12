import { getAge } from './date-helpers';

const emailRegex = /^\S+@\S+$/;
const onlyLettersRegex = /^[a-zA-Z]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const postalCodeRegex = /\b\d{5}\b$/;

export const validation = {
  email: (value: string) => (emailRegex.test(value) ? null : 'Should be a valid email'),
  password: (value: string) =>
    passwordRegex.test(value)
      ? null
      : 'Minimum 8 characters, at least 1 uppercase Latin letter, 1 lowercase Latin letter, and 1 number',
  firstName: (value: string) =>
    onlyLettersRegex.test(value) ? null : 'First name should only contain Latin letters and cannot be empty',
  lastName: (value: string) =>
    onlyLettersRegex.test(value) ? null : 'Last name should only contain Latin letters and cannot be empty',
  dateOfBirth: (value: Date) => (!value || getAge(value) < 13 ? 'Age must be greater than or equal 13' : null),
  address: {
    country: (value: string) => (value ? null : 'Please choose a country'),
    city: (value: string) => (onlyLettersRegex.test(value) ? null : 'Should only contain Latin letters'),
    streetName: (value: string) => (value.trim() ? null : 'Address cannon be empty'),
    postalCode: (value: string) => (postalCodeRegex.test(value) ? null : 'Should be a valid postal code (5 digits)'),
  },
};
