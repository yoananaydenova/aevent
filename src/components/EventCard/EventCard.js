import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

const EventCard = ({ event }) => {
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const dateFormatterHandler = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <Card className="event-card">
      <Card.Img className="event-card-img" variant="top" src={event.eventImage} />

      <Card.Body>
        <Card.Subtitle className="event-card-date">
          {dateFormatterHandler(event.startDate)} - {event.startTime}h
        </Card.Subtitle>
        <Card.Title className="event-card-title">{event.title}</Card.Title>
        <Card.Text className="event-card-text">{event.detailInfo}</Card.Text>
        <div className="event-card-buttons">
          <Button
            as={Link}
            to={`/details/${event._id}`}
            className="event-card-button"
            variant="primary"
          >
            Details
          </Button>

          <Button className="event-card-button favorite" variant="primary">
            {/* <FontAwesomeIcon icon={faHeart} /> */}
            <FontAwesomeIcon icon={farHeart} />
          </Button>
          <Button className="event-card-button" variant="primary">
            Join
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default EventCard;
