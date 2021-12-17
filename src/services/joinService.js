import * as request from "./requester";

const baseUrl = "http://softuni-custom-server.herokuapp.com/data";

export const addJoinEvent = async (eventId, token) => {
  let response = await fetch(`${baseUrl}/joined`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-Authorization": token,
    },
    body: JSON.stringify(eventId),
  });

  let result = await response.json();

  return result;
};

export const deleteJoinEvent = async (joinId) => {
  return request.deleteRequest(`${baseUrl}/joined/${joinId}`);
};

export const getJoinedEventById = async (userId, eventId) => {
  return request.get(
    `${baseUrl}/joined?where=_ownerId%3D%22${userId}%22&&where=eventId%3D%22${eventId}%22`
  );
};

export const getJoinedListByUserId = async (userId) => {
  let response = await fetch(
    `${baseUrl}/joined?where=_ownerId%3D%22${userId}%22&select=eventId`
  );

  let result = [];

  if (response.ok) {
    let events = await response.json();
    result = Object.values(events);
  }
  return result;
};
