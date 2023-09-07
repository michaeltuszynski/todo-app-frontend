 /* eslint-disable */
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import TodoItem, { Todo } from '../TodoItem'; // Update the import path as needed

jest.mock('axios'); // Mocking axios

const mockTodo: Todo = {
  _id: '1',
  title: 'Sample Todo',
  completed: false
};

test('renders todo item', () => {
  render(<TodoItem todo={mockTodo} onTodoUpdate={jest.fn()} onDelete={jest.fn()} apiEndpoint='' />);

  // Assert that the todo title is rendered
  const todoTitleElement = screen.getByText('Sample Todo');
  expect(todoTitleElement).toBeInTheDocument();

  // Assert that the checkbox is present
  const checkboxElement = screen.getByRole('checkbox');
  expect(checkboxElement).toBeInTheDocument();
});

test('toggles todo completion status', async () => {
  render(<TodoItem todo={mockTodo} onTodoUpdate={jest.fn()} onDelete={jest.fn()} apiEndpoint='' />);
  const checkboxElement = screen.getByRole('checkbox');

  // Simulate clicking the checkbox
  await fireEvent.click(checkboxElement);

  // Assert that axios.put is called with the expected arguments
  expect(axios.put).toHaveBeenCalledWith(
    'http://localhost:5000/todos/1',
    expect.objectContaining({ completed: true })
  );
});

test('starts editing todo', () => {
  render(<TodoItem todo={mockTodo} onTodoUpdate={jest.fn()} onDelete={jest.fn()} apiEndpoint='' />);
  const editButton = screen.getByText('Edit');

  // Simulate clicking the edit button
  fireEvent.click(editButton);

  // Assert that input for editing is visible
  const editInput = screen.getByRole('textbox');
  expect(editInput).toBeInTheDocument();
});

test('edits todo item', async () => {
    render(<TodoItem todo={mockTodo} onTodoUpdate={jest.fn()} onDelete={jest.fn()} apiEndpoint='' />);
    const editButton = screen.getByText('Edit');

    // Simulate clicking the edit button
    await fireEvent.click(editButton);

    // Get the input element for editing
    const editInput = screen.getByRole('textbox');

    // Update the edited title
    fireEvent.change(editInput, { target: { value: 'Updated Todo Title' } });

    // Simulate clicking the save button
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    // Wait for the axios request to complete
    await waitFor(() => expect(axios.put).toHaveBeenCalledTimes(1));

    // Assert that axios.put is called with the updated title
    expect(axios.put).toHaveBeenCalledWith(
      'http://localhost:5000/todos/1',
      expect.objectContaining({ title: 'Updated Todo Title' })
    );
});

test('deletes todo item', async () => {
    render(<TodoItem todo={mockTodo} onTodoUpdate={jest.fn()} onDelete={jest.fn()} apiEndpoint=''/>);
    const deleteButton = screen.getByText('Delete');

    // Simulate clicking the delete button
    await fireEvent.click(deleteButton);

    // Wait for the axios request to complete
    await waitFor(() => expect(axios.delete).toHaveBeenCalledTimes(1));

    // Assert that axios.delete is called with the correct URL
    expect(axios.delete).toHaveBeenCalledWith('http://localhost:5000/todos/1');
});
