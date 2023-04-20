import React, { useEffect, useState } from "react";
import axios from "axios";
import Add_task from "../Add_task";
import Edit_task from "../Edit_task";
import Task from "../Task";

const To_do_list = () => {
  const [toDoList, setToDoList] = useState(null);
  /* for Add_task component */
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [beforeSelectingLevel, setBeforeSelectingLevel] = useState(true);
  /* for Edit_task component */
  const [showEdit, setShowEdit] = useState(false);

  /* get List from the server end updating State*/
  useEffect(() => {
    axios
      .get("http://localhost:3002/getAll")
      .then((res) => {
        const list = res.data;
        setToDoList(list);
        if (list == null) return;
      })
      .catch((err) => {
        alert(JSON.stringify(err));
      });
  }, []);

  const onDeleteTask = (id) => {
    axios
      .delete("http://localhost:3002/deleteTask?id=" + id)
      .then(() => {
        const newList = toDoList.filter((item) => item.id !== id);
        setToDoList(newList);
        alert("Task deleted successfully");
      })
      .catch((err) => {
        alert(JSON.stringify(err));
      });
  };

  const onAddTask = (newTask) => {
    axios
      .post("http://localhost:3002/addTask", newTask)
      .then(() => {
        console.log(newTask);
        const newList = [...toDoList];
        newList.push(newTask);
        setToDoList(newList);
        setNewTaskDescription("");
        setBeforeSelectingLevel(true);
      })
      .catch((err) => {
        alert(JSON.stringify(err));
      });
  };
  return (
    <div>
      {showEdit && <Edit_task setShowEdit={setShowEdit} />}
      <br />
      <Add_task
        newTaskDescription={newTaskDescription}
        setNewTaskDescription={setNewTaskDescription}
        beforeSelectingLevel={beforeSelectingLevel}
        setBeforeSelectingLevel={setBeforeSelectingLevel}
        onAddTask={onAddTask}
      />

      {toDoList
        ? toDoList.map((task, index) => {
            return (
              <Task
                key={index}
                index={index}
                id={task.id}
                taskDescription={task.taskdescription}
                priorityLevel={task.prioritylevel}
                isDone={task.isdone}
                onDeleteTask={onDeleteTask}
                showEdit={showEdit}
                setShowEdit={setShowEdit}
              />
            );
          })
        : "No tasks to display"}
    </div>
  );
};

export default To_do_list;
