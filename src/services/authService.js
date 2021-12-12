const baseUrl = "http://softuni-custom-server.herokuapp.com";

export const login = async (email, password) => {
  let res = await fetch(`${baseUrl}/users/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  let jsonResult = await res.json();

  if (res.ok) {
    return jsonResult;
  } else {
    throw jsonResult.message;
  }
};

export const register = (data) => {
  return fetch(`${baseUrl}/users/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export const logout = (token) => {
  return fetch(`{baseUrl}/users/logout`, {
    method: "GET",
    headers: {
      "X-Authorization": token,
    },
  });
};

export const isAuthenticated = () => {
  return Boolean(getUser());
};

export const getUser = () => {
  let username = localStorage.getItem("username");

  return username;
};

export const changeUserInfo = async (user) => {
  let response = await fetch(`${baseUrl}/users/${user._id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      "X-Authorization": user.accessToken,
    },
    body: JSON.stringify(user),
  });

  let result = await response.json();
  if (response.ok) {
    return result;
  } else {
    throw result.message;
  }
  return result;
};
