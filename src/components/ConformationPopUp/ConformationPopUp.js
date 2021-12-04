import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const ConformationPopUp = ({message, show, handleClose, deleteHandler})=>{

return(
    <>
     
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm your choice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
           Cancel
          </Button>
          <Button variant="primary" onClick={deleteHandler}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
) 
}

export default ConformationPopUp;