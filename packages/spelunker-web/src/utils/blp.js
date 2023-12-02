import { Blp, BLP_IMAGE_FORMAT } from "@wowserhq/format";

const drawBlp = (blp, canvas, x = 0, y = 0) => {
  const image = blp.getImage(0, BLP_IMAGE_FORMAT.IMAGE_RGBA8888);
  const imageData = new ImageData(new Uint8ClampedArray(image.data), image.width, image.height);

  canvas.width = image.width;
  canvas.height = image.height;

  const context = canvas.getContext('2d');
  context.putImageData(imageData, x, y);
};

const loadBlp = async (src) => {
  const blpResponse = await fetch(src);
  if (!blpResponse.ok) {
    return null;
  }

  const blpData = await blpResponse.arrayBuffer();
  const blp = new Blp();
  blp.load(new Uint8Array(blpData));

  return blp;
};

export { loadBlp, drawBlp };
