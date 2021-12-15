import { useState, useEffect, createRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";

const initialFileState = { alt: "holder", src: "/images/img-holder.jpg" };

// ref to form control
const ImagePreview = ({ title, controlId, srcDb , deleteImage}) => {
  const [{ alt, src }, setPreview] = useState(initialFileState);
  useEffect(() => {
    if (srcDb) {
      setPreview({ alt: "image", src: srcDb });
    }
  }, [srcDb]);
  
  let imageInput = createRef();
  // onChange form contol

  const fileHandler = (event) => {
    const { files } = event.target;

    setPreview(
      files.length
        ? {
            src: URL.createObjectURL(files[0]),
            alt: files[0].name,
          }
        : initialFileState
    );
  };

  //reset button
  const resetImageHandler = (e) => {
    imageInput.current.value = null;
    deleteImage();
    setPreview(initialFileState);
  };

  return (
    <Form.Group className="mb-3 preview" controlId={controlId}>
      <Form.Label>{title}</Form.Label>
      <section className="preview-group">
        <Image className="preview-group-img" src={src} alt={alt} />
        <Button variant="danger" onClick={resetImageHandler}>
          Delete image
        </Button>
      </section>

      <Form.Control
        type="file"
        accept="image/*"
        ref={imageInput}
        onChange={fileHandler}
      />
    </Form.Group>
  );
};

export default ImagePreview;
