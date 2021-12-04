import { useState, useEffect } from "react";
import { Image, Button, Text } from "react-bootstrap";
import EventCard from "../EventCard";
import * as categoryService from "../../services/categoryService";
import * as eventService from "../../services/eventService";

const Catalog = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let categories = categoryService
      .getCategories()
      .sort((a, b) => b.id - a.id);

    setCategories(categories);

    eventService.getAll().then((data) => {
      console.log(data)
      setEvents(data);
    });

  }, []);

  const onAllCategoryClick = (e) => {
    eventService.getAll().then((data) => {
      setEvents(data);
    });
  };

  const onCategoryClick = (e) => {
    let categoryId = e.target.value;

    eventService.getEventsByCategory(categoryId).then((result) => {
      setEvents(result);
    });
  };

  return (
    <section className="catalog">
      <section className="catalog-header">
        <h3>Choose your event</h3>
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
          events.map((event) => (
             <EventCard key={event._id} event={event} />          
          ))
        )}
      </section>
    </section>
  );
};

export default Catalog;
