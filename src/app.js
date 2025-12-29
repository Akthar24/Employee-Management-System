require("dotenv").config();   // ✅ REQUIRED

const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET, // now it exists
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true
    }
  })
);

app.use("/api", require("./routes/auth.routes"));

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Server is running successfully 🚀"
  });
});


module.exports = app;
