import mongoose from "mongoose";

const paymentSchema =new mongoose.Schema({
technicianid:  { type: String },
  paymentid: { type: String },
  billingid: { type: String },
  amount: { type: String  },
  status: { type: String }
});



export default mongoose.model("paymenthistory", paymentSchema);
