import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import config, { loadConfig } from './config';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [configLoaded, setConfigLoaded] = useState(false);

  useEffect(() => {
    loadConfig().then(() => {
      setConfigLoaded(true);
      fetchTodos().then(fetchedTodos => setTodos(fetchedTodos));
    });
  }, []);

  const fetchTodos = async (): Promise<Todo[]> => {
    try {
      const response = await fetch(`${config.REACT_APP_BACKEND_URL}/todos`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching todos:", error);
      return [];
    }
  };

  const handleAddTodo = async () => {
    try {
      const response = await fetch(`${config.REACT_APP_BACKEND_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTodo }),
      });

      const data = await response.json();
      //setTodos([...todos, data]);
      setTodos(prevTodos => [...prevTodos, data]);
      setNewTodo('');
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`${config.REACT_APP_BACKEND_URL}/todos/${id}`, {
        method: 'DELETE',
      });
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleToggle = async (id: string, completed: boolean) => {
    try {
      await fetch(`${config.REACT_APP_BACKEND_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !completed }),
      });
      const updatedTodos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !completed } : todo
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  const handleUpdate = async (id: string, title: string) => {
    try {
      await fetch(`${config.REACT_APP_BACKEND_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });
      const updatedTodos = todos.map(todo =>
        todo.id === id ? { ...todo, title } : todo
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  if (!configLoaded) {
    return <div>Loading...</div>;
  }

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
}

export default App;
