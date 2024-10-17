import React from "react";
import './Form.css'
import { memo } from "react";
import PropTypes from 'prop-types';
const Form = memo (function Form({ addTask, isEditing, editValue, editDescription, setEditValue, setEditDescription, updateTodo, isCompleted, setIsCompleted }){
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateTodo(); 
    } else {
      addTask(editValue, editDescription); 
    }
    setEditValue('');
    setEditDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-text-btn">
      <div className="input-textarea">
      <input
        type="text"
        placeholder="Task Title"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        required
        className="task"
      />
      <textarea
        placeholder="Task Description"
        value={editDescription}
        onChange={(e) => setEditDescription(e.target.value)}
        required
      />
      </div>
      <button type="submit">{isEditing ? 'Update' : 'Add'} Task</button>
      </div>
      
      {isEditing && (
        <div>
        <label>
          Completed:
          <input
            type="checkbox"
            checked={isCompleted}
            className="input-check"
            onChange={(e) => setIsCompleted(e.target.checked)
          
            }
          />
        </label>
        </div>
      )} 
    </form>
  );
});
Form.propTypes = {
  addTask: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  editValue: PropTypes.string.isRequired,
  editDescription: PropTypes.string.isRequired,
  setEditValue: PropTypes.func.isRequired,
  setEditDescription: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  setIsCompleted: PropTypes.func.isRequired,
};

export default Form;
