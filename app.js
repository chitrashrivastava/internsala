const express = require("express");
require("dotenv").config({ path: './.env' });
const app = express();
const { generatedErrors } = require("./midddlewares/error");
// DB CONNECTION
require("./models/database").connectDatabase();

// Logger - Morgan
const logger = require("morgan");
app.use(logger("tiny"));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cookie parser
const session = require("express-session");
const cookieParser = require("cookie-parser");


// Session configuration
app.use(session({
    resave: true,
    saveUninitialized: true, // or false, depending on your preference
    secret: process.env.EXPRESS_SESSION_SECRET || 'your_secret_here' // you should set this secret in your .env file
}));

app.use(cookieParser()); //ye cokkies ko activate krta h (string code deta h hash form m)

// Routes
app.use("/", require("./routes/indexRouters"));

// Error handling
const errorHandler = require("./utils/errorHandler");

app.all("*", (req, res, next) => {
    next(new errorHandler(`Requested URL not found ${req.url}`, 404));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
