import { Blp, BLP_IMAGE_FORMAT } from "@wowserhq/format";
import { validateResponse } from "./http";

const drawBlp = (blp, canvas, x = 0, y = 0) => {
  const image = blp.getImage(0, BLP_IMAGE_FORMAT.IMAGE_ABGR8888);
  const imageData = new ImageData(new Uint8ClampedArray(image.data), image.width, image.height);

  canvas.width = image.width;
  canvas.height = image.height;

  const context = canvas.getContext('2d');
  context.putImageData(imageData, x, y);
};

const loadBlp = async (url) => {
  if (!url || url.length === 0) {
    throw new Error(`Missing URL`);
  }

  const response = await fetch(url);
  validateResponse(response);

  const data = await response.arrayBuffer();
  const blp = new Blp();
  blp.load(new Uint8Array(data));

  return blp;
};

export { loadBlp, drawBlp };
