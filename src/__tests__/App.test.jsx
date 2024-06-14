import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import punycode from 'punycode';

import App from '../App';

// Test to check if the App renders without crashing
test('renders without crashing', () => {
  render(<App />);
  expect(screen.getByTestId('todo-header')).toBeInTheDocument();
  expect(screen.getByText(/To Do List:/i)).toBeInTheDocument();
});

// Test to check if the form can submit
test('allows form submission', () => {
  render(<App />);
  const input = screen.getByPlaceholderText('Item Details');
  const button = screen.getByText('Submit');
  fireEvent.change(input, { target: { value: 'New Todo' } });
  fireEvent.click(button);
  expect(screen.getByText('New Todo')).toBeInTheDocument(); // Assuming it shows up in the list
});

// Test to check toggling an item's complete status
test('toggles completion status', () => {
  render(<App />);
  const addItem = (text) => {
    const input = screen.getByPlaceholderText('Item Details');
    const button = screen.getByText('Submit');
    fireEvent.change(input, { target: { value: text } });
    fireEvent.click(button);
  };

  addItem('Complete me');

  const checkbox = screen.getByLabelText('Complete');
  fireEvent.click(checkbox);
  // Assuming that the text decoration changes or complete text updates
  expect(checkbox).toBeChecked();
});
