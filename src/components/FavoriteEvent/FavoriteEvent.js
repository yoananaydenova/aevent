import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import {
  useNotificationContext,
  types,
} from "../../contexts/NotificationContext";

import * as favoritesService from "../../services/favoritesService";

import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

const initialFavoriteItem = {
  _ownerId: "",
  eventId: "",
  _createdOn: "",
  _id: "",
};

const FavoriteEvent = ({ eventId }) => {
  const { user, isAuthenticated } = useAuthContext();
  const { addNotification } = useNotificationContext();
  const [favorite, setFavorite] = useState(initialFavoriteItem);
  const history = useHistory();

  useEffect(() => {
    favoritesService
      .getFavoriteById(user._id, eventId)
      .then((response) => {
        if (response.length > 0) {
          setFavorite(response[0]);
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, [eventId, user._id]);

  const favoriteHandler = (e) => {
    e.preventDefault();
    //if have id - delete
    if (!isAuthenticated) {
      history.push("/login");
    } else {
      if (favorite._id) {
        favoritesService
          .deleteFavorite(favorite._id)
          .then((res) => {
            setFavorite(initialFavoriteItem);
            addNotification(
              "Successfuly delete the event from the favorite collection",
              types.success
            );
          })
          .catch((e) => {
            console.log(e.message);
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
          })
          .catch((e) => {
            console.log(e.message);
          });
      }
    }
  };
  return (
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
};
export default FavoriteEvent;
