import express, { request } from "express";
import { customer } from "../model/customerModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // Import JWT library

const router = express.Router();

// handle sign in

// Route to handle user login
router.post("/login", async (request, response) => {
  try {
    const { username, password } = request.body;
    console.log("Received request with username:", username);

    const user = await customer.findOne({ username });
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
    response.status(200).json({ token });
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
    const hashedPassword = await bcrypt.hash(request.body.password, 12);
    const ConfirmHashedPassword = await bcrypt.hash(
      request.body.confirmPassword,
      12
    );
    const newCustomer = {
      firstname: request.body.firstname,
      lastname: request.body.lastname,
      age: request.body.age,
      username: request.body.username,
      password: hashedPassword,
      confirmPassword: ConfirmHashedPassword,
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

router.get("/data", async (request, response) => {
  try {
    const { username } = request.query;

    const result = await customer.findOne({ username });

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
