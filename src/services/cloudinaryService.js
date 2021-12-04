export const uploadImage = (imageFile) => {
  const data = new FormData();

  data.append("file", imageFile);
  data.append("upload_preset", "d9zkxqan");
  data.append("cloud_name", "yoanan");
  data.append("folder", "aevent");

  return fetch("https://api.cloudinary.com/v1_1/yoanan/image/upload", {
    method: "post",
    body: data,
  })
    .then((resp) => resp.json())
    .catch((err) => console.log(err));
};
