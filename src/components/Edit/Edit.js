import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import useForm from "../../hooks/useForm";

import ImagePreview from "../ImagePreview";
import { resizeImageFile } from "../Common/ImageResizer";

import * as categoryService from "../../services/categoryService";
import * as eventService from "../../services/eventService";
import * as cloudinaryService from "../../services/cloudinaryService";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

const Edit = () => {
  const { user } = useAuthContext();
  const [categories, setCategories] = useState([]);
  const [event, setEvent] = useState({});
  const [deleteOldEventImage, setDeleteOldEventImage] = useState(false);
  const [deleteOldBgImage, setDeleteOldBgImage] = useState(false);
  const { eventId } = useParams();

  let history = useHistory();

  const { handleChange, setValues, errors, handleSubmit } =
    useForm(onEventEditHandler);

  useEffect(() => {
    let categories = categoryService
      .getCategories()
      .sort((a, b) => b.id - a.id);
    setCategories(categories);

    eventService.getOne(eventId).then((result) => {
      setEvent(result);
      setValues({
        startDateTime: result.startDateTime,
        endDateTime: result.endDateTime,
      });
    });
  }, [eventId, setValues]);

  async function onEventEditHandler(e) {
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

            const imageResized = await resizeImageFile(
              imageFile,
              target.elements[i].id
            );

            let result = await cloudinaryService.uploadImage(imageResized);
            formData[target.elements[i].id] = result.secure_url;
          } else {
            if (target.elements[i].id === "eventImage" && deleteOldEventImage) {
              formData[target.elements[i].id] = "";
            } else if (
              target.elements[i].id === "backgroundImage" &&
              deleteOldBgImage
            ) {
              formData[target.elements[i].id] = "";
            } else {
              formData[target.elements[i].id] = event.eventImage;
            }
          }
        } else {
          formData[target.elements[i].id] = target.elements[i].value.trim();
        }
      }
    }
    if (formData.category === "") {
      formData.category = 1;
    }
    if (formData.eventOrganizer === "") {
      formData.eventOrganizer = user.firstName + " " + user.lastName;
    }

    eventService
      .editEvent(eventId, formData, user.accessToken)
      .then((response) => {
        history.push(`/details/${response._id}`);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <>
      <Form className="edit-form" onSubmit={handleSubmit} method="POST">
        <Form.Text className="edit-form-title">Edit Event</Form.Text>

        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            defaultValue={event.title}
            placeholder="Enter event title"
            onChange={handleChange}
          />

          {errors.title ? (
            <Alert variant="danger"> {errors.title}</Alert>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Select>
            {categories.map((x) => (
              <option
                key={x.id}
                value={x.id}
                selected={
                  Number(x.id) === Number(event.category) ? true : false
                }
              >
                {x.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <ImagePreview
          title="Edit event image"
          controlId="eventImage"
          srcDb={event.eventImage}
          deleteImage={() => setDeleteOldEventImage(true)}
        />

        <ImagePreview
          title="Edit event image background"
          controlId="backgroundImage"
          srcDb={event.backgroundImage}
          deleteImage={() => setDeleteOldBgImage(true)}
        />

        <Form.Group className="mb-3" controlId="onlineEventUrl">
          <Form.Label>Online event</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter url for the meeting"
            defaultValue={event.onlineEventUrl}
            onChange={handleChange}
          />
          {errors.onlineEventUrl ? (
            <Alert variant="danger"> {errors.onlineEventUrl}</Alert>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter event address"
            defaultValue={event.address}
          />
        </Form.Group>

        <Row className="edit-form-dates-group">
          <Col className="edit-form-dates-group-date">
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
                  defaultValue={event.startDateTime}
                  min={new Date().toISOString().slice(0, 16)}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Form.Group>
          </Col>

          <Col className="edit-form-dates-group-date">
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
                  defaultValue={event.endDateTime}
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

        <Form.Group className="edit-form-detail" controlId="detailInfo">
          <Form.Label>Deatail information about the event</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter detail information about the event"
            defaultValue={event.detailInfo}
            onChange={handleChange}
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
            defaultValue={event.eventOrganizer}
            onChange={handleChange}
          />
          {errors.eventOrganizer ? (
            <Alert variant="danger"> {errors.eventOrganizer}</Alert>
          ) : null}
        </Form.Group>

        <Button className="edit-form-btn" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};
export default Edit;
