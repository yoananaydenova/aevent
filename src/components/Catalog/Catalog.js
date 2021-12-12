import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import EventCard from "../EventCard";
import * as categoryService from "../../services/categoryService";
import * as eventService from "../../services/eventService";

const Catalog = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const history = useHistory();

  useEffect(() => {
    let categories = categoryService
      .getCategories()
      .sort((a, b) => b.id - a.id);

    setCategories(categories);

    eventService
      .getAll()
      .then((data) => {
        setEvents(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onAllCategoryClick = (e) => {
    eventService
      .getAll()
      .then((data) => {
        history.push("/catalog/all");
        setEvents(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onCategoryClick = (e) => {
    const categoryName = e.target.innerText;
    const categoryText = categoryName.toLowerCase().split(" & ").join("-and-");
    history.push(`/catalog/${categoryText}`);

    let categoryId = e.target.value;
    eventService.getEventsByCategory(categoryId).then((result) => {
      setEvents(result);
    });
  };

  return (
    <>
      <section className="catalog">
        <section className="catalog-header">
          <h3 className="catalog-title">Choose your event</h3>
          <section className="catalog-header-buttons">
            <Button
              variant="outline-secondary"
              value="0"
              onClick={onAllCategoryClick}
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
        </section>

        <section className="catalog-content">
          {events.length === 0 ? (
            <h5 className="catalog-content-text">
              Sorry there is no events in this category...
            </h5>
          ) : (
            events.map((event) => <EventCard key={event._id} event={event} />)
          )}
        </section>
      </section>
    </>
  );
};

export default Catalog;
