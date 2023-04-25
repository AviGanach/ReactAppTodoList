// import React, { useState } from "react";
import alertFanEdit_task from "./alertFanEdit_task";
import "./style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Task = (props) => {
  const {
    index,
    id,
    taskDescription,
    priorityLevel,
    setToDoList,
    isDone,
    onDeleteTask,
  } = props;

  const [done, setDone] = useState(isDone);

  const onCheckbox = (id,e) => {
    console.log(e.target.checked);
    const checked = e.target.checked
    setDone(checked)
    const obj = { isdone :checked, id1: id };
    axios.post("http://localhost:3002/updateByCheckbox", obj).catch((err) => {
    alert(JSON.stringify(err));
    });
  };
  return (
    /*Display Todo */
    <div className="col taskBg" key={index}>
      <div onDoubleClick={()=>alertFanEdit_task(taskDescription,priorityLevel,id,setToDoList,index)} className={done ? "done" : ""}>
        <span className="taskNumber">{index + 1}</span>
        <span className="taskText">{taskDescription}</span>
        {!done && <span className="taskPLevel">{priorityLevel}</span>}
      </div>

      {/*Display Icons*/}
      <div className="iconWrap">
        <input
          onChange={(e) => onCheckbox(id,e)}
          type="checkbox"
          title="done / no done"
          defaultChecked={done?true:false}
        ></input>
        <span title="Delete">
          <FontAwesomeIcon
            onClick={() => onDeleteTask(id)}
            icon={faTrashCan}
          ></FontAwesomeIcon>
        </span>
      </div>
    </div>
  );
};

export default Task;
