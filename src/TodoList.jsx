import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import './TodoList.css';

export default function TodoList() {   
    const [todos, setTodos] = useState([]); // Start with empty list
    const [newTodo, setNewTodo] = useState("");

    const addNewTask = () => {
        if (newTodo.trim() === "") return;
        setTodos([...todos, { 
            task: newTodo, 
            id: uuidv4(), 
            completed: false 
        }]);
        setNewTodo("");
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const toggleComplete = (id) => {
        setTodos(todos.map(todo => 
            todo.id === id ? {...todo, completed: !todo.completed} : todo
        ));
    };

    return (
        <div className="todo-app">
            <h1 className="app-title">Task Manager</h1>
            
            <div className="input-group">
                <input
                    className="todo-input"
                    placeholder="What needs to be done?"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addNewTask()}
                />
                <button className="add-btn" onClick={addNewTask}>
                    Add
                </button>
            </div>
            
            <ul className="todo-list">
                {todos.length === 0 ? (
                    <div className="empty-state">No tasks yet. Add one above!</div>
                ) : (
                    todos.map(todo => (
                        <li key={todo.id} className="todo-item">
                            <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                                {todo.task}
                            </span>
                            <div className="actions">
                                <button
                                    className={`action-btn complete-btn ${todo.completed ? 'completed' : ''}`}
                                    onClick={() => toggleComplete(todo.id)}
                                >
                                    {todo.completed ? 'Undo' : '✓'}
                                </button>
                                <button
                                    className="action-btn delete-btn"
                                    onClick={() => deleteTodo(todo.id)}
                                >
                                    ✕
                                </button>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}