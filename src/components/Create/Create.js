import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { Form, Button, Row, Col } from "react-bootstrap";
import * as categoryService from "../../services/categoryService";
import * as eventService from "../../services/eventService";
import * as cloudinaryService from "../../services/cloudinaryService";

const Create = () => {
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  let history = useHistory();

  useEffect(() => {
    let categories = categoryService
      .getCategories()
      .sort((a, b) => b.id - a.id);
    setCategories(categories);
  }, []);

  const onEventCreate = async (e) => {
    e.preventDefault();
    let target = e.target;
    let formData = {};

    for (let i = 0; i < target.length; i++) {
      if (target.elements[i].id !== "") {
        if (
          target.elements[i].id === "eventImage" ||
          target.elements[i].id === "backgroundImage"
        ) {
          let imageFile = target.elements[i].files[0];

          let result = await cloudinaryService.uploadImage(imageFile);

          formData[target.elements[i].id] = result.secure_url;
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

    formData.favorite = 0;

    eventService.createEvent(formData, user.accessToken).then((response) => {
      history.push("/");
    });
  };

  return (
    <Form className="create-form" onSubmit={onEventCreate} method="POST">
      <Form.Text className="create-form-title">Create Event</Form.Text>

      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter event title" />
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

      <Form.Group className="mb-3" controlId="eventImage">
        <Form.Label>Add event image</Form.Label>
        <Form.Control type="file" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="backgroundImage">
        <Form.Label>Add event image background</Form.Label>
        <Form.Control type="file" />
      </Form.Group>

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
            controlId="startDate"
          >
            <Form.Label column sm={3}>
              Start date
            </Form.Label>
            <Col>
              <Form.Control type="date" />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="create-form-dates-group-date-element"
            controlId="startTime"
          >
            <Form.Label column sm={3}>
              Start time
            </Form.Label>
            <Col>
              <Form.Control type="time" />
            </Col>
          </Form.Group>
        </Col>

        <Col className="create-form-dates-group-date">
          <Form.Group
            as={Row}
            className="create-form-dates-group-date-element"
            controlId="endDate"
          >
            <Form.Label column sm={3}>
              End date
            </Form.Label>
            <Col>
              <Form.Control type="date" />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="create-form-dates-group-date-element"
            controlId="endTime"
          >
            <Form.Label column sm={3}>
              End time
            </Form.Label>
            <Col>
              <Form.Control type="time" />
            </Col>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="create-form-detail" controlId="detailInfo">
        <Form.Label>Deatail information about the event</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter detail information about the event"
        />
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
