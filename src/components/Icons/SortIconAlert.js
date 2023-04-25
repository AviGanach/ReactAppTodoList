import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { HiOutlineSortDescending } from "react-icons/hi";
import axios from "axios";
import propTypes from "prop-types";

function SortIconAlert(props) {
  const { setToDoList } = props;

  const [show, setShow] = useState(false);
  const [selectValue, setSelectValue] = useState("default");

  const handleClose = () => {
    setSelectValue("default");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleSelectChange = (e) => setSelectValue(e.target.value);

  const handleSubmit = () => {
    const orderBy = selectValue;
    if (orderBy === "asc" || orderBy === "desc") {
      axios
        .get("http://localhost:3002/orderBy?order=" + orderBy)
        .then((res) => {
          const orderList = res.data;
          setToDoList(orderList);
          setSelectValue("default");
        })
        .catch((err) => {
          console.log(err);
          alert(JSON.stringify(err));
        });
      handleClose();
    } else {
      window.location.reload();
    }
  };

  return (
    <>
      <div>
        <button
          title={"select order"}
          onClick={() => handleShow()}
          className="btn btn-lg btn-success"
        >
          <HiOutlineSortDescending />
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
              <option value="default">Default</option>
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
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

SortIconAlert.propTypes = {
  setToDoList: propTypes.func,
};

export default SortIconAlert;
