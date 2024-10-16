import React, { useState, useEffect } from 'react';
import Form from '../Form/Form';
import List from '../List/List';
import './ToDoList.css'
const apiUrl = 'http://localhost:8080/todos';

function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [currentTodoId, setCurrentTodoId] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);


  const fetchTodoById = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/${id}`);
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Error fetching todo by ID:', err);
    }
  };

  const fetchTodos = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  };

  const addTask = async (title, description) => {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, completed: false }),
      });
      const data = await response.json();
      setTodos([...todos, data]);
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  const editTodo = async (id) => {
    setCurrentTodoId(id);
    const todo = await fetchTodoById(id); 
    setEditValue(todo.title);
    setEditDescription(todo.description);
    setIsEditing(true);
    setIsCompleted(todo.completed);
    setEditIndex(todos.findIndex(todo => todo.id === id));
  };

  const updateTodo = async (id) => {
    try {
      await fetch(`${apiUrl}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editValue, description: editDescription, completed: isCompleted }),
      });
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === id ? { ...todo, title: editValue, description: editDescription, completed: isCompleted } : todo
        )
      );
      setIsEditing(false);
      setEditIndex(null);
      setEditValue('');
      setEditDescription('');
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const uncompletedCount = todos.length - completedCount;

  return (
    <div className='container'>
      <h1>My To-Do List</h1>
      <Form
        addTask={addTask}
        isEditing={isEditing}
        editValue={editValue}
        editDescription={editDescription}
        setEditValue={setEditValue}
        setEditDescription={setEditDescription}
        updateTodo={() => updateTodo(currentTodoId)}
        isCompleted={isCompleted}
        setIsCompleted={setIsCompleted}
      />
      <div className="task-counts">
        <p className='completed'>Completed Tasks: {completedCount}</p>
        <p className='uncompleted'>Uncompleted Tasks: {uncompletedCount}</p>
      </div>
      <List todos={todos} deleteTodo={deleteTodo} editTodo={editTodo} />
    </div>
  );
}

export default ToDoList;
