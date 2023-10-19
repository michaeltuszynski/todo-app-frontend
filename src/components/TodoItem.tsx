import React, { useState } from 'react';
import config from '../config';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onToggle: (id: string, completed: boolean) => void;
  onUpdate: (id: string, title: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onToggle, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`${config.REACT_APP_BACKEND_URL}/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, completed: todo.completed }),
      });
      if (!response.ok) {
        throw new Error('Failed to update todo');
      }
      onUpdate(todo.id, title);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleToggleClick = async () => {
    try {
      const response = await fetch(`${config.REACT_APP_BACKEND_URL}/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: todo.title, completed: !todo.completed }),
      });
      if (!response.ok) {
        throw new Error('Failed to toggle todo');
      }
      onToggle(todo.id, !todo.completed);
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const handleDeleteClick = async () => {
    try {
      const response = await fetch(`${config.REACT_APP_BACKEND_URL}/todos/${todo.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }
      onDelete(todo.id);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="d-flex justify-content-between align-items-center my-2 border rounded p-2">
      {isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control me-2"
          />
          <button onClick={handleSaveClick} className="btn btn-success">
            Save
          </button>
        </>
      ) : (
        <>
          <div className="d-flex align-items-center">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={handleToggleClick}
              className="me-2"
            />
            <span className={`text-${todo.completed ? 'muted' : 'dark'}`} style={todo.completed ? { textDecoration: 'line-through' } : {}}>
              {todo.title}
            </span>
          </div>
          <div>
            <button onClick={handleEditClick} className="btn btn-warning btn-sm me-2">
              Edit
            </button>
            <button onClick={handleDeleteClick} className="btn btn-danger btn-sm">
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;
