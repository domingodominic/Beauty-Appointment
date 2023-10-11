import express from "express";
import { customer } from "../model/customerModel.js";
const router = express.Router();

router.post("/", async (request, response) => {
  try {
    if (
      !request.body.firstname ||
      !request.body.lastname ||
      !request.body.age ||
      !request.body.username ||
      !request.body.email ||
      !request.body.confirmPassword ||
      !request.body.password ||
      !request.body.birthdate ||
      !request.body.municipality ||
      !request.body.contactNumber
    ) {
      return response
        .status(400)
        .send({ message: "please send all required fields" });
    }

    const newCustomer = {
      firstname: request.body.firstname,
      lastname: request.body.lastname,
      age: request.body.age,
      username: request.body.username,
      password: request.body.password,
      confirmPassword: request.body.confirmPassword,
      email: request.body.email,
      birthdate: request.body.birthdate,
      municipality: request.body.municipality,
      contactNumber: request.body.contactNumber,
    };

    const book = await customer.create(newCustomer);

    return response.status(201).send(book);
  } catch (error) {
    console.log("error: ", error);

    response.status(500).send({ message: error.message });
  }
});

router.get("/", async (request, response) => {
  try {
    const customers = await customer.find({});

    return response
      .status(200)
      .json({ count: customers.length, data: customers });
  } catch (error) {
    console.error(error);

    response.status(500).send({ message: "Internal server error" });
  }
});

//get specific customer

router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const customers = await customer.findById(id);

    return response.status(200).json(customers);
  } catch (error) {
    console.error(error);

    response.status(500).send({ message: "Internal server error" });
  }
});

router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.firstname ||
      !request.body.lastname ||
      !request.body.middlename ||
      !request.body.services ||
      !request.body.age ||
      !request.body.selected_service
    ) {
      {
        return response
          .status(400)
          .send({ message: "please send all required fields" });
      }
    }

    const { id } = request.params;
    const result = await customer.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Customer not found" });
    }

    return response
      .status(200)
      .send({ message: "customer updated successfully!" });
  } catch (error) {
    response.status(500).send({ message: error.message });

    console.log("error ", error);
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await customer.findByIdAndDelete(id);

    return response.status(200).send({ message: "Successfully deleted!" });
  } catch (error) {
    console.error(error); // I-log ang error para sa debugging
    return response.status(500).send("Internal Server Error");
  }
});

export default router;
