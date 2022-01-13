const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
// const { engine } = require("express-handlebars");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const petsRouter = require("./routes/pets");
const loginRouter = require("./routes/login");
const adminRouter = require("./routes/admin");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
// app.engine(
//   "hbs",
//   engine({
//     defaultLayout: "generalLayout",
//     extname: ".hbs",
//   })
// );
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  "/bootstrap/css",
  express.static(
    path.join(__dirname, "node_modules", "bootstrap", "dist", "css")
  )
);
app.use(
  "/bootstrap/js",
  express.static(
    path.join(__dirname, "node_modules", "bootstrap", "dist", "js")
  )
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/pets", petsRouter);
app.use("/login", loginRouter);
app.use("/admin", adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
