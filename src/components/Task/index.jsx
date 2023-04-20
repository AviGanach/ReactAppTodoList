import React from "react";
import "./style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";

const Task = (props) => {
  const { index, id, taskDescription, priorityLevel, isDone, onDeleteTask , setShowEdit} =
    props;

  return (
    /*Display Todo */
    <div className="col taskBg" key={index}>
      <div className={isDone ? "done" : ""}>
        <span className="taskNumber">{index + 1}</span>
        <span className="taskText" onDoubleClick={()=>setShowEdit(true)}>{taskDescription}</span>
        {!isDone && <span className="taskPLevel">{priorityLevel}</span>}
      </div>

    {/*Display Icons*/ }
      <div className="iconWrap">
        <input onClick={()=> isDone  } type="checkbox" title="done / no done"></input>
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
