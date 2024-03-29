import { Servicem } from '../models/service.js'
import { Categories } from '../models/categories.js'

import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from '../../utils/app-errors.js'
import { Subcategories } from '../models/subcartegories.js'
// import service from "../../../../technician/src/dba/models/service.js";

class ServiceRepository {
  async Getcategories() {
    try {
      const categories = await Categories.find()
      console.log(categories)
      return categories
    } catch (err) {
      // throw new APIError(
      //   "API Error",
      //   STATUS_CODES.INTERNAL_ERROR,
      //   `Unable to Update product ${err.message}`
      // );
      return err
    }
  }

  //create categories
  async Createcategories(categorie) {
    // const {categorie}= categorie;

    try {
      const product = new Categories({ categories: categorie })

      product.save()

      return product
    } catch (err) {
      // throw new APIError(
      //   "API Error",
      //   STATUS_CODES.INTERNAL_ERROR,
      //   `Unable to Create categories ${err.message}`
      // );
      return err
    }
  }

  //create Sub categories
  async Createsubcategories(categorie) {
    // const {categorie}= categorie;

    try {
      const subcategory = new Subcategories({ subcategories: categorie })

      subcategory.save()

      return subcategory
    } catch (err) {
      // throw new APIError(
      //   "API Error",
      //   STATUS_CODES.INTERNAL_ERROR,
      //   `Unable to Create categories ${err.message}`
      // );
      return err
    }
  }

  //create service
  async Createproduct({
    name,
    image,
    icon,
    price,
    category,
    subCategory,
    description,
    locationstate,
    locationlga,
  }) {
    try {
      const newProduct = await new Servicem({
        name,
        image,
        icon,
        price,
        category,
        subCategory,
        description,
        locationstate,
        locationlga,
      })

      // await product.save()
      console.log(newProduct, 'new product')
      const saveProduct = await newProduct.save()
      console.log(saveProduct, 'showing saved product')
      return saveProduct

      // return product
    } catch (err) {
      // throw new APIError(
      //   'API Error',
      //   STATUS_CODES.INTERNAL_ERROR,
      //   `Unable to Create product ${err.message}`
      // )

      return err
    }
  }

  //update
  async Updateproduct({ userInputs }) {
    const { name, image, icon, price, categories, description, _id } =
      userInputs
    console.log('hello' + _id)
    try {
      await Servicem.findById(_id, (err, product) => {
        ;(name = name),
          (image = image),
          (icon = icon),
          (price = price),
          (categories = categories),
          (description = description),
          product.save((err) => {
            if (err) {
              return res.send(err)
            }
            return product
          })
      })
    } catch (err) {
      // throw new APIError(
      //   "API Error",
      //   STATUS_CODES.INTERNAL_ERROR,
      //   `Unable to Update product ${err.message}`
      // );
      return err
    }
  }

  //to display all product properties

  async Getproductr() {
    try {
      const products = await Servicem.find()
      return products
    } catch (err) {
      // throw new APIError(
      //   "API Error",
      //   STATUS_CODES.INTERNAL_ERROR,
      //   `Unable to Update product ${err.message}`
      // );
      return err
    }
  }

  //to display a particular product by id

  async Productfind(req, res) {
    try {
      const product = await Servicem.findById(req)

      return product
    } catch (err) {
      // throw new APIError(
      //   "API Error",
      //   STATUS_CODES.INTERNAL_ERROR,
      //   `Unable to Update product ${err.message}`
      // );
      return err
    }
  }
}

export default ServiceRepository
