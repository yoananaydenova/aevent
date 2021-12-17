import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import EventCard from "./EventCard";

const eventData = {
  title: "First Event",
  category: "5",
  eventImage: "https://somevideo.bg/eventImage",
  backgroundImage: "https://somevideo.bg/backgroundImage",
  onlineEventUrl: "https://somevideo.bg/onlineEventUrl",
  address: "Sofia, 12 Vasil Levski Str.",
  startDateTime: "2021-12-21T06:40",
  endDateTime: "2021-12-22T14:51",
  detailInfo: "This is my first event here",
  eventOrganizer: "Petar Petrov",
  _ownerId: "15",
  _id: "114",
};

describe("EventCard Component", () => {
  test("Should display title", () => {
    render(
      <BrowserRouter>
        <EventCard event={eventData} />
      </BrowserRouter>
    );
    // expect(document.querySelector('div').textContent).toBe("First Event");
    expect(screen.getByText("First Event").textContent).toBe("First Event");
  });

  it("Should display detail info", () => {
    render(
      <BrowserRouter>
        <EventCard event={eventData} />
      </BrowserRouter>
    );

    expect(document.querySelector("p").textContent).toBe(
      "This is my first event here"
    );
  });

  it("Should display data and time correctly", () => {
    render(
      <BrowserRouter>
        <EventCard event={eventData} />
      </BrowserRouter>
    );
    expect(screen.getByTestId("event-card-date").textContent).toBe(
      "Tue Dec 21 2021 - 06:40 AM"
    );
  });

  it("Should send to detail page when click detail button", () => {
    render(
      <BrowserRouter>
        <EventCard event={eventData} />
      </BrowserRouter>
    );
    expect(screen.getByText("Details").closest("a")).toHaveAttribute(
      "href",
      "/details/114"
    );
  });

  it("Should have the image source set correctly", () => {
    render(
      <BrowserRouter>
        <EventCard event={eventData} />
      </BrowserRouter>
    );

    const eventImage = screen.getByRole("img");
    expect(eventImage).toHaveAttribute(
      "src",
      "https://somevideo.bg/eventImage"
    );
  });
});
