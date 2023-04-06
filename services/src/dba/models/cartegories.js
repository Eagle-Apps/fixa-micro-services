import mongoose from "mongoose";

const { Schema } = mongoose;

const categories = new Schema({
   
    categories: { type: String},
 
    
    });
    
    export const Categories = mongoose.model("Categories", categories);
    