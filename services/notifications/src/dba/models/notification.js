import mongoose from "mongoose";

const notificationSchema = mongoose.Schema({
  alertid: { type: String, required: true },
  userid: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, required: true },
  servicee: { type: String, required: true },
  date: { type: String, required: true },
  piority: { type: String, required: true }
});

export const billingModel = mongoose.model("notification", notificationSchema);
