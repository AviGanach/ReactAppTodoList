import React, { useEffect, useState } from "react";
import axios from "axios";
import Icons from "../Icons";
import Task from "../Task";

const Body = () => {

  const [toDoList, setToDoList] = useState([]);
  
  /* get List from the server end updating State*/
  useEffect(() => {
    axios
    .get("http://localhost:3002/getAll")
    .then((res) => {
        const list = res.data;
        if (list.length) {
          setToDoList(list);
          return
          };
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
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

  return (
    <div className="container d-flex flex-column gap-4">
    {/* 3 icons above the list  */}
      <div className="d-flex justify-content-center gap-3">
      <Icons toDoList={toDoList} setToDoList={setToDoList}/>
      </div>

    {/* Displays a list only when it is not empty */}
      {toDoList.length
        ? toDoList.map((task, index) => {
            return (
              <Task
                key={task.id}
                index={index}
                id={task.id}
                taskDescription={task.taskdescription}
                priorityLevel={task.prioritylevel}
                isDone={task.isdone}
                setToDoList={setToDoList}
                toDoList={toDoList}
                onDeleteTask={onDeleteTask}
              />
            );
          })
    // Prints a message when there are no tasks
        :<p style={{textAlign:"center"}}>No tasks to display</p>}
    </div>
  );
};

export default Body;
