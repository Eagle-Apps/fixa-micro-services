import mongoose from 'mongoose'

const { Schema } = mongoose

const subcategories = new Schema({
  subcategories: { type: String },
  description: { type: String },
  image: { type: String },
})

export const Subcategories = mongoose.model('Subcategories', subcategories)
