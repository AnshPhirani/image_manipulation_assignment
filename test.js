const { expect } = require("chai");
const axios = require("axios");
const app = require("./index");

describe("Image Manipulation API", () => {
  it("should manipulate image with resize and crop", async () => {
    const response = await axios.get(
      "http://localhost:80/manipulate?url=https://3.img-dpreview.com/files/p/TS600x450~sample_galleries/7197342033/3612060517.jpg&width=500&height=500&crop=true"
    );
    expect(response.status).to.equal(200);
    expect(response.headers["content-type"]).to.include("image/jpeg");
  });

  it("should manipulate image with grayscale and rotation", async () => {
    const response = await axios.get(
      "http://localhost:80/manipulate?url=https://3.img-dpreview.com/files/p/TS600x450~sample_galleries/7197342033/3612060517.jpg&bw=true&rotation=90"
    );
    expect(response.status).to.equal(200);
    expect(response.headers["content-type"]).to.include("image/jpeg");
  });

  it("should manipulate image with watermark and format conversion", async () => {
    const response = await axios.get(
      "http://localhost:80/manipulate?url=https://3.img-dpreview.com/files/p/TS600x450~sample_galleries/7197342033/3612060517.jpg&watermark=https://assets.codeforces.com/images/hsu.png&format=png"
    );
    expect(response.status).to.equal(200);
    expect(response.headers["content-type"]).to.include("image/png");
  });
});
