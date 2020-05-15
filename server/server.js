const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const colors = require("colors");
const bodyParser = require("body-parser");
const passport = require("passport");
const expressFileUpload = require("express-fileupload");
const path = require("path");
const { handleError } = require("./middlewares/errorHandler");
let cors = require("cors");

const app = express();

// use cors
app.use(cors());

// Load config
dotenv.config({ path: "./config/config.env" });

// Load Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

// Load static folders
app.use(express.static(path.join(__dirname, "public")));

// Use Express file upload middleware
app.use(expressFileUpload({}));

// Passport Config
require("./utils/passport")(passport);

// Load database connection
mongoose
    .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then((connect) => {
        connect && console.log(`Database connection...`.underline.green);
    })
    .catch((err) => {
        err && console.log(err);
    });

// Load  routes
const authRoute = require("./routes/auth");
const articlesRoute = require("./routes/articles");
const userRoute = require("./routes/users");
const categoryRoute = require("./routes/categories");

// Routing
app.use("/api/auth", authRoute);
app.use("/api/articles", articlesRoute);
app.use("/api/users", userRoute);
app.use("/api/categories", categoryRoute);

//handle errors
app.use(handleError);

// Run server
app.listen(
    process.env.PORT || 5000,
    console.log(`Server running on ${process.env.PORT} Port...`.underline.blue)
);
