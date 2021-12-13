import { useState, useEffect, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import EventCard from "../EventCard";
import * as categoryService from "../../services/categoryService";
import * as eventService from "../../services/eventService";
import * as favoritesService from "../../services/favoritesService";
import * as joinService from "../../services/joinService";

const subtitleDashboard = {
  "my-events": "events created by me",
  joined: "joined events",
  favorites: "my favorite events",
};
const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [navKey, setNavKey] = useState("my-events");
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("all");

  const { user } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    let categories = categoryService
      .getCategories()
      .sort((a, b) => b.id - a.id);

    setCategories(categories);

    eventService.getAllByOwner(user._id).then((data) => {
      setEvents(data);
    });
  }, [user._id]);

  const onCategoryClick = (e) => {
    e.preventDefault();

    const categoryName = e.target.innerText;
    const categoryText = categoryName.toLowerCase().split(" & ").join("-and-");
    setCategoryName(categoryText);
    history.push(`/dashboard/${navKey}/${categoryText}`);

    let categoryId = e.target.value;

    if (Number(categoryId) === 0) {
      onAllCategoryClick();
    } else {
      switch (navKey) {
        case "my-events":
          eventService
            .getEventsByCategoryAndOwner(categoryId, user._id)
            .then((result) => {
              setEvents(result);
            });
          break;
        case "joined":
          joinService.getJoinedListByUserId(user._id).then((result) => {
            const resultArr = result.map((x) => x.eventId);
            const resultJoinedStr = '"'
              .concat(resultArr.join('", "'))
              .concat('"');
            if (resultJoinedStr) {
              eventService
                .getAllEventsByIdAndCategory(resultJoinedStr, categoryId)
                .then((result) => {
                  setEvents(result);
                });
            } else {
              setEvents([]);
            }
          });

          break;
        case "favorites":
          favoritesService.getFavoriteListByUserId(user._id).then((result) => {
            const resultArr = result.map((x) => x.eventId);
            const resultFavoriteStr = '"'
              .concat(resultArr.join('", "'))
              .concat('"');
            if (resultFavoriteStr) {
              eventService
                .getAllEventsByIdAndCategory(resultFavoriteStr, categoryId)
                .then((result) => {
                  setEvents(result);
                });
            } else {
              setEvents([]);
            }
          });

          break;
        default:
        //todo throw
      }
    }
  };

  const onAllCategoryClick = () => {
    setCategoryName("all");

    switch (navKey) {
      case "my-events":
        eventService.getAllByOwner(user._id).then((data) => {
          history.push("/dashboard/my-events/all");
          setEvents(data);
        });
        break;
      case "joined":
        joinService.getJoinedListByUserId(user._id).then((result) => {
          const resultArr = result.map((x) => x.eventId);
          const resultJoinedStr = '"'
            .concat(resultArr.join('", "'))
            .concat('"');

          if (resultJoinedStr) {
            eventService.getAllEventsById(resultJoinedStr).then((result) => {
              history.push("/dashboard/joined/all");
              setEvents(result);
            });
          } else {
            setEvents([]);
          }
        });
        break;
      case "favorites":
        favoritesService.getFavoriteListByUserId(user._id).then((result) => {
          const resultArr = result.map((x) => x.eventId);
          const resultFavoriteStr = '"'
            .concat(resultArr.join('", "'))
            .concat('"');
          if (resultFavoriteStr) {
            eventService.getAllEventsById(resultFavoriteStr).then((result) => {
              history.push("/dashboard/favorites/all");
              setEvents(result);
            });
          } else {
            setEvents([]);
          }
        });

        break;
      default:
      //todo throw
    }
  };

  const onNavSelectHandle = (navKey) => {
    setNavKey(navKey);
  };

  return (
    <>
      <section className="dashboard-head">
        <h3 className="dashboard-title">Dashboard</h3>
        <h3>{subtitleDashboard[navKey]}</h3>
        <Nav
          fill
          variant="tabs"
          defaultActiveKey="my-events"
          onSelect={onNavSelectHandle}
        >
          <Nav.Item>
            <Nav.Link
              as={Link}
              eventKey="my-events"
              to={`/dashboard/my-events/${categoryName}`}
            >
              My Events
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              as={Link}
              eventKey="joined"
              to={`/dashboard/joined/${categoryName}`}
            >
              Joined
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              eventKey="favorites"
              to={`/dashboard/favorites/${categoryName}`}
            >
              Favorites
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </section>
      <section className="dashboard">
        <section className="dashboard-category-buttons">
          <Button
            variant="outline-secondary"
            key="0"
            value="0"
            // onClick={onAllCategoryClick}
            onClick={onCategoryClick}
          >
            All events
          </Button>
          {categories.map((category) => (
            <Button
              variant="outline-secondary"
              key={category.id}
              value={category.id}
              onClick={onCategoryClick}
            >
              {category.name}
            </Button>
          ))}
        </section>

        <section className="dashboard-content">
          {events.length === 0 ? (
            <h5 className="dashboard-content-text">
              Sorry you haven't created any events yet...
            </h5>
          ) : (
            events.map((event) => <EventCard key={event._id} event={event} />)
          )}
        </section>
      </section>
    </>
  );
};

export default Dashboard;
