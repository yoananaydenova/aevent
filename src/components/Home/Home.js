import { useState, useEffect } from "react";
import { Image, Button } from "react-bootstrap";
import EventCard from "../EventCard";
import * as eventService from "../../services/eventService";

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    let result = eventService.getMostFavoriteEvents(3);
    setEvents(result);
  }, []);

  return (
    <section className="home">
      <section className="home-header">
        <Image
          className="home-header-image"
          src="https://www.eventlounge.be/wp-content/gallery/staff-party-2016/Concreat-GoldParty-BrusselsAirport-NP-128.jpg"
          fluid
        />
        <h1 className="home-header-text">Experience your new event</h1>
        <Button className="home-header-button" variant="primary">
          Join your next event
        </Button>
      </section>
      <h3 className="home-content-title">Top 3 favorite events</h3>
      <section className="home-content">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </section>
    </section>
  );
};

export default Home;
