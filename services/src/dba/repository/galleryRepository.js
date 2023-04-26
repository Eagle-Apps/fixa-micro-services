import { Servicem } from "../models/service.js";
import { Gallery } from "../models/gallery.js";

import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from "../../utils/app-errors.js";
import service from "../../../../technician/src/dba/models/service.js";

class GalleryRepository {

  async GetGallery() {
    try {
     const Gallery= await Gallery.find();
     console.log(Gallery);
        return Gallery;
    
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        `Unable to Update product ${err.message}`
      );
    }
  }

  //create Gallery
  async CreateGallery({userInputs}) {
    const{ 
        description,
        image,
        } = userInputs;

    try {
      const product = new Gallery({ 
        description,
        image,
        });

      product.save();
      
      return product;
   
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        `Unable to Create Gallery ${err.message}`
      );
    }
  }
  //update
  async UpdateGallery({userInputs }) {
  const{ 
    description,
    image,
    _id} = userInputs;
        console.log('hello'+_id);
    try {
     await Servicem.findById(_id, (err, product) => {
       
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

export default GalleryRepository;
