import express, { response } from "express";
import { scheduledAppointment } from "../model/scheduledAppointments.js";
const router = express.Router();

router.post("/schedulingAppointment", async (request, response) => {
  try {
    if (
      !request.body.serviceName ||
      !request.body.serviceDescription ||
      !request.body.servicePrice ||
      !request.body.date ||
      !request.body.time ||
      !request.body.serviceImage ||
      !request.body.customerID ||
      !request.body.branchID ||
      !request.body.referenceNo
    ) {
      console.log("Please supply all the data needed");
    } else {
      const newAppointment = {
        serviceName: request.body.serviceName,
        serviceDescription: request.body.serviceDescription,
        servicePrice: request.body.servicePrice,
        serviceTime: request.body.time,
        serviceDate: request.body.date,
        serviceImage: request.body.serviceImage,
        serviceReferenceNo: request.body.referenceNo,
        providerID: request.body.branchID,
        customerID: request.body.customerID,
      };

      const addNewAppointment = await scheduledAppointment.create(
        newAppointment
      );

      response.status(201).send(addNewAppointment);
    }
  } catch (error) {
    console.log(error);
  }
});

export default router;
