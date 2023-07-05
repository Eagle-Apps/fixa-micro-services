import mongoose from "mongoose";

const { Schema } = mongoose;

//the product model contains all the different parameters or properties of a product
const servicem = new Schema({
name: { type: String},
image: { type: String},
icon: { type: String},
price: { type: String},
categories: { type: String},
description: { type: String},
locationstate:{ type: String},
locationlga:{ type: String},


});

export const Servicem = mongoose.model("Servicem", servicem);

