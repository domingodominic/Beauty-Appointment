import express, { request, response } from "express"; // Import express without the relative path
// import { PORT, mongoDBURL } from "./config.js";//PM doms
import customerRoute from "./routes/customerRoute.js";
import userAccountRouter from "./routes/userAccountRouter.js";
import mongoose from "mongoose";
import cors from "cors";
import providerRouter from "./routes/providerRoute.js";
import { PORT, mongoDBURL } from "./configs.js";//sheesh ully

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "PUT,POST,DELETE,GET",
  allowedHeaders: "Content-Type",
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  // Use `res` instead of `response`
  console.log(req);
  return res.status(234).send("Welcome to MERN Stack"); // Use `res` instead of `response`
});

app.use(express.json());

app.use("/customerist", customerRoute);
app.use("/user", userAccountRouter);
app.use("/provider", providerRouter);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected");
    app.listen(PORT, () => {
      console.log(`Server is currently listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
