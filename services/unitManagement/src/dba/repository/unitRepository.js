import { unitModel } from "../models/unit.js";

import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from "../../utils/app-errors.js";

//Dealing with database operations
class UnitRepository {
  async FindByUserId({ userId }) {
    try {
      const userId = await unitModel.findOne({ userId });
      return userId;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        `something went wrong  ${err.message}`
      );
    }
  }

  async createUnit({
    unitId,
    userId,
    category,
    unitName,
    description,
    address,
    city,
    state,
    zipCode,
  }) {
    try {
      const unit = new unitModel({
        unitId,
        userId,
        category,
        unitName,
        description,
        address,
        city,
        state,
        zipCode,
      });
      const unitResult = await unit.save();
      return unitResult;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        `Unable to Create Unit ${err.message}`
      );
    }
  }


}

export default UnitRepository;
