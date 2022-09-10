import mongoose from "mongoose";

const techniciansSchema =new mongoose.Schema({
userid:  { type: String },

technicianid: { type: String },
technciantype: { type: String },
credentialtype: { type: String  },
credentialfile: { type: String },
status: { type: String }
});



export default mongoose.model("technicians", techniciansSchema);
