import React, { useState } from 'react';
import config from '../config';

interface TodoItemProps {
  id: string;
  title: string;
  completed: boolean;
  fetchTodos: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, title, completed, fetchTodos }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const API_URL = config.REACT_APP_BACKEND_URL;

  const handleToggle = () => {
    fetch(`${API_URL}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed }),
    })
    .then(fetchTodos);
  };

  const handleEdit = () => {
    fetch(`${API_URL}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editedTitle }),
    })
    .then(() => {
      setIsEditing(false);
      fetchTodos();
    });
  };

  const handleDelete = () => {
    fetch(`${API_URL}/todos/${id}`, {
      method: 'DELETE'
    })
    .then(fetchTodos);
  };

  if (isEditing) {
    return (
      <div className="card mb-2">
        <div className="card-body">
          <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
          <button onClick={handleEdit}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="card mb-2">
      <div className="card-body">
        <input type="checkbox" checked={completed} onChange={handleToggle} />
        <h5 className={`card-title ${completed ? 'text-muted' : ''}`}>{title}</h5>
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;
