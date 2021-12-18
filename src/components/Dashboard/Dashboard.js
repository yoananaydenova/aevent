import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Button from "react-bootstrap/Button";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

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
  const [categoryName, setCategoryName] = useState("all");
  const [categories, setCategories] = useState([]);

  const [activeCategory, setActiveCategory] = useState(0);

  const { user } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    const categories = categoryService
      .getCategories()
      .sort((a, b) => b.id - a.id);

    setCategories(categories);

    eventService.getAllByOwner(user._id).then((data) => {
      setEvents(data);
    });
  }, [user._id]);

  useEffect(() => {
    if (Number(activeCategory) === 0) {
      onAllCategory();
    } else {
      onCurrentCategory();
    }
    history.push(`/dashboard/${navKey}/${categoryName}`);
  }, [categoryName, navKey]);

  const onCategoryClick = (e) => {
    e.preventDefault();

    const categoryInnerText = e.target.innerText;
    const categoryName = categoryInnerText
      .toLowerCase()
      .split(" & ")
      .join("-and-");

    setCategoryName(categoryName);

    let categoryId = e.target.value;
    setActiveCategory(categoryId);
  };

  const onNavSelectHandle = (navValue) => {
    setNavKey(navValue);
  };

  const onCurrentCategory = () => {
    switch (navKey) {
      case "my-events":
        eventService
          .getEventsByCategoryAndOwner(activeCategory, user._id)
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
              .getAllEventsByIdAndCategory(resultJoinedStr, activeCategory)
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
              .getAllEventsByIdAndCategory(resultFavoriteStr, activeCategory)
              .then((result) => {
                setEvents(result);
              });
          } else {
            setEvents([]);
          }
        });

        break;
      default:
    }
  };

  const onAllCategory = () => {
    switch (navKey) {
      case "my-events":
        eventService.getAllByOwner(user._id).then((data) => {
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
              .getAllEventsById(resultFavoriteStr)
              .then((result) => {
                setEvents(result);
              })
              .catch((e) => {
                console.log(e);
              });
          } else {
            setEvents([]);
          }
        });

        break;
      default:
    }
  };

  return (
    <>
      <section className="dashboard-head">
        <h3 className="dashboard-title">Dashboard</h3>
        <h3>{subtitleDashboard[navKey]}</h3>
        <Tabs
          id="controlled-tab-example"
          activeKey={navKey}
          onSelect={(k) => {
            onNavSelectHandle(k);
          }}
          className="mb-3"
        >
          <Tab eventKey="my-events" title="My Events"></Tab>
          <Tab eventKey="joined" title="Joined"></Tab>
          <Tab eventKey="favorites" title="Favorites"></Tab>
        </Tabs>
      </section>
      <section className="dashboard">
        <section className="dashboard-category-buttons">
          <Button
            variant="outline-secondary"
            key="0"
            value="0"
            active={Number(activeCategory) === 0}
            onClick={onCategoryClick}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              variant="outline-secondary"
              key={category.id}
              value={category.id}
              active={Number(activeCategory) === category.id}
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
