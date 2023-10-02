import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // Import JWT library
import { user as UserModel } from "../model/userAccountModel.js"; // Renaming the imported user model
const router = express.Router();

const authenticateUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Find the user by email in the database
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Compare the entered password with the stored password hash
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // If authentication succeeds, attach the user object to the request
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Route to handle user login
router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;

    // Find the user by email in the database
    const user = await UserModel.findOne({ email });
    console.log(user);

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

// Route to save a user detailsconst bcrypt = require("bcrypt");

router.post("/register", async (request, response) => {
  try {
    if (
      !request.body.firstname ||
      !request.body.lastname ||
      !request.body.middlename ||
      !request.body.gender ||
      !request.body.age ||
      !request.body.email ||
      !request.body.password
    ) {
      return response
        .status(400)
        .send({ message: "Please send all required fields" });
    }

    const newUser = {
      firstname: request.body.firstname,
      lastname: request.body.lastname,
      middlename: request.body.middlename,
      email: request.body.email,
      age: request.body.age,
      gender: request.body.gender,
    };

    // Hash the password before storing it in the database
    const saltRounds = 10; // You can adjust the number of salt rounds as needed
    const hashedPassword = await bcrypt.hash(request.body.password, saltRounds);

    newUser.password = hashedPassword;

    const createdUser = await UserModel.create(newUser); // Use UserModel instead of user

    return response.status(201).send(createdUser);
  } catch (error) {
    console.log("Error: ", error);
    response.status(500).send({ message: error.message });
  }
});

// Route to get all users
router.get("/", async (request, response) => {
  try {
    const users = await UserModel.find({});
    return response.status(200).json({ count: users.length, data: users });
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Internal server error" });
  }
});

// Route to get a specific user by ID
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const user = await UserModel.findById(id);
    return response.status(200).json(user);
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Internal server error" });
  }
});

// Route to update a user by ID
router.put("/:id", authenticateUser, async (request, response) => {
  try {
    if (
      !request.body.firstname ||
      !request.body.lastname ||
      !request.body.middlename ||
      !request.body.gender ||
      !request.body.age ||
      !request.body.email ||
      !request.body.password
    ) {
      return response
        .status(400)
        .send({ message: "Please send all required fields" });
    }

    const { id } = request.params;
    const result = await UserModel.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "User not found" });
    }

    return response.status(200).send({ message: "User updated successfully!" });
  } catch (error) {
    response.status(500).send({ message: error.message });
    console.log("Error: ", error);
  }
});

// Route to delete a user by ID
router.delete("/:id", authenticateUser, async (request, response) => {
  try {
    const { id } = request.params;
    const result = await UserModel.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "User not found" });
    }

    return response.status(200).send({ message: "Successfully deleted!" });
  } catch (error) {
    console.error(error);
    response.status(500).send("Internal Server Error");
  }
});

export default router;
