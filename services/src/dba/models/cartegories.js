import mongoose from "mongoose";

const { Schema } = mongoose;

const categories = new Schema({
   
    categories: { type: String},
    description: { type: String},
    image: { type: String},
 
    
    });
    
    export const Categories = mongoose.model("Categories", categories);
    