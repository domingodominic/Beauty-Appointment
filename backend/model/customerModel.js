import mongoose from "mongoose";

const customerSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
    },

    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    municipality: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    contactNumber: {
      type: Number,
      required: true,
    },
    birthdate: {
      type: Date,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    selected_service: [
      {
        service_provider: { type: String },
        appointed_service: { type: String },
        appointed_price: { type: Number },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const customer = mongoose.model("Customer", customerSchema);
