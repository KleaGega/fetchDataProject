import React, { useState, useEffect } from 'react';
import Form from '../Form/Form';
import List from '../List/List';
import {useMemo} from 'react'
import './ToDoList.css'
import UseFetch from '../ToDo/UseFetch';
const apiUrl = 'http://localhost:8080/todos';

 export default function ToDoList() {
  const { todos,  error, setTodos } = UseFetch(apiUrl);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [currentTodoId, setCurrentTodoId] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const fetchTodoById = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/${id}`);
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Error fetching todo by ID:', err);
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
  const completedCount = useMemo(() => todos.filter(todo => todo.completed).length, [todos]);
  const uncompletedCount = useMemo(() => todos.length - completedCount, [todos, completedCount]);

  return (
    <div className='container'>
      <h1>My To Do List</h1>
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

