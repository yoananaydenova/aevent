import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import {
  useNotificationContext,
  types,
} from "../../contexts/NotificationContext";

import * as joinService from "../../services/joinService";

import Button from "react-bootstrap/Button";

const initialJoinItem = {
  _ownerId: "",
  eventId: "",
  _createdOn: "",
  _id: "",
};

const JoinEvent = ({ eventId }) => {
  const { user, isAuthenticated } = useAuthContext();
  const { addNotification } = useNotificationContext();
  const [join, setJoin] = useState(initialJoinItem);
  const history = useHistory();

  useEffect(() => {
    joinService.getJoinedEventById(user._id, eventId).then((response) => {
      if (response.length > 0) {
        setJoin(response[0]);
      }
    });
  }, [eventId, user._id]);

  const joinHandler = (e) => {
    e.preventDefault();
    //if have id - delete
    if (!isAuthenticated) {
      history.push("/login");
    } else {
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
    }
  };

  return (
    <>
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
    </>
  );
};
export default JoinEvent;
