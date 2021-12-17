import { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

import * as eventService from "../../services/eventService";


import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import ConformDialog from "../Common/ConformDialog";
import FavoriteEvent from "../FavoriteEvent";
import JoinEvent from "../JoinEvent";

const Details = () => {
  const history = useHistory();
  const [event, setEvent] = useState({});
  const [show, setShow] = useState(false);
  const { eventId } = useParams();
  const { user } = useAuthContext();

  useEffect(() => {
    eventService.getOne(eventId).then((result) => {
      setEvent(result);
    });
  }, [eventId, user._id]);

  const deleteButtonHandler = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const deleteHandler = (e) => {
    e.preventDefault();

    eventService
      .deleteEvent(eventId, user.accessToken)
      .then((result) => {
        history.push("/catalog");
      })
      .finally(() => {
        setShow(false);
      });
  };

  const dateFormatter = (dateStr) => {
    const date = new Date(dateStr);
    return date
      .toDateString()
      .concat(" - ")
      .concat(
        date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
      );
  };

  const ownerButtons = (
    <>
      <Button as={Link} variant="secondary" to={`/edit/${event._id}`}>
        Edit
      </Button>
      <Button variant="danger" onClick={deleteButtonHandler}>
        Delete
      </Button>
    </>
  );

  return (
    <>
      <ConformDialog
        message={"Are you sure you want to delete this event?"}
        show={show}
        onClose={() => setShow(false)}
        onSave={deleteHandler}
      />

      <Image
        className="event-details-background"
        src={
          event.backgroundImage ? event.backgroundImage : "/images/bg-event.jpg"
        }
      />
      <Card className="event-details">
        <section className="event-details-header">
          <Card.Img
            className="event-details-img"
            src={event.eventImage ? event.eventImage : "/images/img-event.jpg"}
          />
          <section className="event-details-header-text">
            <Card.Subtitle className="event-details-date">
              {dateFormatter(event.startDateTime)}
            </Card.Subtitle>
            <Card.Title className="event-details-title">
              {event.title}
            </Card.Title>

            <JoinEvent eventId={eventId} />
          </section>
        </section>

        <Card.Body>
          <section className="event-details-body-buttons">
            {user._id && (user._id === event._ownerId ? ownerButtons : null)}
            {user._id !== event._ownerId ? (
              <FavoriteEvent eventId={eventId} />
            ) : null}
          </section>
          <Card.Title>Details about the event</Card.Title>
          <Card.Text className="event-details-text">
            {event.detailInfo}
          </Card.Text>
          <Card.Text>START: {dateFormatter(event.startDateTime)}</Card.Text>
          <Card.Text>FINISH: {dateFormatter(event.endDateTime)}</Card.Text>
          <Card.Text>
            <span>ONLINE ADDRESS:</span>
            <a href={event.onlineEventUrl} class="link-primary">
              {event.onlineEventUrl}
            </a>
          </Card.Text>
          <Card.Text> ADDRESS: {event.address} </Card.Text>
          <Card.Text>ORGANIZER: {event.eventOrganizer}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};
export default Details;
