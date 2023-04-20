import { faL } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
const Edit_task = (props) => {
  document.addEventListener("click", (e) => {
    console.log(e.target);
  });
  const [task, setTask] = useState("");
  const [level, setLevel] = useState("");
  const { setShowEdit } = props;
  const handleChange = (event) => {
    setLevel(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div className="row">
      <div className="col">
        <input
          className="form-control form-control-lg"
          placeholder="task"
          value={task}
          onChange={(event) => {
            setTask(event.target.value);
          }}
        />
      </div>
      <select onChange={handleChange} className="col">
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <div className="col-auto">
        <button
          onClick={() => {
            console.log(task, level);
          }}
          className="btn btn-lg btn-success mr-20"
        >
          Edit
        </button>
        <button
          onClick={() => setShowEdit(false)}
          className="btn btn-lg btn-warning"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Edit_task;
