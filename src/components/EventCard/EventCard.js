import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  const dateFormatter = (dateStr) => {
    const date = new Date(dateStr);
    return date
      .toDateString()
      .concat(" - ")
      .concat(
        date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
      );
  };

  return (
    <Card className="event-card">
      <Card.Img
        className="event-card-img"
        variant="top"
        src={event.eventImage ? event.eventImage : "/images/img-event.jpg"}
      />

      <Card.Body>
        <Card.Subtitle data-testid="event-card-date" className="event-card-date">
          {dateFormatter(event.startDateTime)}
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
        </div>
      </Card.Body>
    </Card>
  );
};

export default EventCard;
