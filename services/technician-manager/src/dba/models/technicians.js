import mongoose from "mongoose";

const techniciansSchema =new mongoose.Schema({
name: { type: String, required: true },
phone: { type: String, required: true },
email: { type: String, required: true },
password: { type: String, required: true },
address: { type: String, required: true },
city: { type: String, required: true },
state: { type: String, required: true },
zipCode: { type: String, required: true },
salt: String,

technicianid: { type: String },
technciantype: { type: String },
credentialtype: { type: String  },
credentialfile: { type: String },
status: {
    type: String,
    enum: ["Active, Inactive"],
    default: "Active",
  },
});



export default mongoose.model("technicians", techniciansSchema);
