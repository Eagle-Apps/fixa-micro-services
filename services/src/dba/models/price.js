import mongoose from "mongoose";

const { Schema } = mongoose;

//the product model contains all the different parameters or properties of a product
const price = new Schema({
servicename: { type: String},
basic: { type: String},
standard: { type: String},
premuim: { type: String},


});

export const Price = mongoose.model("Price", price);

