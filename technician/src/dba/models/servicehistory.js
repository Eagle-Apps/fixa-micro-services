import mongoose from "mongoose";

const servicehistorySchema =new mongoose.Schema({
technicianid:  { type: String },
  serviceid: { type: String },
  rating: { type: String },
  date: { type: String  },
  status: {
    type: String,
    enum: ["inprogress", "done", "declined"],
    default: "inprogess",
  },
});



export default mongoose.model("servicehistory", servicehistorySchema);
