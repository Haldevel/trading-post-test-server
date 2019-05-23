require("dotenv").config()
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const db = require("./models");
const errorHandler = require("./controllers/error");
const itemRoutes = require("./routes/items");
const authRoutes = require("./routes/auth"); 
const {
    loginRequired,
    ensureCorrectUser
} = require("./middleware/auth");

const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

/* const userRoutes = require("./routes/users.js");
const categoriesRoutes = require("./routes/categories");
const wishlistRoutes = require("./routes/wishlist"); */



app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

app.use('/api/items/:userId', loginRequired, ensureCorrectUser, itemRoutes);
//app.use('/api/items/:userId', loginRequired , ensureCorrectUser, itemRoutes);

app.use(function (req, res, next) {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use(errorHandler);

app.listen(PORT, function () {
    console.log(`API server listening on port ${PORT}`);
});