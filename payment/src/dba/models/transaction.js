import { timeStamp } from "console";
import mongoose from "mongoose";

const transactionSchema = mongoose.Schema(
  {
    transactionId: { type: Number, trim: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    amount: { type: Number, required: true },
    currency: ["NGN"],
    paymentStatus: {
      type: String,
      required: true,
      enum: ["Succesful", "pending", "failed"],
    },
    paymentGateway: { type: String, required: true },
  },
  { timeStamp: true }
);

export const transactionModel = mongoose.model(
  "transactions",
  transactionSchema
);
