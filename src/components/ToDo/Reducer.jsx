import React, { useReducer, useMemo } from 'react';
import Form from '../Form/Form';
import List from '../List/List';
import UseFetch from '../ToDo/UseFetch';
import './ToDoList.css';

const apiUrl = 'http://localhost:8080/todos';
const initialState = {
  todos: [],
  isEditing: false,
  editIndex: null,
  editValue: '',
  editDescription: '',
  currentTodoId: null,
  isCompleted: false,
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TODOS':
      return { ...state, todos: action.payload };
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] };
    case 'DELETE_TODO':
      return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload) };
    case 'EDIT_TODO':
      return {
        ...state,
        currentTodoId: action.payload.id,
        editValue: action.payload.title,
        editDescription: action.payload.description,
        isEditing: true,
        isCompleted: action.payload.completed,
        editIndex: state.todos.findIndex(todo => todo.id === action.payload.id),
      };
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title, description: action.payload.description, completed: action.payload.completed }
            : todo
        ),
        isEditing: false,
        editIndex: null,
        editValue: '',
        editDescription: '',
      };
    case 'SET_EDIT_VALUE':
      return { ...state, editValue: action.payload };
    case 'SET_EDIT_DESCRIPTION':
      return { ...state, editDescription: action.payload };
    case 'SET_IS_COMPLETED':
      return { ...state, isCompleted: action.payload };
    default:
      return state;
  }
};

export default function ToDoList() {
  const { todos, error, setTodos } = UseFetch(apiUrl);
  const [state, dispatch] = useReducer(todoReducer, { ...initialState, todos });

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
      dispatch({ type: 'ADD_TODO', payload: data });
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
      dispatch({ type: 'DELETE_TODO', payload: id });
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  const editTodo = async (id) => {
    const todo = await fetchTodoById(id);
    dispatch({
      type: 'EDIT_TODO',
      payload: { id: todo.id, title: todo.title, description: todo.description, completed: todo.completed },
    });
  };

  const updateTodo = async (id) => {
    try {
      await fetch(`${apiUrl}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: state.editValue,
          description: state.editDescription,
          completed: state.isCompleted,
        }),
      });
      dispatch({
        type: 'UPDATE_TODO',
        payload: { id, title: state.editValue, description: state.editDescription, completed: state.isCompleted },
      });
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };

  const completedCount = useMemo(() => state.todos.filter(todo => todo.completed).length, [state.todos]);
  const uncompletedCount = useMemo(() => state.todos.length - completedCount, [state.todos, completedCount]);

  return (
    <div className='container'>
      <h1>My To Do List</h1>
      <Form
        addTask={addTask}
        isEditing={state.isEditing}
        editValue={state.editValue}
        editDescription={state.editDescription}
        setEditValue={value => dispatch({ type: 'SET_EDIT_VALUE', payload: value })}
        setEditDescription={description => dispatch({ type: 'SET_EDIT_DESCRIPTION', payload: description })}
        updateTodo={() => updateTodo(state.currentTodoId)}
        isCompleted={state.isCompleted}
        setIsCompleted={completed => dispatch({ type: 'SET_IS_COMPLETED', payload: completed })}
      />
      <div className="task-counts">
        <p className='completed'>Completed Tasks: {completedCount}</p>
        <p className='uncompleted'>Uncompleted Tasks: {uncompletedCount}</p>
      </div>
      <List todos={state.todos} deleteTodo={deleteTodo} editTodo={editTodo} />
    </div>
  );
}
