import mongoose from "mongoose";

const providerSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
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
    businessDescription: {
      type: String,
    },
    businessName: {
      type: String,
      required: true,
    },
    businessEmail: {
      type: String,
      required: true,
    },
    businessContactNumber: {
      type: Number,
      required: true,
    },

    services: [
      {
        service_name: { type: String },
        service_description: { type: String, required: true },
        service_price: { type: Number },
        availability_time: { type: Array },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const providermodel = mongoose.model("provider", providerSchema);
