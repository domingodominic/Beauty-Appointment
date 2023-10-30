import express, { request, response } from "express";
import { customer } from "../model/customerModel.js";
import { userAccount } from "../model/userAccountModel.js";
import { providermodel } from "../model/providermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // Import JWT library

import route from "./providerRoute.js";

const router = express.Router();

// Route to handle user login
router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    console.log("Received request with username:", email);

    const user = await userAccount.findOne({ email });
    console.log("User found in the database:", user);
    if (!user) {
      return response
        .status(401)
        .json({ message: "Authentication failed username" });
    }

    // Compare the entered password with the stored password hash
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return response
        .status(401)
        .json({ message: "Authentication failed password" });
    }

    // If authentication succeeds, create a JWT token
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h", // Adjust token expiration as needed
    });

    // Send the token in the response
    response.status(200).json({ token: token, message: "Welcome back" });
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Internal server error" });
  }
});

//customer for update their profile picture
router.put("/updateProfilePicture/:id", async (req, res) => {
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

//get customer data with email

router.get("/get-user", async (request, response) => {
  const email = request.query.email;

  try {
    const foundUser = await userAccount.findOne({
      email: { $regex: new RegExp(email, "i") },
    });
    console.log("the found user is", foundUser);
    if (!foundUser) {
      return response.status(404).json({ message: "User not found" });
    }
    console.log(foundUser.role);

    if (foundUser.role === "customer") {
      const customerData = await customer.findOne({
        userAccount: foundUser._id,
      });
      if (!customerData) {
        return response
          .status(404)
          .json({ message: "Customer data not found" });
      }
      response.status(200).json({ foundUser, customerData });
    } else if (foundUser.role === "provider") {
      const providerData = await providermodel.findOne({
        userAccount: foundUser._id,
      });
      if (!providerData) {
        return response
          .status(404)
          .json({ message: "Provider data not found" });
      }
      response.status(200).json(providerData);
    }
  } catch (error) {
    console.error("Error:", error);
    response.status(500).json({ message: "Internal server error" });
  }
});

//get specific user

router.get("get--user/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const customers = await userAccount.findById(id);

    return response.status(200).json(customers);
  } catch (error) {
    console.error(error);

    response.status(500).send({ message: "Internal server error" });
  }
});
//get all users

router.get("/get--user", async (request, response) => {
  try {
    const customers = await userAccount.find({});

    return response.status(200).json(customers);
  } catch (error) {
    console.error(error);

    response.status(500).send({ message: "Internal server error" });
  }
});

router.post("/", async (request, response) => {
  try {
    if (
      !request.body.firstname ||
      !request.body.lastname ||
      !request.body.age ||
      !request.body.email ||
      !request.body.password ||
      !request.body.birthdate ||
      !request.body.municipality ||
      !request.body.contactNumber ||
      !request.body.profilePicture ||
      !request.body.role
    ) {
      return response
        .status(400)
        .send({ message: "please send all required fields" });
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
    const newCustomer = {
      userAccount: createdUserAcc._id,
    };

    const customers = await customer.create(newCustomer);

    return response.status(201).send(customers);
  } catch (error) {
    console.log("error: ", error);

    response.status(500).send({ message: error.message });
  }
});

router.get("/data", async (request, response) => {
  try {
    const { email } = request.query;

    const result = await userAccount.findOne({ email });

    if (result) {
      response.status(200).json(result);
    } else {
      response.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server Error" });
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
    const customers = await userAccount.findById(id);

    return response.status(200).json(customers);
  } catch (error) {
    console.error(error);

    response.status(500).send({ message: "Internal server error" });
  }
});

router.put("/:id", async (request, response) => {
  try {
    if (!request.body.selected_service) {
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
