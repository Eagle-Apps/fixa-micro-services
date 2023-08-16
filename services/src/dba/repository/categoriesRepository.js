import { Servicem } from '../models/service.js'
import { Categories } from '../models/categories.js'

import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from '../../utils/app-errors.js'
import service from '../../../../technician/src/dba/models/service.js'

class CategoriesRepository {
  // get all categories
  async GetAllCategory() {
    try {
      const allCategories = await Categories.find({})
      // console.log(categories)
      return allCategories
    } catch (err) {
      throw new APIError(
        'API Error',
        STATUS_CODES.INTERNAL_ERROR,
        `Unable to Update product ${err.message}`
      )
    }
  }

  // get a product
  async GetACategory({ categoryId }) {
    try {
      const category = await Categories.findById({ _id: categoryId }).select(
        'name'
      )
      console.log(category, 'from category model')
      return category
    } catch (err) {
      throw new APIError(
        'API Error',
        STATUS_CODES.INTERNAL_ERROR,
        `Unable to get product ${err.message}`
      )
    }
  }

  //create categories
  async CreateCategory({ name, subCategory }) {
    // const { categories, description, image, _id } = userInputs

    try {
      const newCategory = await new Categories({
        name,
        subCategory,
      })
      console.log(newCategory, 'new category created')
      let saveCategory = await newCategory.save()
      console.log(saveCategory, 'showing saved product')
      return saveCategory
    } catch (err) {
      throw new APIError(
        'API ERROR',
        STATUS_CODES.INTERNAL_ERROR,
        `Unable to create Product ${err.message}`
      )
    }
  }
  //update
  // async Updateproduct({ userInputs }) {
  //   const { categories, description, image, _id } = userInputs
  //   console.log('hello' + _id)
  //   try {
  //     await Servicem.findById(_id, (err, product) => {
  //       categories,
  //         description,
  //         image,
  //         product.save((err) => {
  //           if (err) {
  //             return res.send(err)
  //           }
  //           return product
  //         })
  //     })
  //   } catch (err) {
  //     throw new APIError(
  //       'API Error',
  //       STATUS_CODES.INTERNAL_ERROR,
  //       `Unable to Update product ${err.message}`
  //     )
  //   }
  // }

  async FindExistingCategory(query, queryType) {
    try {
      let existingCategory
      if (queryType === 'id')
        existingCategory = await Categories.findOne({ _id: query })
      else if (queryType === 'name')
        existingCategory = await Categories.findOne({
          name: { $regex: new RegExp(query, 'i') },
        })
      else if (queryType === 'subCategory')
        existingCategory = await Categories.findOne({
          subCategory: { $regex: new RegExp(query, 'i') },
        })
      return existingCategory
    } catch (error) {
      throw new APIError(
        'API Error',
        STATUS_CODES.INTERNAL_ERROR,
        `something went wrong ${error.message}`
      )
    }
  }

  // get all active categorys
  async GetActiveCategories() {
    try {
      const allCategory = await Categories.find({ isActive: true })
      return allCategory
    } catch (err) {
      throw new APIError(
        'API Error',
        STATUS_CODES.INTERNAL_ERROR,
        `Unable to get all products ${err.message}`
      )
    }
  }
  // edit category
  async editCategory({ isActive, name, subCategory, categoryId }) {
    try {
      const filterProduct = { _id: categoryId }
      const updateCategory = {
        name,
        subCategory,
        isActive,
      }
      const updatedCategory = Categories.findByIdAndUpdate(
        filterProduct,
        updateCategory,
        { new: true }
      )
      return updatedCategory
    } catch (err) {
      throw new APIError(
        'API Error',
        STATUS_CODES.INTERNAL_ERROR,
        `can't update product ${err.message}`
      )
    }
  }

  // make category active/ inactive
  async updateCategoryActiveState({ isActive, categoryId }) {
    try {
      const filterProduct = { _id: categoryId }
      const updateCategory = {
        isActive,
      }
      const updatedCategory = Categories.findByIdAndUpdate(
        filterProduct,
        updateCategory,
        { new: true }
      )
      return updatedCategory
    } catch (err) {
      throw new APIError(
        'API Error',
        STATUS_CODES.INTERNAL_ERROR,
        `can't update product ${err.message}`
      )
    }
  }

  // delete category
  async DeleteCategory({ categoryId }) {
    try {
      const category = await Categories.findOneAndDelete({
        _id: categoryId,
      })
      console.log(category, 'from product model')
      return category
    } catch (err) {
      throw new APIError(
        'API Error',
        STATUS_CODES.INTERNAL_ERROR,
        `Unable to get product ${err.message}`
      )
    }
  }
}

export default CategoriesRepository
