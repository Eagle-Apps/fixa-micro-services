import mongoose from "mongoose";

const ServiceSchema =new mongoose.Schema({
jobytype:  { type: String },
jobcategory: { type: String },
pricerange: { type: String },
serviceimage: { type: String  },
technicianid: { type: String }

});



export default mongoose.model("service", ServiceSchema);
