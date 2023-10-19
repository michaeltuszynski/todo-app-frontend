import React, { useCallback, useEffect, useState } from 'react';
import config from './config';
import TodoList from './components/TodoList';

const App: React.FC = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const API_URL = config.REACT_APP_BACKEND_URL;

  const fetchTodos = useCallback(() => {
    fetch(`${API_URL}/todos`)
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error("Failed to fetch todos:", err));
  }, [API_URL, setTodos]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAddTodo = () => {
    fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTodo }),
    })
    .then(() => {
      fetchTodos();
      setNewTodo('');
    });
  };

  return (
    <div className="container">
      <h1>Todo App</h1>
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="New Todo" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        <button className="btn btn-primary" onClick={handleAddTodo}>Add</button>
      </div>
      <TodoList todos={todos} fetchTodos={fetchTodos} />
    </div>
  );
};

export default App;

