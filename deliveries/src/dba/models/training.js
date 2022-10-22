import mongoose from "mongoose";

const trainingSchema =new mongoose.Schema({
technicianid:  { type: String },
  trainingid: { type: String },
  name: { type: String },
  type: { type: String  },
  date: { type: String },
  score: { type: String },
  status: { type: String }
});



export default mongoose.model("training", trainingSchema);
