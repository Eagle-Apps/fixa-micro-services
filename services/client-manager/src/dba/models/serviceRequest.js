import mongoose from "mongoose";

const requestSchema = mongoose.Schema(
  {
    requestId: String,
    faultDescription: { type: String },
    schedule: { type: String },
    technicianId: { type: String },
    technicianName: { type: String },
    category: {
      type: String,
      enum: [
        "Single Home",
        "Single Office",
        "Estate Manager",
        "Corporate",
        "Government",
      ],
    },
    payment: {
      amount: Number,
      status: {
        type: String,
        enum: ["Pending", "Paid"],
        default: "Pending",
      },
    },
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
