const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const path = require("path");
//swagger
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
/* ******************************************************************************
 * Routes
 */
const indexRouter = require("./routes/indexRoutes");
const adminIndexRouter = require("./adminRoutes/adminIndexRoutes");
/*******************************************************************************/

//Init express App
const app = express();

app.set("trust proxy", true);

// 1) MIDDLEWARES
let corsOptions = {
  origin: ["http://localhost:3000"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
//Set Cors
app.use(cors());

//Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "1000kb" }));
// app.use(express.urlencoded({ extended: true, limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));

app.use(cookieParser());

//File upload
app.use(fileUpload());

//serve static files
app.use(express.static(path.join("public")));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//swagger json config definition
const swaggerDefinition = {
  info: {
    title: "Entrance Exam",
    version: "0.0.1",
    description: "Endpoints to test Entrance Exam routes <br>",
  },
  host: process.env.WEB_HOST,
  basePath: "/",
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      scheme: "bearer",
      in: "header",
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./api_docs/*.js"],
};
const swaggerSpec = swaggerJsDoc(options);

// 3) ROUTES
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// const options2 = {
//   swaggerDefinition,
//   apis: ["./admin_api_docs/*.js"],
// };
// const swaggerSpec2 = swaggerJsDoc(options2);
// app.use("/admin-api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec2));

app.use("/", indexRouter);

app.use("/api/v1/admin", adminIndexRouter);

//404
app.all("*", (req, res, next) => {
  next(new AppError("The page you are looking, doesn't exist", 404));
});

// Global Error Handler
app.use(globalErrorHandler);

module.exports = app;
