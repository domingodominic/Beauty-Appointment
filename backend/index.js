import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import customerRoute from "./routes/customerRoute.js";
import changePassword from "./routes/changepasswordRoute.js";
import appointment from "./routes/appointmentRoute.js";
import userAccountRouter from "./routes/userAccountRouter.js";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import nodemailer from "nodemailer";

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
app.use("/appointments", appointment);
app.use("/auth", changePassword);

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

app.post("/sendEmail", async (req, res) => {
  const toEmail = req.body.toEmail;
  const subject = req.body.subject;
  const message = req.body.message;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "burat3307@gmail.com",
        pass: "xxtr quza kltv domi",
      },
    });

    const mailOptions = {
      from: "burat3307@gmail.com",
      to: toEmail,
      subject: subject,
      text: message,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    res.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email" });
  }
});
