import mongoose from "mongoose";

const staffedtechnicanSchema =new mongoose.Schema({
organisationid:  { type: String },
jobcategory: { type: String },
staffid: { type: String },
deparment: { type: String  }

});



export default mongoose.model("staffedtechnician", staffedtechnicanSchema);
