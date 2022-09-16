import mongoose from "mongoose";

const unitSchema = mongoose.Schema(
  {
    unitId: { type: String , required: true},
    userId: { type: String , required: true},
    category: { type: String , required: true},
    unitName: { type: String , required: true},
    description: { type: String , required: true},
    address: { type: String , required: true},
    city: { type: String , required: true},
    state: { type: String , required: true},
    zipCode: { type: String , required: true},
  },

);

export const unitModel = mongoose.model("Unit", unitSchema);
