import mongoose from "mongoose";
import { stringify } from "querystring";

const paymentSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, rquired: true },
  amount: { type: String, required: true },
  currency: { type: String, default: "NGN" },
  payInterval: {
    type: String,
    required: true,
    enum: ["instant", "two weeks", "month"],
  },
  status: {
    type: String,
    required: true,
    default: "pending",
    enum: ["successful", "pending", "failed"],
  },
});

export const paymentModel = mongoose.model("payment", paymentSchema);
