import mongoose from "mongoose";

const requestSchema = mongoose.Schema(
  {
    requestId: String,
    service: { type: String },
    faultDescription: { type: String },
    schedule: { type: String },
    technician: { type: String },
    clientId: { type: String },
    location: {
      name: String,
      long: String,
      lat: String,
    },
    serviceClass: {
      type: String,
      enum: ["premium", "classic", "basic"],
    },
    payment: {
      amount: Number,
      status: {
        type: String,
        enum: ["Pending", "Paid"],
        default: "Pending",
      },
    },

    billing: { type: String },
    status: {
      type: String,
      enum: ["Pending", "Active", "Cancelled", "Completed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export const requestModel = mongoose.model("request", requestSchema);
