import { providermodel } from "../model/providermodel.js";
import { userAccount } from "../model/userAccountModel.js";
import express from "express";
import bcrypt from "bcrypt";
const route = express.Router();

//route - provider
route.post("/signup/", async (request, response) => {
  try {
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

route.post("/addService/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      service_name,
      service_description,
      service_price,
      service_date,
      availability_time,
      service_image,
    } = req.body;

    // Create a new service object
    const newService = {
      service_name,
      service_description,
      service_price,
      service_image,
      timeAndDate: {
        service_date,
        availability_time,
      },
    };

    // Find the provider by ID and push the new service to the services array
    const provider = await providermodel.findByIdAndUpdate(
      id,
      {
        $push: { services: newService },
      },
      { new: true }
    );

    res.status(201).json(provider); // Return the updated provider
    console.log(provider);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error inserting service." });
  }
});

//customer for update their profile picture
route.put("/updateProfilePicture/:id", async (req, res) => {
  const { id } = req.params;
  const { profilePicture } = req.body;

  try {
    const Foundcustomer = await userAccount.findByIdAndUpdate(id, {
      profilePicture,
    });

    if (!Foundcustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json({ message: "Profile picture updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
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
