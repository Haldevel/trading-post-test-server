require("dotenv").config()
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const db = require("./models");

const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 8080;
const userRoutes = require("./routes/users.js");
const categoriesRoutes = require("./routes/categories");
const itemRoutes = require("./routes/items");
const wishlistRoutes = require("./routes/wishlist");
const authRoutes = require("./routes/auth");