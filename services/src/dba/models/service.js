import mongoose from "mongoose";

const { Schema } = mongoose;

//the product model contains all the different parameters or properties of a product
const services = new Schema({
name: { type: String},
image: { type: String},
icon: { type: String},
price: { type: String},
location: { type: String},
categories: { type: String},

});

export const Service = mongoose.model("Service", services);
