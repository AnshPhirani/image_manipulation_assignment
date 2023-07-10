const express = require("express");
const manipulateRoutes = require("./routes/manipulateRoutes");

const app = express();

app.use("/manipulate", manipulateRoutes);

// Start the server
const port = 80;
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

module.exports = app;
