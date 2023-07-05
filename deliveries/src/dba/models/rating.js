import mongoose from "mongoose";

const ratingSchema =new mongoose.Schema({
quality: { type: String },
promptness: { type: String  },

});



export default mongoose.model("rating", ratingSchema);
