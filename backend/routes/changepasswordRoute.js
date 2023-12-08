import express from "express";
import bcrypt from "bcrypt";
import { userAccount } from "../model/userAccountModel.js";
import { customer } from "../model/customerModel.js";
import { providermodel } from "../model/providermodel.js";

const router = express.Router();

// Change Pass
router.put("/changePassword/:id", async (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    const user = await userAccount.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update pass based on the user role
    if (user.role === "customer") {
      await customer.updateOne({ userAccount: id }, { $set: { password: hashedPassword } });
    } else if (user.role === "provider") {
      await providermodel.updateOne({ userAccount: id }, { $set: { password: hashedPassword } });
    }

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
});

// Update Profile Info
router.put("/updateProfile/:id", async (req, res) => {
  const { id } = req.params;
  const {
    firstname,
    lastname,
    age,
    birthdate,
    municipality,
    contactNumber,
    profilePicture,
  } = req.body;

  try {
    const user = await userAccount.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update profile info based on the user role
    if (user.role === "customer") {
      await customer.updateOne({ userAccount: id }, {
        $set: {
          firstname,
          lastname,
          age,
          birthdate,
          municipality,
          contactNumber,
          profilePicture,
        },
      });
    } else if (user.role === "provider") {
      await providermodel.updateOne({ userAccount: id }, {
        $set: {
          firstname,
          lastname,
          age,
          birthdate,
          municipality,
          contactNumber,
          profilePicture,
        },
      });
    }

    res.json({ message: "Profile information updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
});

export default router;
