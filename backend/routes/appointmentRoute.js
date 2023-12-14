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

// Delete Appointment by ID Route
router.delete("/deleteAppointment/:id", async (req, res) => {
  const { id } = req.params;

  try {

    const deletedAppointment = await scheduledAppointment.findByIdAndDelete(id);

    if (!deletedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
});

export default router;
