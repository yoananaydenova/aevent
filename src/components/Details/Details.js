import { useState, useEffect, useContext } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import * as eventService from "../../services/eventService";

import { Card, Button, Image } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import ConformationPopUp from "../ConformationPopUp/ConformationPopUp";

const options = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};

const Details = () => {
  const history = useHistory();
  const [event, setEvent] = useState({});
  const { eventId } = useParams();
  const { user } = useContext(AuthContext);
  const [show, setShow] = useState(false);

  useEffect(() => {
    eventService.getOne(eventId).then((result) => {
      setEvent(result);
    });
  }, [eventId]);

  const deleteButtonHandler = (e) => {
    e.preventDefault();
    setShow(true);   
  };

  const deleteHandler =()=>{
    eventService.deleteEvent(eventId, user.accessToken).then((result) => {
      history.push("/catalog");
    });
  }

  const editHandler = () => {};

  const dateFormatterHandler = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", options);
  };

  const ownerButtons = (
    <>
      <Button as={Link} variant="secondary" to="/edit" onClick={editHandler}>
         Edit
      </Button>
      <Button variant="danger" onClick={deleteButtonHandler}>
        Delete
      </Button>
    </>
  );

  const userButtons = (
    <>
    <Button className="event-details-button-favorite" variant="primary">
      {/* <FontAwesomeIcon icon={faHeart} />  */}
      <FontAwesomeIcon icon={farHeart} />
    </Button>
    </>
  );

  const handleClose = () => setShow(false);

  return (
    <>
    <ConformationPopUp message={"Are you sure you want to delete this event?"} 
    show={show} 
    handleClose={handleClose}
    deleteHandler={deleteHandler}
    />
      <Image className="event-details-background" src={event.backgroundImage} />
      <Card className="event-details">
        <section className="event-details-header">
          <Card.Img className="event-details-img" src={event.eventImage} />
          <section className="event-details-header-text">
            <Card.Subtitle className="event-details-date">
              {dateFormatterHandler(event.startDate)} - {event.startTime}h
            </Card.Subtitle>
            <Card.Title className="event-details-title">
              {event.title}
            </Card.Title>

            <Button className="event-details-button-join" variant="success">
              Join
            </Button>
          </section>
        </section>

        <Card.Body>
          <section className="event-details-body-buttons">
            {user._id &&
              (user._id == event._ownerId ? ownerButtons : userButtons)}
          </section>
          <Card.Title>Details about the event</Card.Title>
          <Card.Text className="event-details-text">
            {event.detailInfo}
          </Card.Text>
          <Card.Text>
            Event start on: {dateFormatterHandler(event.startDate)} -{" "}
            {event.startTime}h
          </Card.Text>
          <Card.Text>
            and finish: {dateFormatterHandler(event.endDate)} - {event.endTime}h
          </Card.Text>
          <Card.Text>
            Address: {event.country}, {event.city}, {event.address}
          </Card.Text>
          <Card.Text>Organizer: {event.eventOrganizer}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};
export default Details;
