import mongoose from "mongoose";
const walletSchema = mongoose.Schema(
  {
    balance: { type: Number, default: 0 },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

export const walletModel = mongoose.model("wallet", walletSchema);
