import { providermodel } from "../model/providermodel.js";
import { userAccount } from "../model/userAccountModel.js";
import express, { request, response } from "express";
import { ratingModel } from "../model/ratingsModel.js";

const route = express.Router();

route.post(
  "/customerRating/:providerID/:customerID/:appointmentID",
  async (request, response) => {
    const { providerID, customerID, appointmentID } = request.params;
    const { comments, value } = request.body;
    console.log(comments, value, providerID, customerID, appointmentID);

    const newRating = new ratingModel({
      comment: comments,
      customerID,
      providerID,
      appointmentID,
      ratingsValue: value,
    });

    await newRating.save();
  }
);

export default route;
