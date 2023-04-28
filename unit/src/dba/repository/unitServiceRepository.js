import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from "../../utils/app-errors.js";
import {unitModel} from "../models/unit.js";

//Dealing with database operations
class UnitServiceRepository {
  
 
  async CreateUnit({ unitName, category, model, modelNum }) {
    try {
      const unit = {
        unitName,
        category,
        model,
        modelNum,
      };
      const newUnit = new unitModel(unit);
      newUnit.save();
      return newUnit;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
    }
  }

  async UpdateUnit(unitName,
    category,
    model,
    modelNum,
    id,) {
    try {
      const filter = { _id:id };
      const update = {
        unitName,
        category,
        model,
        modelNum,
        
      };
      const updatedUnit = await unitModel.findByIdAndUpdate(filter, update, {
        new: true,
      });
      return updatedUnit;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
    }
  }

  async FetchUnit(id) {
    try {
      const unit = unitModel.findOne(id);
      return unit;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
    }
  }

async FetchallUnit() {
  try {
    const unit = await unitModel.find();
    return unit;
  } catch (err) {
    throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
  }
}
}

export default UnitServiceRepository;
