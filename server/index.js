const mongoose = require("mongoose");
const users = require("./routes/users");
const home = require("./routes/home");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost/project", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB.."))
  .catch(err => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/", home);
app.use("/api/users", users);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
