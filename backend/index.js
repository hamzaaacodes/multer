const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mediaRoutes = require("./routes/media");
const path = require('path')

const app = express();

// Middleware
app.use(cors());


// Routes
app.use("/api/v1/media", mediaRoutes);
app.use('/public', express.static(path.join(__dirname, 'public')))

// Configs
const PORT = 4000;
const MONGO_URI = "mongodb://127.0.0.1:27017/upload";

// Connect db
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to mongodb!");
});
mongoose.connection.on("error", (err) => {
  console.log("Error while connecting mongodb!", err);
});

// App running
app.listen(PORT, () => {
  console.log(`Running at PORT ${PORT}`);
});
