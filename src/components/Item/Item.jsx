import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'; 
import './Item.css';  

const Item = memo(function Item({ todo, deleteTodo, editTodo }) {
    console.log('render')
  return (
    <div className="container-item">
      <div className="title-description">
        <h3>{todo.title}</h3>
        <p>{todo.description}</p>
      </div>
      <div className="btn-status-container">
        <div className="btn">
          <FontAwesomeIcon 
            icon={faTrash} 
            onClick={() => deleteTodo(todo.id)} 
            style={{ cursor: 'pointer', marginRight: '10px', color:'red' }} 
          />
          <FontAwesomeIcon 
            icon={faEdit} 
            onClick={() => editTodo(todo.id)} 
            style={{ cursor: 'pointer', color:'gray' }} 
          />
        </div>
        <p className="status-text">{todo.completed ? "Completed" : "Uncompleted"}</p>
      </div>
    </div>
  );
});

export default Item;

