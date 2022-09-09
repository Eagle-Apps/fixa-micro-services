import mongoose from "mongoose";

const requestSchema = mongoose.Schema(
  {
    requestId: String,
    faultDescription: { type: String },
    schedule: { type: String },
    technicianId: { type: String },
    technicianName: { type: String },
    status: {
      type: String,
      enum: ["Pending", "Active", "Closed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export const requestModel = mongoose.model("request", requestSchema);
