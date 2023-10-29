// Search.test.tsx
import { render, fireEvent } from '@testing-library/react';
import Search from '../src/Search';
import '@testing-library/jest-dom';

test('Search component renders correctly', () => {
  const { getByText, getByPlaceholderText } = render(<Search onSearch={() => {}} />);
  const inputElement = getByPlaceholderText('Search...');
  const buttonElement = getByText('Search');
  expect(inputElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});

test('Search component handles search term input', () => {
  const onSearch = jest.fn();
  const { getByPlaceholderText, getByText } = render(<Search onSearch={onSearch} />);
  const inputElement = getByPlaceholderText('Search...') as HTMLInputElement;
  const buttonElement = getByText('Search');

  fireEvent.change(inputElement, { target: { value: 'Luke' } });
  fireEvent.click(buttonElement);

  expect(inputElement.value).toBe('Luke');
  expect(onSearch).toHaveBeenCalledWith('Luke');
});
