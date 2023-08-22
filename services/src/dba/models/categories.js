import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  subCategory: {
    type: [
      {
        title: String,
      },
    ],
    unique: true,
  },
})

export const Categories = mongoose.model('Categories', CategorySchema)
