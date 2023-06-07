import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import propTypes from "prop-types";

function PlusIconAlert(props) {

  const { setToDoList } = props;

  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("low");

  const handleClose = () => {
    setInputValue("");
    setSelectValue("low");
    setShow(false);}
  const handleShow = () => setShow(true);
  const handleInputChange = (e) => setInputValue(e.target.value);
  const handleSelectChange = (e) => setSelectValue(e.target.value);
  const handleSubmit = () => {
    const newTask = { taskdescription: inputValue, prioritylevel: selectValue };
    if(newTask.taskdescription === "") return;
    axios
      .post("http://localhost:3002/addTask", newTask)
      .then(() => {
        setToDoList((prevToDoList) => [...prevToDoList, newTask]);
        setInputValue("");
        setSelectValue("low");
      })
      .catch((err) => {
        alert(JSON.stringify(err));
      });
    handleClose();
  };

  return (
    <>
      <div>
        <button title={"Add Task"} onClick={() => handleShow()} className="btn btn-lg btn-success">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="input">
            <Form.Control
              type="text"
              placeholder="Enter new task"
              value={inputValue}
              onChange={handleInputChange}
              required 
            />
          </Form.Group>
          <Form.Group controlId="select">
            <Form.Label>Select Label</Form.Label>
            <Form.Control
              as="select"
              value={selectValue}
              onChange={handleSelectChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

PlusIconAlert.propTypes = {
  setToDoList: propTypes.func,
};

export default PlusIconAlert;