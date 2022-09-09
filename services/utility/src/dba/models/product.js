import mongoose from "mongoose";

const { Schema } = mongoose;

//the product model contains all the different parameters or properties of a product
const products = new Schema({
  brand: { type: String, required: true },
  source: { type: String, required: true },
  time_of_production: { type: String, required: true },
  operating_conditions: { type: String, required: true },
  state: { type: String, required: true },
  min_lifespan: { type: String, required: true },
  max_lifespan: { type: String, required: true },
  average_lifespan: { type: String, required: true },
  popular_use_regions: { type: String, required: true },
  min_cost: { type: String, required: true },
  max_cost: { type: String, required: true },
  avg_cost: { type: String, required: true },
  user_feedback: { type: String, required: true },
  common_faults: { type: String, required: true },
});

export const productModel = mongoose.model("Product", products);
