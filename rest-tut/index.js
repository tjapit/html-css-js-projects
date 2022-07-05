const express = require("express");
const app = express();
const mongoose = require("mongoose");
// removed body-parser, express can already read json()
// const bodyParser = require("body-parser");
// to allow requests from other domains
const cors = require("cors");
// environment variable
const dotenv = require("dotenv");
dotenv.config()

// Import Routes
const postsRoute = require("./routes/posts");
const authRoute = require("./routes/auth");

// Middlewares: something that runs in-between routes
app.use(cors());
app.use(express.json()); // parses json body everytime a route is hit

// Route Middlewares
app.use("/api/posts", postsRoute);
app.use("/api/user", authRoute);

// ROUTES
app.get("/", (req, res) => {
    res.send("We are on home");
});

// app.get("/posts", (req, res) => {
//     res.send("We are on posts");
// });

// Connect To DB with .env
mongoose.connect(process.env.DB_CONN, () => {
    console.log("Connected to DB...");
});

// How do we start listening to the server
app.listen(3000, () => console.log("Server up and running..."));
