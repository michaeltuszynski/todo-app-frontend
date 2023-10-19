import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import config from './config';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(`http://${config.REACT_APP_BACKEND_URL}/todos`);
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const data: Todo[] = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    try {
      const response = await fetch(`http://${config.REACT_APP_BACKEND_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTodo }),
      });
      if (!response.ok) {
        throw new Error('Failed to add todo');
      }
      const data: Todo = await response.json();
      setTodos((prevTodos) => [...prevTodos, data]);
      setNewTodo("");
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleDelete = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleToggle = (id: string, completed: boolean) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !completed } : todo
      )
    );
  };

  const handleUpdate = (id: string, title: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, title } : todo))
    );
  };

  return (
    <div className="container mt-5">
      <h1>Todo App</h1>
      <div className="input-group my-3">
        <input
          type="text"
          className="form-control"
          placeholder="New todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAddTodo}>
          Add
        </button>
      </div>
      <TodoList
        todos={todos}
        onDelete={handleDelete}
        onToggle={handleToggle}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default App;
