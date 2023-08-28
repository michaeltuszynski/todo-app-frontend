import React, { useState } from 'react';
import axios from 'axios';

export type Todo = {
    _id: string;
    title: string;
    completed: boolean;
};

type TodoItemProps = {
    todo: Todo;
    onTodoUpdate: (id: string, updatedTodo: Todo) => void;
    onDelete: (id: string) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, onTodoUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedTitle, setEditedTitle] = useState<string>(todo.title);

    const toggleCompleted = async () => {
        const updatedTodo = { ...todo, completed: !todo.completed };
        await axios.put(`http://localhost:5000/todos/${todo._id}`, updatedTodo);
        onTodoUpdate(todo._id, updatedTodo);
    };

    const startEditing = () => {
        setIsEditing(true);
    };

    const handleEdit = async () => {
        const updatedTodo = { ...todo, title: editedTitle };
        await axios.put(`http://localhost:5000/todos/${todo._id}`, updatedTodo);
        onTodoUpdate(todo._id, updatedTodo);
        setIsEditing(false);
    };

    const handleDelete = async () => {
        await axios.delete(`http://localhost:5000/todos/${todo._id}`);
        onDelete(todo._id);
    };

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            {isEditing ? (
                <>
                    <input
                        type="text"
                        className="form-control"
                        value={editedTitle}
                        onChange={e => setEditedTitle(e.target.value)}
                    />
                    <button className="btn btn-success ml-2" onClick={handleEdit}>Save</button>
                </>
            ) : (
                <>
                    <div>
                        <input
                            type="checkbox"
                            className="mr-2"
                            checked={todo.completed}
                            onChange={toggleCompleted}
                        />
                        <span className={todo.completed ? 'text-muted text-decoration-line-through' : ''}>&nbsp;&nbsp;
                            {todo.title}
                        </span>
                    </div>
                    <div>
                        <button className="btn btn-warning btn-sm mr-2" onClick={startEditing}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={handleDelete}>Delete</button>
                    </div>
                </>
            )}
        </li>
    );
}

export default TodoItem;
