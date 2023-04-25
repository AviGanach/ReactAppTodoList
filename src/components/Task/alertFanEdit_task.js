import Swal from "sweetalert2";

const alertFanEdit_task = (taskDescription,priorityLevel,id,setToDoList,index) => {
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

  export default alertFanEdit_task;