import { getAge, formatDate } from './date-helpers';

describe('getAge', () => {
  it('should return correct age difference in years', () => {
    const currentDate = new Date();
    const birthDate = new Date('1990-01-01');
    expect(getAge(birthDate)).toBe(currentDate.getFullYear() - 1990);
  });

  it('should return 0 when given the current date', () => {
    const currentDate = new Date();
    const age = getAge(currentDate);
    expect(age).toBe(0);
  });

  it('should handle future dates correctly', () => {
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getFullYear() + 1, 0, 1);
    expect(getAge(futureDate)).toBe(0);
  });
});

describe('formatDate', () => {
  it('should return the correct string for a Date object', () => {
    const date = new Date('2022-01-01T12:34:56');
    expect(formatDate(date)).toBe('2022-01-01');
  });

  it('should return the correct string for a Date object with a timezone offset', () => {
    const date = new Date('2022-01-01T12:34:56+03:00');
    expect(formatDate(date)).toBe('2022-01-01');
  });
});