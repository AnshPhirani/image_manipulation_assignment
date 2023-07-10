# Image Manipulation API

This Node.js API allows you to manipulate third-party images by resizing, cropping, applying filters, rotating, and more. It utilizes the Sharp.js library for image processing tasks.

## Features

- Resize images to a specified width and height.
- Crop images to a specified size.
- Apply grayscale filter to convert images to black and white.
- Adjust brightness and saturation of images.
- Rotate images by a given angle.
- Add a watermark image to the manipulated image.
- Convert the image format to JPEG, PNG, or other supported formats.

## Prerequisites

- Node.js installed on your machine.
- Internet connectivity to fetch third-party images.

## Setup

1. Clone the repository or download the codebase.
2. Navigate to the project directory.
3. Install the dependencies by running the following command:
`npm install`


## Usage

1. Start the server by running the following command:
`npm start`
The server will start running on http://localhost:80.

2. Make API requests to manipulate images by providing the necessary query parameters. Here's an example URL for resizing and cropping an image:
`GET http://localhost:80/manipulate?url=<image_url>&width=500&height=500&crop=true`
Replace `<image_url>` with the URL of the image you want to manipulate. Adjust the query parameters as per your requirements.

3. The manipulated image will be returned as the response.

## Deployed API

If you don't want to set up the app locally, you can use the hosted API at the following URL:

`GET https://image-manipulation-assignment.vercel.app/manipulate?url=<image_url>&width=500&height=500&crop=true`

## Configuration

The following query parameters are supported:

- `url`: The URL of the third-party image to be manipulated (required).
- `width`: The desired width of the manipulated image.
- `height`: The desired height of the manipulated image.
- `crop`: A boolean parameter indicating whether the image should be cropped or resized to fit the specified dimensions.
- `bw`: A boolean parameter indicating whether the output should be black and white.
- `filter`: The brightness, saturation, and hue adjustment values. The values should be provided as three comma-separated numbers in the format `brightness,saturation,hue`. For example, `filter=12,2,2`.
- `rotation`: Rotate the image by the specified angle in degrees.
- `watermark`: The URL of the watermark image to be added.
- `format`: The desired format of the manipulated image (e.g., `jpg`, `png`, `webp`). If not provided, defaults to `jpeg`.

## Testing

The codebase includes test cases to ensure the functionality of the API. To run the tests, use the following command:
`npm test`

The tests use the Mocha testing framework and Chai assertion library.

