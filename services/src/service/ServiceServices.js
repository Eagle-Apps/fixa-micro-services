import ServiceRepository from '../dba/repository/serviceRepository.js'
import CategoriesRepository from '../dba/repository/categoriesRepository.js'

class ServicesService {
  constructor() {
    this.repository = new ServiceRepository()
    this.categoryRepository = new CategoriesRepository()
  }

  // create category
  async CreateCategory({ name, subCategory }) {
    console.log('creating category')
    try {
      // check if category exists already
      const categoryExist = await this.categoryRepository.FindExistingCategory(
        name,
        'name'
      )
      if (categoryExist) {
        const message = 'category already exists'
        throw new Error(message)
        // return message;
      }
      const createCategory = await this.categoryRepository.CreateCategory({
        name,
        subCategory,
      })
      console.log('createCategory', createCategory)
      return createCategory
    } catch (err) {
      throw new APIError(
        err.name ? err.name : 'Category Not Created',
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      )
    }
  }

  // async Createsubcategories(userInputs) {
  //   const Createsubcategories = this.repository.Createsubcategories(userInputs)
  //   // console.log('datates')

  //   return Createsubcategories
  // }

  // get all categories
  async GetCategories() {
    try {
      const categories = await this.categoryRepository.GetAllCategory()
      return categories
    } catch (err) {
      throw new APIError(
        err.name ? err.name : 'Category Not Found',
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      )
    }
  }

  // get single Category
  async GetACategory({ categoryId }) {
    try {
      const category = await this.categoryRepository.GetACategory({
        categoryId,
      })
      return category
    } catch (err) {
      throw new APIError(
        err.name ? err.name : 'Category Not Created',
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      )
    }
  }

  // update category
  async updateCategory({ isActive, name, subCategory, categoryId }) {
    try {
      console.log('updating category')
      const existingCategory = await this.categoryRepository.GetACategory({
        categoryId,
      })
      console.log(existingCategory, 'existing category')
      if (existingCategory) {
        isActive
          ? (existingCategory.isActive = isActive)
          : (existingCategory.isActive = existingCategory.isActive)
        name
          ? (existingCategory.name = name)
          : (existingCategory.name = existingCategory.name)
        subCategory
          ? (existingCategory.subCategory = subCategory)
          : (existingCategory.subCategory = existingCategory.subCategory)
        const updateCategory = await existingCategory.save()
        console.log(updateCategory, 'update category from service')
        return updateCategory
      } else {
        throw new BadRequestError('Category not found')
      }
    } catch (err) {
      throw new APIError(
        err.name ? err.name : 'Updating a Category failed',
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      )
    }
  }

  // update category active state
  async UpdateCategoryActiveState({ isActive, categoryId }) {
    try {
      const category = await this.categoryRepository.updateCategoryActiveState({
        categoryId,
        isActive,
      })
      console.log(category, 'existing category')
      return category
    } catch (err) {
      throw new APIError(
        err.name ? err.name : 'Updating a category active failed',
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      )
    }
  }

  // delete category
  async DeleteCategory(categoryId) {
    try {
      const category = await this.categoryRepository.DeleteCategory({
        categoryId,
      })
      console.log(category, 'existing category')
      return category
    } catch (err) {
      throw new APIError(
        err.name ? err.name : 'Updating a product failed',
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      )
    }
  }

  async CreateProduct({
    name,
    imageUrl,
    icon,
    price,
    category,
    description,
    subCategory,
  }) {
    // const { name, imageUrl, icon, price, categories, description } = userInputs
    console.log('creating product')
    try {
      const CreateProducts = await this.repository.Createproduct({
        name,
        image: imageUrl,
        icon,
        price: Number(price),
        category,
        description,
        subCategory,
      })
      console.log(CreateProducts, 'checking create product')
      return CreateProducts
    } catch (err) {
      return err
      // throw new APIError(
      //   err.name ? err.name : 'Product Not Created',
      //   err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
      //   err.message
      // )
    }
  }

  async Updateproduct({ userInputs }) {
    const { name, image, icon, price, categories, description, _id } =
      userInputs
    try {
      const UpdateProducts = this.repository.Updateproduct({
        name,
        image,
        icon,
        price,
        categories,
        description,
        _id,
      })
      console.log(UpdateProducts)
      return UpdateProducts
    } catch (err) {}
  }

  async Getproduct() {
    try {
      const data = await this.repository.Getproductr()
      return data
    } catch (err) {}
  }

  async Productfind(data) {
    try {
      const Productfind = await this.repository.Productfind(data)
      return Productfind
    } catch (err) {}
  }
}
export default ServicesService
