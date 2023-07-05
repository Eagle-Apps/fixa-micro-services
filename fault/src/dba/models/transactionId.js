import mongoose from "mongoose";

const transactionIdSchema = mongoose.Schema(
  {
    id: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const transactionIdModel = mongoose.model(
  "transactionId",
  transactionIdSchema
);
