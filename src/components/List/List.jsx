import React from 'react';
import TodoItem from '../Item/ToDoItem'
import './List.css'
function List({ todos, deleteTodo, editTodo }) {
  return (
    <div className='my-list'>
      {todos.length === 0 ? (
        <p>No todos available.</p>
      ) : (
        todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        ))
      )}
    </div>
  );
}

export default List;
