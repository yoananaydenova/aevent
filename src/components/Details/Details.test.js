import { BrowserRouter } from "react-router-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as eventService from "../../services/eventService";
jest.mock("../../services/eventService");

import Details from "./Details";

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

describe("Details Component", () => {
  it("Should change Join button when click", async () => {
    eventService.getOne.mockResolvedValue(eventData);
    // let user = { _id: "1234" };
    et user = user.mockResolvedValue({ _id: "1234" });
    render(
      <BrowserRouter>
        <Details />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Join"));
    await waitFor(() => {
      screen.getByText("I will miss the event");
    });
  });
});
