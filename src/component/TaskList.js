import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Edit, CheckCircle, XCircle } from 'lucide-react';
import "./TaskList.css"
function TaskList() {
const [tasks, setTasks] = useState([]);
const [editingTask, setEditingTask] = useState(null);
const [editText, setEditText] = useState('');

useEffect(() => {
    fetchTasks();
}, []);

const fetchTasks = async () => {
    try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10');
    setTasks(response.data);
    } catch (error) {
    console.error('Error fetching tasks:', error);
    }
};

const deleteTask = async (id) => {
    try {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
    console.error('Error deleting task:', error);
    }
};

const updateTask = async (id) => {
    try {
    const response = await axios.patch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        title: editText
    });
    setTasks(tasks.map(task => 
        task.id === id ? { ...task, title: editText } : task
    ));
    setEditingTask(null);
    } catch (error) {
    console.error('Error updating task:', error);
    }
};

const toggleComplete = async (id, completed) => {
    try {
    await axios.patch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        completed: !completed
    });
    setTasks(tasks.map(task =>
        task.id === id ? { ...task, completed: !completed } : task
    ));
    } catch (error) {
    console.error('Error toggling task:', error);
    }
};

return (
    <div className="continer">
    <h2 >My Tasks</h2>
    <div className="tasks">
        {tasks.map(task => (
        <div key={task.id} className="flex">
            {editingTask === task.id ? (
            <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="edit"
            />
            ) : (
            <div className="t1">
                <button
                onClick={() => toggleComplete(task.id, task.completed)}
                className={` ${task.completed ? 'green' : 'gray'}`}
                >
                {task.completed ? <CheckCircle /> : <XCircle />}
                </button>
                <span className={task.completed ? 'line-through' : ''}>
                {task.title}
                </span>
            </div>
            )}
            <div className="flex space">
            {editingTask === task.id ? (
                <>
                <button
                    onClick={() => updateTask(task.id)}
                    className="green"
                >
                    <CheckCircle />
                </button>
                <button
                    onClick={() => setEditingTask(null)}
                    className="red"
                >
                    <XCircle />
                </button>
                </>
            ) : (
                <>
                <button
                    onClick={() => {
                    setEditingTask(task.id);
                    setEditText(task.title);
                    }}
                    className="blue"
                >
                    <Edit/>
                </button>
                <button
                    onClick={() => deleteTask(task.id)}
                    className="red"
                >
                    <Trash2 />
                </button>
                </>
            )}
            </div>
        </div>
        ))}
    </div>
    </div>
);
}

export default TaskList;