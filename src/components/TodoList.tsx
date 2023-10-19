import React from 'react';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: any[];
  fetchTodos: () => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, fetchTodos }) => {
  return (
    <div>
      {todos.map(todo => <TodoItem key={todo.id} {...todo} fetchTodos={fetchTodos} />)}
    </div>
  );
};

export default TodoList;
