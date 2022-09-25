import mongoose from "mongoose";

const ratingSchema =new mongoose.Schema({
ratingid:  { type: String },
quality: { type: String },
cost: { type: String },
promptness: { type: String  },
technicianid: { type: String }
});



export default mongoose.model("rating", ratingSchema);
