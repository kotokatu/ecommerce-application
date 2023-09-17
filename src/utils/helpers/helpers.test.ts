import { getSearchParams } from './search-params-helpers';
import { getAge, formatDate } from './date-helpers';
import { formatPrice } from './format-price';

describe('getSearchParams', () => {
  it('should return an array of values when the parameter exists in the searchParams', () => {
    const searchParams = new URLSearchParams('param="value1", "value2", "value3"');
    const paramName = 'param';
    const result = getSearchParams(searchParams, paramName);
    expect(result).toEqual(['value1', 'value2', 'value3']);
  });

  it('should return an empty array when the parameter does not exist in the searchParams', () => {
    const searchParams = new URLSearchParams('param="value"');
    const paramName = 'nonexistentParam';
    const result = getSearchParams(searchParams, paramName);
    expect(result).toEqual([]);
  });

  it('should return an array of one empty string when the parameter exists in the searchParams but has no value', () => {
    const searchParams = new URLSearchParams('param=');
    const paramName = 'param';
    const result = getSearchParams(searchParams, paramName);
    expect(result).toEqual(['']);
  });

  it('should return an array of one value when the parameter exists in the searchParams and has one value', () => {
    const searchParams = new URLSearchParams('param="value"');
    const paramName = 'param';
    const result = getSearchParams(searchParams, paramName);
    expect(result).toEqual(['value']);
  });

  it('should return an array of multiple values when the parameter exists in the searchParams and has multiple comma-separated values', () => {
    const searchParams = new URLSearchParams('param="value1", "value2", "value3"');
    const paramName = 'param';
    const result = getSearchParams(searchParams, paramName);
    expect(result).toEqual(['value1', 'value2', 'value3']);
  });
});

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

describe('formatPrice', () => {
  it('should format positive numbers with two decimal places', () => {
    expect(formatPrice(10)).toEqual('10');
    expect(formatPrice(10.5)).toEqual('10.50');
    expect(formatPrice(10.55)).toEqual('10.55');
  });

  it('should format negative numbers with two decimal places', () => {
    expect(formatPrice(-10)).toEqual('-10');
    expect(formatPrice(-10.5)).toEqual('-10.50');
    expect(formatPrice(-10.55)).toEqual('-10.55');
  });

  it('should format zero with two decimal places', () => {
    expect(formatPrice(0)).toEqual('0');
  });

  it('should remove trailing zeros', () => {
    expect(formatPrice(10.5)).toEqual('10.50');
    expect(formatPrice(10.55)).toEqual('10.55');
  });

  it('should not format numbers with more than two decimal places', () => {
    expect(formatPrice(10.555)).toEqual('10.55');
  });
});
