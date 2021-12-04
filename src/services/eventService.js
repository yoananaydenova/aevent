const baseUrl = "http://softuni-custom-server.herokuapp.com/data";

const initialData = [
  {
    title: "Beaver Creek",
    category: 2,
    imageUrl: "https://i.ytimg.com/vi/jL083wMBMlM/maxresdefault.jpg",
    backgroundImageUrl:
      "https://miro.medium.com/max/1838/1*ZLZKArv2doX2W3UmwNleTA.jpeg",
    country: "Bulgaria",
    city: "Peshtera",
    address: "15 Stafan Stambolov str.",
    startDate: "2020-01-24",
    startTime: "10:30",
    endDate: "2020-09-30",
    endTime: "10:30",
    eventOrganizer: "Middle no",
    creator: "Pesho",
    favorite: 4,
    id: 1,
  },
  {
    title: "Daylight",
    category: 4,
    detailInfo:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat, nisi! Repellat deleniti error consequuntur eligendi accusamus, porro ex quibusdam explicabo quas, asperiores laborum eius quae repudiandae sed quasi ducimus rerum eaque mollitia, itaque fuga? Non, ab animi a quibusdam necessitatibus, dolor magnam, minima vel ratione odio totam iusto! Praesentium iusto distinctio impedit aperiam perferendis delectus inventore atque sequi labore facere, sit quis vitae esse quas consequuntur similique quae rerum obcaecati est perspiciatis rem dolore in, illo expedita. Deserunt molestias voluptatem repellat ut temporibus placeat cupiditate excepturi. Perferendis, deserunt nihil? Magni magnam dolore nulla quis obcaecati corporis autem voluptatum illo enim!",
    imageUrl:
      "https://chillhop.com/wp-content/uploads/2020/07/ef95e219a44869318b7806e9f0f794a1f9c451e4-1024x1024.jpg",
    backgroundImageUrl:
      "https://previews.123rf.com/images/hamik/hamik1604/hamik160400040/56441182-basic-halftone-dots-effect-in-black-and-white-color-halftone-effect-dot-halftone-black-white-halfton.jpg",
    country: "Bulgaria",
    city: "Sofia",
    address: "15 Susame str.",
    startDate: "2020-09-24",
    startTime: "8:30",
    endDate: "2020-09-24",
    endTime: "10:30",
    eventOrganizer: "abcv",
    creator: "Aiguille",
    favorite: 8,
    id: 2,
  },
  {
    title: "Keep Going",
    category: 2,
    detailInfo:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat, nisi! Repellat deleniti error consequuntur eligendi accusamus, porro ex quibusdam explicabo quas, asperiores laborum eius quae repudiandae sed quasi ducimus rerum eaque mollitia, itaque fuga? Non, ab animi a quibusdam necessitatibus, dolor magnam, minima vel ratione odio totam iusto! Praesentium iusto distinctio impedit aperiam perferendis delectus inventore atque sequi labore facere, sit quis vitae esse quas consequuntur similique quae rerum obcaecati est perspiciatis rem dolore in, illo expedita. Deserunt molestias voluptatem repellat ut temporibus placeat cupiditate excepturi. Perferendis, deserunt nihil? Magni magnam dolore nulla quis obcaecati corporis autem voluptatum illo enim!",
    imageUrl:
      "https://chillhop.com/wp-content/uploads/2020/07/ff35dede32321a8aa0953809812941bcf8a6bd35-1024x1024.jpg",
    backgroundImageUrl:
      "https://previews.123rf.com/images/wesley1357/wesley13571603/wesley1357160300005/53233540-simple-polka-dot-pattern-of-white-and-blue-dots-background.jpg",
    country: "Bulgaria",
    city: "Varna",
    address: "20 Tsar Ivan Shishman str.",
    startDate: "2021-07-21",
    startTime: "12:30",
    endDate: "2022-09-04",
    endTime: "8:30",
    eventOrganizer: "Abcd",
    creator: "Swørn",
    favorite: 3,
    id: 3,
  },
  {
    title: "Nightfall",
    category: 1,
    detailInfo:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat, nisi! Repellat deleniti error consequuntur eligendi accusamus, porro ex quibusdam explicabo quas, asperiores laborum eius quae repudiandae sed quasi ducimus rerum eaque mollitia, itaque fuga? Non, ab animi a quibusdam necessitatibus, dolor magnam, minima vel ratione odio totam iusto! Praesentium iusto distinctio impedit aperiam perferendis delectus inventore atque sequi labore facere, sit quis vitae esse quas consequuntur similique quae rerum obcaecati est perspiciatis rem dolore in, illo expedita. Deserunt molestias voluptatem repellat ut temporibus placeat cupiditate excepturi. Perferendis, deserunt nihil? Magni magnam dolore nulla quis obcaecati corporis autem voluptatum illo enim!",
    imageUrl:
      "https://chillhop.com/wp-content/uploads/2020/07/ef95e219a44869318b7806e9f0f794a1f9c451e4-1024x1024.jpg",
    backgroundImageUrl:
      "https://miro.medium.com/max/1838/1*ZLZKArv2doX2W3UmwNleTA.jpeg",
    country: "Bulgaria",
    city: "Pleven",
    address: "15 Shipka str.",
    startDate: "2021-07-21",
    startTime: "12:30",
    endDate: "2022-09-24",
    endTime: "10:30",
    eventOrganizer: "Abc",
    creator: "Aiguille",
    favorite: 14,
    id: 4,
  },
  {
    title: "Reflection",
    category: 1,
    detailInfo:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat, nisi! Repellat deleniti error consequuntur eligendi accusamus, porro ex quibusdam explicabo quas, asperiores laborum eius quae repudiandae sed quasi ducimus rerum eaque mollitia, itaque fuga? Non, ab animi a quibusdam necessitatibus, dolor magnam, minima vel ratione odio totam iusto! Praesentium iusto distinctio impedit aperiam perferendis delectus inventore atque sequi labore facere, sit quis vitae esse quas consequuntur similique quae rerum obcaecati est perspiciatis rem dolore in, illo expedita. Deserunt molestias voluptatem repellat ut temporibus placeat cupiditate excepturi. Perferendis, deserunt nihil? Magni magnam dolore nulla quis obcaecati corporis autem voluptatum illo enim!",
    imageUrl:
      "https://chillhop.com/wp-content/uploads/2020/07/ff35dede32321a8aa0953809812941bcf8a6bd35-1024x1024.jpg",
    backgroundImageUrl:
      "https://previews.123rf.com/images/hamik/hamik1604/hamik160400040/56441182-basic-halftone-dots-effect-in-black-and-white-color-halftone-effect-dot-halftone-black-white-halfton.jpg",
    country: "Bulgaria",
    city: "Plovdiv",
    address: "15 Vasil Levski str.",
    startDate: "2021-11-04",
    startTime: "10:30",
    endDate: "2021-11-12",
    endTime: "10:30",
    eventOrganizer: "XXX",
    creator: "Swørn",
    favorite: 15,
    id: 5,
  },
  {
    title: "Under the City Stars tratatatatattataatat",
    category: 2,
    detailInfo:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat, nisi! Repellat deleniti error consequuntur eligendi accusamus, porro ex quibusdam explicabo quas, asperiores laborum eius quae repudiandae sed quasi ducimus rerum eaque mollitia, itaque fuga? Non, ab animi a quibusdam necessitatibus, dolor magnam, minima vel ratione odio totam iusto! Praesentium iusto distinctio impedit aperiam perferendis delectus inventore atque sequi labore facere, sit quis vitae esse quas consequuntur similique quae rerum obcaecati est perspiciatis rem dolore in, illo expedita. Deserunt molestias voluptatem repellat ut temporibus placeat cupiditate excepturi. Perferendis, deserunt nihil? Magni magnam dolore nulla quis obcaecati corporis autem voluptatum illo enim!",
    imageUrl:
      "https://chillhop.com/wp-content/uploads/2020/09/0255e8b8c74c90d4a27c594b3452b2daafae608d-1024x1024.jpg",
    backgroundImageUrl:
      "https://previews.123rf.com/images/hamik/hamik1604/hamik160400040/56441182-basic-halftone-dots-effect-in-black-and-white-color-halftone-effect-dot-halftone-black-white-halfton.jpg",
    country: "Bulgaria",
    city: "Sofia",
    address: "15 Hristo Botev str.",
    startDate: "2022-01-01",
    startTime: "8:30",
    endDate: "2022-02-24",
    endTime: "10:30",
    eventOrganizer: "Aso, Middle School, Aviino",
    creator: "Aso",
    favorite: 10,
    id: 6,
  },
  //ADD MORE HERE
];

export const getAll = async () => {
  let response = await fetch(`${baseUrl}/events`);

  let events = await response.json();

  let result = Object.values(events);

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

//todo
export const getMostFavoriteEvents = (size) => {
  let events = initialData
    .sort((a, b) =>
      a.favorite > b.favorite ? -1 : b.favorite > a.favorite ? 1 : 0
    )
    .slice(0, size);

  return events;
};

// todo pagination and sorting
export const getEventsByCategory = async (categoryId) => {
  let response = await fetch(
    `${baseUrl}/events?where=category%3D%22${categoryId}%22`
  );

  let events = await response.json();

  let result = Object.values(events);

  return result;
};
