import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import useForm from "../../hooks/useForm";

import ImagePreview from "../ImagePreview";

import * as categoryService from "../../services/categoryService";
import * as eventService from "../../services/eventService";
import * as cloudinaryService from "../../services/cloudinaryService";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

const Create = () => {
  const { user } = useAuthContext();
  const [categories, setCategories] = useState([]);
  let history = useHistory();

  useEffect(() => {
    let categories = categoryService
      .getCategories()
      .sort((a, b) => b.id - a.id);
    setCategories(categories);
  }, []);

  const onEventCreate = async (e) => {
    let target = e.target;
    let formData = {};

    for (let i = 0; i < target.length; i++) {
      if (target.elements[i].id !== "") {
        if (
          target.elements[i].id === "eventImage" ||
          target.elements[i].id === "backgroundImage"
        ) {
          if (target.elements[i].files[0]) {
            let imageFile = target.elements[i].files[0];
            let result = await cloudinaryService.uploadImage(imageFile);
            formData[target.elements[i].id] = result.secure_url;
          } else {
            formData[target.elements[i].id] = "";
          }
        } else {
          formData[target.elements[i].id] = target.elements[i].value;
        }
      }
    }

    if (formData.category === "") {
      formData.category = 1;
    }

    if (formData.eventOrganizer === "") {
      formData.eventOrganizer = user.firstName + " " + user.lastName;
    }
    console.log("formData", formData);
    eventService.createEvent(formData, user.accessToken).then((response) => {
      history.push("/");
    });
  };

  const { handleChange, errors, handleSubmit } = useForm(onEventCreate);

  return (
    <Form className="create-form" onSubmit={handleSubmit} method="POST">
      <Form.Text className="create-form-title">Create Event</Form.Text>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter event title"
          required
          onChange={handleChange}
        />

        {errors.title ? <Alert variant="danger"> {errors.title}</Alert> : null}
      </Form.Group>
      <Form.Group className="mb-3" controlId="category">
        <Form.Label>Category</Form.Label>
        <Form.Select>
          <option value="" disabled selected hidden>
            Choose category...
          </option>
          {categories.map((x) => (
            <option key={x.id} value={x.id}>
              {x.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <ImagePreview
        t
        itle="Add event image"
        controlId="eventImage"
        deleteImage={() => {}}
      />

      <ImagePreview
        title="Add background image for your event"
        controlId="backgroundImage"
        deleteImage={() => {}}
      />

      <Form.Group className="mb-3" controlId="country">
        <Form.Label>Country</Form.Label>
        <Form.Control type="text" placeholder="Enter country" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="city">
        <Form.Label>City</Form.Label>
        <Form.Control type="text" placeholder="Enter city" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="address">
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" placeholder="Enter event address" />
      </Form.Group>
      <Row className="create-form-dates-group">
        <Col className="create-form-dates-group-date">
          <Form.Group
            as={Row}
            className="create-form-dates-group-date-element"
            controlId="startDateTime"
          >
            <Form.Label column sm={10}>
              Start date time
            </Form.Label>
            <Col>
              <Form.Control
                type="datetime-local"
                min={new Date().toISOString().slice(0, 16)}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>
        </Col>

        <Col className="create-form-dates-group-date">
          <Form.Group
            as={Row}
            className="create-form-dates-group-date-element"
            controlId="endDateTime"
          >
            <Form.Label column sm={10}>
              End date time
            </Form.Label>
            <Col>
              <Form.Control
                type="datetime-local"
                min={new Date().toISOString().slice(0, 16)}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>
        </Col>

        {errors.dateTime ? (
          <Alert variant="danger"> {errors.dateTime}</Alert>
        ) : null}
      </Row>
      <Form.Group className="create-form-detail" controlId="detailInfo">
        <Form.Label>Deatail information about the event</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter detail information about the event"
          onChange={handleChange}
          required
        />
        {errors.detailInfo ? (
          <Alert variant="danger"> {errors.detailInfo}</Alert>
        ) : null}
      </Form.Group>
      <Form.Group className="mb-3" controlId="eventOrganizer">
        <Form.Label>Event organizer</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter the name of the organizing company or person"
        />
        <Form.Text className="text-muted">
          If you don't fill this field, your names will be automatically added
          as organizer.
        </Form.Text>
      </Form.Group>
      <Button className="create-form-btn" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Create;
