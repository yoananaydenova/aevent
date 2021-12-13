import { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import {
  useNotificationContext,
  types,
} from "../../contexts/NotificationContext";

import * as favoritesService from "../../services/favoritesService";
import * as eventService from "../../services/eventService";
import * as joinService from "../../services/joinService";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import ConformDialog from "../Common/ConformDialog";

const initialFavoriteItem = {
  _ownerId: "",
  eventId: "",
  _createdOn: "",
  _id: "",
};

const initialJoinItem = {
  _ownerId: "",
  eventId: "",
  _createdOn: "",
  _id: "",
};

const Details = () => {
  const history = useHistory();
  const [event, setEvent] = useState({});
  const [show, setShow] = useState(false);
  const { eventId } = useParams();
  const { user } = useAuthContext();
  const { addNotification } = useNotificationContext();

  const [favorite, setFavorite] = useState(initialFavoriteItem);

  const [join, setJoin] = useState(initialJoinItem);

  useEffect(() => {
    eventService.getOne(eventId).then((result) => {
      setEvent(result);
    });

    async function getFavorite() {
      let favorite = await favoritesService.getFavoriteById(user._id, eventId);
      if (favorite.length > 0) {
        setFavorite(favorite[0]);
      }
    }
    getFavorite();

    joinService.getJoinedEventById(user._id, eventId).then((response) => {
      if (response.length > 0) {
        setJoin(response[0]);
      }
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

  const favoriteHandler = (e) => {
    e.preventDefault();
    //if have id - delete
    if (favorite._id) {
      favoritesService.deleteFavorite(favorite._id).then((res) => {
        setFavorite(initialFavoriteItem);
        addNotification(
          "Successfuly delete the event from the favorite collection",
          types.success
        );
      });
    } else {
      favoritesService
        .addFavorite({ eventId }, user.accessToken)
        .then((res) => {
          setFavorite(res);
          addNotification(
            "Successfuly added the event to the favorite collection",
            types.success
          );
        });
    }
  };

  const joinHandler = (e) => {
    e.preventDefault();
    //if have id - delete
    if (join._id) {
      joinService.deleteJoinEvent(join._id).then((res) => {
        setJoin(initialJoinItem);
        addNotification(
          "Successfuly delete the event from the joined events",
          types.success
        );
      });
    } else {
      joinService.addJoinEvent({ eventId }, user.accessToken).then((res) => {
        setJoin(res);
        addNotification(
          "Successfuly added the event to the joined events",
          types.success
        );
      });
    }
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

  const userButtons = (
    <section className="event-details-favorite">
      <Button
        className="event-details-button-favorite"
        variant="primary"
        onClick={favoriteHandler}
      >
        {favorite._id ? (
          <>
            <FontAwesomeIcon icon={faHeart} />
            <p className="event-details-favorite-text">Remove from favorite</p>
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={farHeart} />
            <p className="event-details-favorite-text">Add to favorite</p>
          </>
        )}
      </Button>
    </section>
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
            <section className="event-details-buttons">
              {join._id ? (
                <>
                  <p>You have joined. Can't attent?</p>
                  <Button
                    className="event-details-button-miss"
                    variant="secondary"
                    onClick={joinHandler}
                  >
                    I will miss the event
                  </Button>
                </>
              ) : (
                <>
                  <p>You haven't joined yet. We are waiting for you...</p>
                  <Button
                    className="event-details-button-join"
                    variant="success"
                    onClick={joinHandler}
                  >
                    Join
                  </Button>
                </>
              )}
            </section>
          </section>
        </section>

        <Card.Body>
          <section className="event-details-body-buttons">
            {user._id &&
              (user._id === event._ownerId ? ownerButtons : userButtons)}
          </section>
          <Card.Title>Details about the event</Card.Title>
          <Card.Text className="event-details-text">
            {event.detailInfo}
          </Card.Text>
          <Card.Text>START: {dateFormatter(event.startDateTime)}</Card.Text>
          <Card.Text>FINISH: {dateFormatter(event.endDateTime)}</Card.Text>
          <Card.Text>
            ADDRESS: {event.country}, {event.city}, {event.address}
          </Card.Text>
          <Card.Text>ORGANIZER: {event.eventOrganizer}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};
export default Details;
