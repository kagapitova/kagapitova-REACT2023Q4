import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from '../src/App';

test('App component renders correctly', () => {
  const { getByText, getByPlaceholderText } = render(<App />);
  const headingElement = getByText('Star Wars Search');
  const inputElement = getByPlaceholderText('Search...');
  expect(headingElement).toBeInTheDocument();
  expect(inputElement).toBeInTheDocument();
});

test('App component handles search', () => {
  const { getByPlaceholderText, getByText } = render(<App />);
  const inputElement = getByPlaceholderText('Search...');
  const buttonElement = getByText('Search');

  fireEvent.change(inputElement, { target: { value: 'Luke' } });
  fireEvent.click(buttonElement);

  // You may assert the expected behavior here, such as checking for API calls and results.
  // Mocking the API calls and handling asynchronous code is typically done with tools like jest.mock and async/await.
});
