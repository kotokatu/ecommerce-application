import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import SearchInput from './SearchInput';

describe('SearchInput', () => {
  it('should render a TextInput component with the correct label and placeholder', () => {
    const label = 'Search';
    const placeholder = 'Enter search query';
    const setQuery = jest.fn();

    render(
      <BrowserRouter>
        <SearchInput label={label} placeholder={placeholder} setQuery={setQuery} />
      </BrowserRouter>,
    );

    expect(screen.getByLabelText(label)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it('should display a clear button when searchValue is not empty', () => {
    const label = 'Search';
    const placeholder = 'Enter search query';
    const setQuery = jest.fn();

    render(
      <BrowserRouter>
        <SearchInput label={label} placeholder={placeholder} setQuery={setQuery} />
      </BrowserRouter>,
    );

    const clearButton = screen.getByLabelText(label);
    expect(clearButton).toBeInTheDocument();
  });
});
