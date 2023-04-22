import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
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

  const alert = () => {
    Swal.fire({
      title: "Edit This Task !",
      html:
        '<input id="field1" class="swal2-input" value="' +
        taskDescription +
        '">' +
        '<select id="field2" class="swal2-input">' +
        '<option value="low" ' +
        (priorityLevel === "low" ? "selected" : "") +
        ">Low</option>" +
        '<option value="medium" ' +
        (priorityLevel === "medium" ? "selected" : "") +
        ">Medium</option>" +
        '<option value="high" ' +
        (priorityLevel === "high" ? "selected" : "") +
        ">High</option>" +
        "</select>",
      focusConfirm: false,
      preConfirm: () => {
        const field1 = Swal.getPopup().querySelector("#field1").value;
        const field2 = Swal.getPopup().querySelector("#field2").value;
        fetch("http://localhost:3002/editTask", {
          method: "POST",
          body: JSON.stringify({
            taskdescription: field1,
            prioritylevel: field2,
            id: id,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Server update failed");
            }
            return response.json();
          })
          .then(() => {
            Swal.fire({
              title: "Success!",
              text: "Server updated successfully",
              icon: "success",
            });
            setToDoList((prevToDoList) => {
              const newList = [...prevToDoList];
              newList[index].taskdescription = field1;
              newList[index].prioritylevel = field2;
              return newList;
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: "Failed to update server",
              icon: "error",
            });
          });
      },
    });
  };

  const onCheckbox = (id) => {
    setDone(!done)
    const obj = { isdone :!done, id1: id };
    axios.post("http://localhost:3002/updateByCheckbox", obj).catch((err) => {
      alert(JSON.stringify(err));
    });
  };
  return (
    /*Display Todo */
    <div className="col taskBg" key={index}>
      <div onDoubleClick={alert} className={done ? "done" : ""}>
        <span className="taskNumber">{index + 1}</span>
        <span className="taskText">{taskDescription}</span>
        {!isDone && <span className="taskPLevel">{priorityLevel}</span>}
      </div>

      {/*Display Icons*/}
      <div className="iconWrap">
        <input
          onClick={() => onCheckbox(id)}
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
