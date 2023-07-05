import mongoose from "mongoose";

const { Schema } = mongoose;

const testimonial = new Schema({
   
    testimonial: { type: String},
    name: { type: String},
    image: { type: String},
 
    
    });
    
    export const Testimonial = mongoose.model("Testimonial", testimonial);
    