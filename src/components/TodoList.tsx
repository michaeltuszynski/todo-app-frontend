import React, { useState, useEffect } from 'react';
import config from '../config';
import TodoItem from './TodoItem';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface TodoListProps {
    todos: Todo[];
    onDelete: (id: string) => void;
    onToggle: (id: string, completed: boolean) => void;
    onUpdate: (id: string, title: string) => void;
  }

const TodoList: React.FC<TodoListProps> = ({ onDelete, onToggle, onUpdate }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(`http://${config.REACT_APP_BACKEND_URL}/todos`);
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const handleDelete = (id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const handleToggle = (id: string, completed: boolean) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !completed } : todo
      )
    );
  };

  const handleUpdate = (id: string, title: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, title: title } : todo
      )
    );
  };

  return (
    <div>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={handleDelete}
          onToggle={handleToggle}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
};

export default TodoList;
