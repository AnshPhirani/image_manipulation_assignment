const express = require("express");

const manipulateImage = require("../controllers/manipulateController");

const router = express.Router();

router.get("/", manipulateImage);

module.exports = router;
