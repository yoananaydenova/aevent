import * as request from "./requester";

const baseUrl = "http://softuni-custom-server.herokuapp.com/data";

export const getAll = () => request.get(`${baseUrl}/events`);

export const getAllByOwner = async (ownerId) => {
  let response = await fetch(
    `${baseUrl}/events?where=_ownerId%3D%22${ownerId}%22`
  );
  let result = [];
  if (response.ok) {
    let events = await response.json();
    result = Object.values(events);
  }
  return result;
};

export const getOne = (eventId) => {
  return fetch(`${baseUrl}/events/${eventId}`).then((res) => res.json());
};

export const createEvent = async (eventData, token) => {
  let response = await fetch(`${baseUrl}/events`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-Authorization": token,
    },
    body: JSON.stringify(eventData),
  });

  let result = await response.json();

  return result;
};

export const deleteEvent = (eventId, token) => {
  return fetch(`${baseUrl}/events/${eventId}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      "X-Authorization": token,
    },
  }).then((res) => res.json());
};

export const editEvent = (eventId, eventData) => {
  return request.put(`${baseUrl}/events/${eventId}`, eventData);
};



// todo pagination and sorting
export const getEventsByCategory = async (categoryId) => {
  let response = await fetch(
    `${baseUrl}/events?where=category%3D%22${categoryId}%22`
  );

  let result = [];
  if (response.ok) {
    let events = await response.json();
    result = Object.values(events);
  }

  return result;
};

export const getEventsByCategoryAndOwner = async (categoryId, ownerId) => {
  let response = await fetch(
    `${baseUrl}/events?where=_ownerId%3D%22${ownerId}%22&&where=category%3D%22${categoryId}%22`
  );

  let result = [];
  if (response.ok) {
    let events = await response.json();
    result = Object.values(events);
  }

  return result;
};

export const getMostRecentEvents = async (size) => {
  let response = await fetch(
    `${baseUrl}/events?sortBy=startDateTime&pageSize=${size}`
  );
 
  let result = [];
  if (response.ok) {
    let events = await response.json();
    result = Object.values(events);
  }

  return result;
};
