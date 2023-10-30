import { providermodel } from "../model/providermodel.js";
import { userAccount } from "../model/userAccountModel.js";
import express from "express";
import bcrypt from "bcrypt";
const route = express.Router();

//route - provider
route.post("/signup/", async (request, response) => {
  try {
    console.log("firstname: " + request.body.firstname);
    console.log("lastname: " + request.body.lastname);
    console.log("email: " + request.body.email);
    console.log("password: " + request.body.password);
    console.log("birthdate: " + request.body.birthdate);
    console.log("municipality: " + request.body.municipality);
    console.log("businessName: " + request.body.businessName);
    console.log("businessEmail: " + request.body.businessEmail);
    console.log("Contact Number: " + request.body.contactNumber);
    console.log("businessDescription: " + request.body.businessDescription);
    console.log("role: " + request.body.role);

    if (
      !request.body.firstname ||
      !request.body.lastname ||
      !request.body.email ||
      !request.body.password ||
      !request.body.birthdate ||
      !request.body.municipality ||
      !request.body.businessName ||
      !request.body.businessEmail ||
      !request.body.contactNumber ||
      !request.body.businessDescription ||
      !request.body.role
    ) {
      return response.status(400).send({
        message: "Send all required fields! ",
      });
    }
    const hashedPassword = await bcrypt.hash(request.body.password, 12);

    const createdUserAcc = await userAccount.create({
      email: request.body.email,
      password: hashedPassword,
      firstname: request.body.firstname,
      lastname: request.body.lastname,
      age: request.body.age,
      birthdate: request.body.birthdate,
      municipality: request.body.municipality,
      contactNumber: request.body.contactNumber,
      profilePicture: request.body.profilePicture,
      role: request.body.role,
    });

    const provider = await userAccount.create(createdUserAcc);
    const newProvider = {
      userAccount: createdUserAcc._id,
      businessDescription: request.body.businessDescription,
      businessEmail: request.body.businessEmail,
      businessName: request.body.businessName,
    };
    const providerAcc = await providermodel.create(newProvider);
    return response.status(201).send(newProvider);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//route all get

route.get("/", async (request, response) => {
  try {
    const provider = await providermodel.find({});

    return response
      .status(200)
      .json({ count: provider.length, data: provider });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

route.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const provider = await providermodel.findById(id);

    return response
      .status(200)
      .json({ count: provider.length, data: provider });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
//Update - services
//debug

route.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.firstname ||
      !request.body.lastname ||
      !request.body.username ||
      !request.body.password ||
      !request.body.confirmPassword ||
      !request.body.municipality ||
      !request.body.businessName ||
      !request.body.businessEmail ||
      !request.body.businessContactNumber ||
      !request.body.services
    ) {
      return response.status(400).send({
        message: "Send all required feilds!",
      });
    }

    const { id } = request.params;
    const result = await providermodel.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Services not found!" });
    }

    return response
      .status(200)
      .send({ message: "Services updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//delete - provider
route.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const del = await providermodel.findByIdAndDelete(id);

    return response.status(200).send({ message: "Successful deleted" });
  } catch (error) {
    console.log(error);
  }
});
export default route;
