import mongoose from "mongoose";

const providerSchema = mongoose.Schema(
  {
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
    services: [
      {
        service_name: { type: String },
        service_description: { type: String },
        service_price: { type: Number },
        service_image: { type: String },

        timeAndDate: [
          {
            service_date: { type: String },
            availability_time: { type: Array },
          },
        ],
      },
    ],
    userAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserAccount",
    },
  },
  {
    timestamps: true,
  }
);

export const providermodel = mongoose.model("provider", providerSchema);
