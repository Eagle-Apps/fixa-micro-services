import { Servicem } from "../models/service.js";
import { Categories } from "../models/cartegories.js";

import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from "../../utils/app-errors.js";
import service from "../../../../technician/src/dba/models/service.js";

class CategoriesRepository {

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
  async Createcategories({userInputs}) {
    const{ categories,
        description,
        image,
        _id} = userInputs;

    try {
      const product = new Categories({ categories,
        description,
        image,
        _id});

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
  //update
  async Updateproduct({userInputs }) {
  const{ categories,
    description,
    image,
    _id} = userInputs;
        console.log('hello'+_id);
    try {
     await Servicem.findById(_id, (err, product) => {
        categories,
        description,
        image,
        
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
}

export default CategoriesRepository;
