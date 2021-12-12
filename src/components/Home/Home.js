import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import EventCard from "../EventCard";

import * as eventService from "../../services/eventService";


const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    eventService.getMostRecentEvents(3).then((events) => {
      setEvents(events);
    });
  }, []);

  return (
    <section className="home">
      <section className="home-header">
        <Image className="home-header-image" src="/images/bg-home.jpg" fluid />
        <h1 className="home-header-text">Experience your new event</h1>
        <Button
          as={Link}
          to="/catalog"
          className="home-header-button"
          variant="primary"
        >
          Join your next event
        </Button>
      </section>
      <h3 className="home-content-title">Don't miss the most recent events</h3>
      <section className="home-content">


      {events.length === 0 ? (
            <h5 >
              Sorry there is no events yet...
            </h5>
          ) : (
            events.map((event) => <EventCard key={event._id} event={event} />)
          )}

      </section>
    </section>
  );
};

export default Home;
