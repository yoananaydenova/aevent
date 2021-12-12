import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ConformDialog = ({ message, show, onClose, onSave }) => {
  return (
    <>
      <Modal show={show} onHide={onClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm your choice</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConformDialog;
