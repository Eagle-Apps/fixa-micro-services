import { Servicem } from "../models/service.js";
import { Price } from "../models/price.js";

import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from "../../utils/app-errors.js";
import service from "../../../../technician/src/dba/models/service.js";

class PriceRepository {

  async GetPrice() {
    try {
     const Price= await Price.find();
     console.log(Price);
        return Price;
    
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        `Unable to Update product ${err.message}`
      );
    }
  }

  //create Price
  async CreatePrice({userInputs}) {
    const{ 
        servicename,
        basic,
        standard,
        premuim,
        } = userInputs;

    try {
      const product = new Price({ 
        servicename,
        basic,
        standard,
        premuim,
        });

      product.save();
      
      return product;
   
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        `Unable to Create Price ${err.message}`
      );
    }
  }
  //update
  async UpdatePrice({userInputs }) {
  const{ 
    servicename,
    basic,
    standard,
    premuim,
    _id} = userInputs;
        console.log('hello'+_id);
    try {
     await Price.findById(_id, (err, product) => {
        servicename,
        basic,
        standard,
        premuim,        
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

export default PriceRepository;
