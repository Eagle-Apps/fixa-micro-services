import mongoose from "mongoose";

const fixedBillingSchema = mongoose.Schema({
  category: { type: String},
  serviceName: { type: String},
  standardPrice: { type: String},
  classicPrice: { type: String},
  premuimPrice: { type: String},
  date: { type: String},

});

export const fixedModel = mongoose.model("fixed", fixedBillingSchema);
