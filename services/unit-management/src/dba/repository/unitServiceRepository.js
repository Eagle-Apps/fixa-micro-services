import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from "../../utils/app-errors.js";
import { unitModel } from "../models/unit";

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
      return newUnit;
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
}

export default UnitServiceRepository;
