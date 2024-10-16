import React from "react";
import './Form.css'
function Form({ addTask, isEditing, editValue, editDescription, setEditValue, setEditDescription, updateTodo, isCompleted, setIsCompleted }) {
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
}

export default Form;
