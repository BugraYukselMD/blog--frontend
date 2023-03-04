// Imports
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");

//Creating express instance
const app = express();

// port configuration
const port = process.env.PORT || 3000;

// MongoDB connection string
const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://bugrayukselmd:GitS1995*@blog.cgercxu.mongodb.net/?retryWrites=true&w=majority";

// Makes the public folder as static
app.use(express.static(path.join(__dirname, "backend-files/public")));
app.use(express.static(path.join(__dirname, "dist/blog--fullstack")));

// CORS configuration
app.use(
  cors({
    exposedHeaders: [
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Methods",
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Credentials",
      "Content-Length",
      "Content-Type",
      "Authorization",
      "RefreshToken",
      "Token",
    ],
  })
);

// Multer Configuration
const maxSize = 100 * 1024 * 1024;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
  limits: { fieldSize: maxSize },
}).single("image");
app.use(upload);

// Adding helpful stuffs
app.use(
  bodyParser.urlencoded({
    limit: 1024 * 1024 * 200,
    parameterLimit: 100000,
    extended: true,
  })
);
app.use(
  bodyParser.json({
    limit: 1024 * 1024 * 10,
    type: "application/json",
  })
);

// Adding middlewares
const token = require("./backend-files/middlewares/token");

// Adding Routers
const publicRouter = require("./backend-files/routers/public");
const adminRouter = require("./backend-files/routers/admin");
const accountRouter = require("./backend-files/routers/account");
const errorController = require("./backend-files/controllers/error");

//Adding Routers
app.use("/api/v1", publicRouter);
app.use("/api/v1", accountRouter);
app.use("/api/v1/admin", adminRouter);
app.use(errorController.get404Page);
app.use(errorController.get500Page);

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB!");
    console.log(`Listening on port ${port}`);
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
