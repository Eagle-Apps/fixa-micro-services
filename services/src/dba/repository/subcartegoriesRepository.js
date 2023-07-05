import { Servicem } from "../models/service.js";
import { SubCategories } from "../models/subcartegories.js";

import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from "../../utils/app-errors.js";
import service from "../../../../technician/src/dba/models/service.js";

class SubCategoriesRepository {

  async GetSubcategories() {
    try {
     const Subcategories= await SubCategories.find();
     console.log(Subcategories);
        return Subcategories;
    
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        `Unable to Update product ${err.message}`
      );
    }
  }

  //create Subcategories
  async CreateSubcategories({userInputs}) {
    const{ Subcategories,
        description,
        image,
        _id} = userInputs;

    try {
      const product = new SubCategories({ Subcategories,
        description,
        image,
        _id});

      product.save();
      
      return product;
   
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        `Unable to Create Subcategories ${err.message}`
      );
    }
  }
  //update
  async Updateproduct({userInputs }) {
  const{ Subcategories,
    description,
    image,
    _id} = userInputs;
        console.log('hello'+_id);
    try {
     await Servicem.findById(_id, (err, product) => {
        Subcategories,
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

export default SubCategoriesRepository;
