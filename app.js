require("dotenv").config();
require("express-async-errors");

//EXPRESS.
const express = require("express");
const app = express();

//OTHER PACKAGES
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
//security packages
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");

//CLOUDINARY CONFIGURATION
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
//DATABASE.
const connectDB = require("./db/connect");

//ROUTERS
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");
const commentRouter = require("./routes/commentRouter");

//REQUIRE NOT-FOUND AND ERRORHANDLER MIDDLEWARES
const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");

//setup security
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 10 * 60 * 1000, //10 minutes
    max: 100, //100 requests per 10 minutes,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET_TOKEN));
app.use(fileUpload({ useTempFiles: true }));

//SETUP ROUTERS
app.use("/api/v3/auth", authRouter);
app.use("/api/v3/users", userRouter);
app.use("/api/v3/posts", postRouter);
app.use("/api/v3/comments", commentRouter);

app.get("/", (req, res) => {
  res.send("<h3>TRAVEL-LOG</h3>");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 9999;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is up on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
