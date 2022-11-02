import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  jobytype: { type: String },
  jobcategory: { type: String },
  pricerange: { type: String },
});

export default mongoose.model("service", ServiceSchema);
