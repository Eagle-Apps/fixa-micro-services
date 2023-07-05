import { Servicem } from "../models/service.js";
import { Categories } from "../models/cartegories.js";

import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from "../../utils/app-errors.js";
import service from "../../../../technician/src/dba/models/service.js";

class ServiceRepository {

  async Getcategories() {
    try {
     const categories= await Categories.find();
     console.log(categories);
        return categories;
    
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        `Unable to Update product ${err.message}`
      );
    }
  }

  //create categories
  async Createcategories(categorie) {
    // const {categorie}= categorie;

    try {
      const product = new Categories({categories: categorie});

      product.save();
      
      return product;
   
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        `Unable to Create categories ${err.message}`
      );
    }
  }

  //create service
  async Createproduct({name,
    image,
    icon,
    price,
    categories,
    description,
    locationstate,
    locationlga}) {
    try {
      const product = new Servicem({name,
        image,
        icon,
        price,
        categories,
      description,
      locationstate,
      locationlga});

      product.save();
      
      return product;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        `Unable to Create product ${err.message}`
      );
    }
  }

  //update
  async Updateproduct({userInputs }) {
  const{ name,
        image,
        icon,
        price,
        categories,
        description,
        _id} = userInputs;
        console.log('hello'+_id);
    try {
     await Servicem.findById(_id, (err, product) => {
       name=name,
        image = image,
        icon = icon,
        price= price,
        categories = categories,
        description=description,
        product.save((err) => {
          if (err) {
            return res.send(err);
          }
          return product;
        });
      });
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        `Unable to Update product ${err.message}`
      );
    }
  }

  //to display all product properties

  async Getproductr() {
    try {
     const products= await Servicem.find();
        return products;
    
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        `Unable to Update product ${err.message}`
      );
    }
  }

  //to display a particular product by id

  async Productfind(req, res) {
    
    try {
     
      
    const product= await Servicem.findById(req);
    
        return product;
 

    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        `Unable to Update product ${err.message}`
      );
    }
  }
}

export default ServiceRepository;
