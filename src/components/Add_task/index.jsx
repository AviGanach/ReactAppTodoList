import React, { useState } from "react";

const Add_task = (props) => {
  const {
    newTaskDescription,
    setNewTaskDescription,
    beforeSelectingLevel,
    setBeforeSelectingLevel,
    onAddTask 
  } = props;

  return (
    <div className="row">
      <div className="col">
        <input
          value={newTaskDescription}
          onChange={(e) => {
            setNewTaskDescription(e.target.value);
            console.log(e.target.value);
          }}
          className="form-control form-control-lg"
        />
      </div>
      <div className="col-auto">
        <button
          onClick={() => setBeforeSelectingLevel(false)}
          className="btn btn-lg btn-success"
        >
          Add task
        </button>
      </div>
      {!beforeSelectingLevel && (
        <div>
          <h2>Select priority level:</h2>
          <button
            // value="Low"
            onClick={()=>onAddTask({
              taskdescription: newTaskDescription,
              prioritylevel: 'low',
            })}
          >
            Low
          </button>
          <button
            // value="Medium"
            onClick={()=>onAddTask({
              taskdescription: newTaskDescription,
              prioritylevel: 'medium',
            })}
          >
            Medium
          </button>
          <button
            // value="High"
            onClick={()=>onAddTask({
              taskdescription: newTaskDescription,
              prioritylevel: 'high',
            })}
          >
            High
          </button>
        </div>
      )}
    </div>
  );
};

export default Add_task;
