import mongoose from "mongoose";

const deliveriesSchema =new mongoose.Schema({

  description: { type: String, required: true },
  payer:{
    type: String,
    enum: ["Client", "Technicians"],
    default: "Client",
  },
  price: { type: String, required: true },
  dispatcher: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
 
});
export default mongoose.model("deliveries", deliveriesSchema);
