import React, { useState } from "react";
import alertFanEdit_task from "./alertFanEdit_task";
import styles from "./style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import propTypes from "prop-types";

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

  const onCheckbox = (id, e) => {
    const checked = e.target.checked;
    setDone(checked);
    const obj = { isdone: checked, id1: id };
    axios.post("http://localhost:3002/updateByCheckbox", obj).catch((err) => {
      alert(JSON.stringify(err));
    });
  };

  
  return (
  /*Display Todos */
    <div className={`col ${styles.taskBg}`} >
      <div
        onDoubleClick={() =>
          alertFanEdit_task(
            taskDescription,
            priorityLevel,
            id,
            setToDoList,
            index
          )
        }
        className={done ? styles.done : ""}
      >
        <span className={styles.taskNumber}>{index + 1}</span>
        <span className={styles.taskText}>{taskDescription}</span>
        {!done && <span className={styles.taskPLevel}>{priorityLevel}</span>}
      </div>

    {/*Display checkbox & trash icons*/}
      <div className={styles.iconWrap}>
        <input
          onChange={(e) => onCheckbox(id, e)}
          type="checkbox"
          title="done / no done"
          defaultChecked={done ? true : false}
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

Task.propTypes = {
  index:propTypes.number,
    id: propTypes.number,
    taskDescription: propTypes.string,
    priorityLevel: propTypes.string,
    setToDoList: propTypes.func,
    isDone: propTypes.bool,
    onDeleteTask: propTypes.func, 
};

export default Task;
