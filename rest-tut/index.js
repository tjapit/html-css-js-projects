const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

// Import Routes
const postsRoute = require("./routes/posts");
const authRoute = require("./routes/auth");

// Middlewares: something that runs in-between routes
app.use(cors());
app.use(bodyParser.json()); // parses json body everytime a route is hit
app.use("/api/posts", postsRoute);
app.use("/api/user", authRoute);

// ROUTES
app.get("/", (req, res) => {
    res.send("We are on home");
});

// app.get("/posts", (req, res) => {
//     res.send("We are on posts");
// });

// Connect To DB
mongoose.connect(process.env.DB_CONN, () => {
    console.log("connected to DB!");
});

// How do we start listening to the server
app.listen(3000, () => console.log("Server up and running!"));
