import mongoose from "mongoose";

const walletTransactionSchema = mongoose.Schema(
  {
    amount: { type: Number, default: 0 },
    userId: { type: String, required: true },
    isInFlow: { type: Boolean },
    paymentMethod: { type: String, default: "flutterwave" },
    currency: { type: String, required: [true, "currency is required"] },
    status: {
      type: String,
      required: true,
      enum: ["successful", "pending", "failed"],
    },
  },
  { timestamp: true }
);

export const walletTransactionModel = mongoose.model(
  "walletTransaction",
  walletTransactionSchema
);
