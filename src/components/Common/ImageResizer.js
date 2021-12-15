import Resizer from "react-image-file-resizer";

const imageSizes = {
    "eventImage": {
        "maxWidth": 850,
        "maxHeight" : 500
    },
    "backgroundImage": {
        "maxWidth": 1920,
        "maxHeight" : 500
    }
} 

export const resizeImageFile = (file, type) =>

new Promise((resolve) => {
  Resizer.imageFileResizer(
    file,
    imageSizes[type].maxWidth,
    imageSizes[type].maxHeight,
    "JPEG",
    100,
    0,
    (uri) => {
      resolve(uri);
    },
    "base64"
  );
});