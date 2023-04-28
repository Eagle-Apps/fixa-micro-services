import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from "../../utils/app-errors.js";
import {specialsModel} from "../models/specials.js";

//Dealing with database operations
class SpecialsServiceRepository {
  
 
  async CreateSpecials( {title,
    description,
    discount,
    type,
    image 
     }) {
    try {
      const unit =  {title,
        description,
        discount,
        type,
        image 
         };
      const newUnit = new specialsModel(unit);
      newUnit.save();
      return newUnit;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
    }
  }

  async UpdateSpecials(title,
    description,
    discount,
    type,
    image,
    id) {
    try {
      const filter = { _id:id };
      const update = {
        title,
    description,
    discount,
    type,
    image
      };
      const updatedUnit = await unitModel.findByIdAndUpdate(filter, update, {
        new: true,
      });
      return updatedUnit;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
    }
  }

  async FetchSpecials(id) {
    try {
      const unit = unitModel.findOne(id);
      return unit;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
    }
  }

async FetchallSpecials() {
  try {
    const unit = await unitModel.find();
    return unit;
  } catch (err) {
    throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
  }
}
}

export default SpecialsServiceRepository;
