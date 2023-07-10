const axios = require("axios");
const sharp = require("sharp");

// Resize image
function resizeImage(image, width, height) {
  return image.resize(width || null, height || null);
}

// Croping the image
async function cropImage(image, width, height) {
  // Get the image metadata
  const metadata = await image.metadata();

  if (metadata.width < width || metadata.height < height) {
    return image;
  }

  // Calculate the crop coordinates
  const left = Math.floor((metadata.width - width) / 2);
  const top = Math.floor((metadata.height - height) / 2);

  // Crop the image using the calculated coordinates
  return image.extract({ left, top, width, height });
}

// Applying grayscale filter
function applyGrayscale(image) {
  return image.grayscale();
}

// Applying custom filter
function applyCustomFilter(image, filter) {
  const [brightness, saturation, hue] = filter.split(",").map(parseFloat);

  if (
    brightness == undefined ||
    saturation == undefined ||
    hue == undefined ||
    brightness < 0 ||
    saturation < 0
  )
    return;

  return image.modulate({ brightness, saturation, hue: Math.floor(hue) });
}

// Rotating the image
function rotateImage(image, degrees) {
  return image.rotate(degrees);
}

// Adding watermark to bottom right corner
function addWatermark(image, watermarkBuffer) {
  return image.composite([
    {
      input: watermarkBuffer.data,
      gravity: "southeast",
    },
  ]);
}

// Convert image format
function convertFormat(image, format) {
  return image.toFormat(format);
}

const manipulateImage = async (req, res) => {
  const { url, width, height, crop, bw, format, filter, rotation, watermark } =
    req.query;

  if (!url) {
    res.status(400).send("Please provide a valid url");
    return;
  }

  let inputImageBuffer;
  try {
    inputImageBuffer = await axios(url, {
      responseType: "arraybuffer",
    });
  } catch (error) {
    res
      .status(500)
      .send("An error occurred during image download or the url is invalid");
    return;
  }

  // Performing image manipulation using Sharp.js
  try {
    let image = sharp(inputImageBuffer.data);

    if (width && height && crop === "true") {
      image = await cropImage(image, +width, +height);
    } else if (width || height) {
      image = resizeImage(image, +width, +height);
    }

    if (bw === "true") {
      image = applyGrayscale(image);
    }

    if (filter) {
      image = applyCustomFilter(image, filter);
    }

    if (rotation) {
      image = rotateImage(image, +rotation);
    }

    if (watermark) {
      try {
        const watermarkBuffer = await axios(watermark, {
          responseType: "arraybuffer",
        });
        const watermarkImage = sharp(watermarkBuffer.data);
        const watermarkMetadata = await watermarkImage.metadata();
        const imageMetadata = await image.metadata();

        if (
          watermarkMetadata.width > imageMetadata.width ||
          watermarkMetadata.height > imageMetadata.height
        ) {
          res
            .status(400)
            .send("Watermark image is larger than the original image");
          return;
        }
        image = addWatermark(image, watermarkBuffer);
      } catch (error) {
        res
          .status(500)
          .send(
            "An error occurred while adding the watermark or the watermark url is invalid"
          );
        return;
      }
    }

    if (format) {
      image = convertFormat(image, format);
    }

    // image.pipe(res);

    image = await image.toBuffer();
    res
      .status(200)
      .setHeader("Cache-Control", "no-cache, no-store, must-revalidate")
      .setHeader("Content-Type", `image/${format || "jpeg"}`)
      .setHeader("Content-Length", image.length)
      .send(image);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred during image manipulation.");
  }
};

module.exports = manipulateImage;
