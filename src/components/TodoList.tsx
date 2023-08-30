import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';

const BACKEND_URI = process.env.REACT_APP_BACKEND_URI || 'localhost:5000';

type Todo = {
    _id: string;
    title: string;
    completed: boolean;
};

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [title, setTitle] = useState<string>('');

    useEffect(() => {
        async function fetchTodos() {
            const response = await axios.get<Todo[]>(`http://${BACKEND_URI}/todos`);
            setTodos(response.data);
        }
        fetchTodos();
    }, []);

    const addTodo = async () => {
        const response = await axios.post<Todo>(`http://${BACKEND_URI}/todos`, { title });
        setTodos([...todos, response.data]);
        setTitle('');
    };

    const handleTodoUpdate = (id: string, updatedTodo: Todo) => {
        const updatedTodos = todos.map(todo => (todo._id === id ? updatedTodo : todo));
        setTodos(updatedTodos);
    };

    const handleDelete = (id: string) => {
        const updatedTodos = todos.filter(todo => todo._id !== id);
        setTodos(updatedTodos);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">ToDo App</h1>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Add a new task"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <div className="input-group-append">
                    <button className="btn btn-primary" onClick={addTodo}>Add</button>
                </div>
            </div>
            <ul className="list-group">
                {todos.map(todo => (
                    <TodoItem
                        key={todo._id}
                        todo={todo}
                        onTodoUpdate={handleTodoUpdate}
                        onDelete={handleDelete}
                    />
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
