import * as request from "./requester";

const baseUrl = "http://softuni-custom-server.herokuapp.com/data";

export const addFavorite = async (eventId, token) => {
  let response = await fetch(`${baseUrl}/favorites`, {
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

export const deleteFavorite = async (favoriteId) => {
  return request.deleteRequest(`${baseUrl}/favorites/${favoriteId}`);
};

export const getFavoriteById = async (userId, eventId) => {
  return request.get(
    `${baseUrl}/favorites?where=_ownerId%3D%22${userId}%22&&where=eventId%3D%22${eventId}%22`
  );
};

export const getFavoriteListByUserId = async (userId) => {
  return request.get(
    `${baseUrl}/favorites?where=_ownerId%3D%22${userId}%22&select=eventId`
  );
};
