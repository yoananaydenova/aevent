export const request = async (method, url, data) => {
  let promiseResult = null;

  if (method === "GET") {
    promiseResult = fetch(url);
  } else {
    promiseResult = fetch(url, {
      method,
      headers: {
        "content-type": "application/json",
        "X-Authorization": getToken(),
      },
      body: JSON.stringify(data),
    });
  }
  return promiseResult.then(responseHandler);
};

async function responseHandler(res) {
  let jsonData = await res.json();

  if (res.ok) {
    return Object.values(jsonData);
  } else {
     throw jsonData; 
  }
}

function getToken() {
  try {
    let userItem = localStorage.getItem("user");
    if (!userItem) {
      // throw { message: "You must be authenticated!" };
      throw new Error({ message: "You must be authenticated!" });
    }

    let user = JSON.parse(userItem);
    return user.accessToken;
  } catch (err) {
    console.log(err);
  }
}

export const get = request.bind(null, "GET");
export const put = request.bind(null, "PUT");
export const post = request.bind(null, "POST");
export const deleteRequest = request.bind(null, "DELETE");
