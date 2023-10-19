import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import config, { loadConfig } from './config';

interface Todo {
    id: string;
    title: string;
    completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    async function initialize() {
      await loadConfig();
      await fetchTodos();
    }

    initialize();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(`${config.REACT_APP_BACKEND_URL}/todos`);
      const todosData = await response.json();
      setTodos(todosData);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  };

  const addTodo = async (title: string) => {
    if (title.trim() === "") {
      console.warn("Todo title cannot be empty.");
      return;
    }

    try {
      const response = await fetch(`${config.REACT_APP_BACKEND_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title })
      });

      if (response.ok) {
        const newTodo = await response.json();
        setTodos([...todos, { id: newTodo.id, title, completed: false }]);
        setTitle(''); // Clear the input field after adding
      } else {
        console.error('Failed to add todo:', await response.text());
      }
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`${config.REACT_APP_BACKEND_URL}/todos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchTodos(); // Refetch the list to get the updated list
      } else {
        console.error('Failed to delete todo:', await response.text());
      }
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    try {
      const response = await fetch(`${config.REACT_APP_BACKEND_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !completed }),
      });

      if (response.ok) {
        await fetchTodos(); // Refetch the list to get the updated list
      } else {
        console.error('Failed to toggle todo:', await response.text());
      }
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    }
  };

  const updateTodo = async (id: string, newTitle: string) => {
    try {
      const response = await fetch(`${config.REACT_APP_BACKEND_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTitle }),
      });

      if (response.ok) {
        await fetchTodos(); // Refetch the list to get the updated list
      } else {
        console.error('Failed to update todo:', await response.text());
      }
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Todo App</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add a todo..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="input-group-append">
          <button onClick={() => addTodo(title)} className="btn btn-primary">
            Add Todo
          </button>
        </div>
      </div>
      <TodoList
        backendUrl={config.REACT_APP_BACKEND_URL || "localhost:5000"}
        todos={todos}
        onDelete={deleteTodo}
        onToggle={toggleTodo}
        onUpdate={updateTodo}
      />
    </div>
  );
}

export default App;
