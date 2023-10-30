import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import customerRoute from "./routes/customerRoute.js";
import userAccountRouter from "./routes/userAccountRouter.js";
import mongoose from "mongoose";
import cors from "cors";
import cloudinary from "cloudinary";
import multer from "multer";
import path from "path";
import providerRouter from "./routes/providerRoute.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "PUT, POST, DELETE, GET",
  allowedHeaders: "Content-Type",
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/customer", customerRoute);
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
