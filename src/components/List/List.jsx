import React from 'react';
import './List.css';  
import Item from '../Item/Item';  
import PropTypes from 'prop-types';
export default function List({ todos, deleteTodo, editTodo }) {
  return (
    <div className='my-list'>
      {todos.length === 0 ? (
        <p>No todos available.</p>
      ) : (
        todos.map(todo => (
          <Item
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
List.propTypes = {
  todos: PropTypes.array.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
};
