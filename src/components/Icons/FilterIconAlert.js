import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { HiOutlineFilter } from "react-icons/hi";
import axios from "axios";
import propTypes from "prop-types";

function FilterIconAlert(props) {
  const { setToDoList } = props;

  const [show, setShow] = useState(false);
  const [selectValue, setSelectValue] = useState("low");

  const handleClose = () => {
    setSelectValue("low");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleSelectChange = (e) => setSelectValue(e.target.value);

  const handleSubmit = () => {
    axios
      .get("http://localhost:3002/filterBy?filter=" + selectValue)
      .then((res) => {
        const filterList = res.data;
        setToDoList(filterList);
        setSelectValue("low");
      })
      .catch((err) => {
        console.log(err);
        alert(JSON.stringify(err));
      });
    handleClose();
  };

  return (
    <>
      <div>
        <button
          title={"select filter"}
          onClick={() => handleShow()}
          className="btn btn-lg btn-success"
        >
          <HiOutlineFilter />
        </button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>select order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="select">
            <Form.Label>Select order</Form.Label>
            <Form.Control
              as="select"
              onChange={handleSelectChange}
              value={selectValue}
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

FilterIconAlert.propTypes = {
  setToDoList: propTypes.func,
};

export default FilterIconAlert;
