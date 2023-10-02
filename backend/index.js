import express, { request, response } from "express"; // Import express without the relative path
import { PORT, mongoDBURL } from "./config.js";
import customerRoute from "./routes/customerRoute.js";
import userAccountRouter from "./routes/userAccountRouter.js";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const corsOptions = {
  origin: "http://localhost:3000", // Allow requests from this origin
  methods: "PUT,POST,DELETE,GET", // Allow these HTTP methods
  allowedHeaders: "Content-Type", // Allow the specified header
};

app.use(cors(corsOptions));
app.get("/", (req, res) => {
  // Use `res` instead of `response`
  console.log(req);
  return res.status(234).send("Welcome to MERN Stack"); // Use `res` instead of `response`
});

app.use(express.json());

app.use("/customer", customerRoute);
app.use("/user", userAccountRouter);

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
