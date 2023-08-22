import mongoose from 'mongoose'
// const ObjectID = mongoose.Schema.Types.ObjectId

// const { Schema } = mongoose

//the product model contains all the different parameters or properties of a product
const servicem = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: { type: Array, required: true },
  icon: { type: String },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Categories',
    required: true,
  },
  subCategory: {
    type: mongoose.Schema.ObjectId,
    ref: 'Categories.subCategory',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  locationstate: { type: String },
  locationlga: { type: String },
})

export const Servicem = mongoose.model('Servicem', servicem)
