import UnitRepository from "../dba/repository/unitRepository.js";
import {
  APIError,
  BadRequestError,
  STATUS_CODES,
  ValidationError,
} from "../utils/app-errors.js";
import{FormatData} from "../utils/index.js";

// All Business logic will be here
class unitService {
  constructor() {
    this.repository = new UnitRepository();
  }

  async createUnit(userInputs) {
    const {
      unitId,
      userId,
      category,
      unitName,
      description,
      address,
      city,
      state,
      zipCode,
    } = userInputs;

    try {
      //check if unit is already registered
      const existingUnit = await this.repository.createUnit({
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
      return FormatData({existingUnit})
    } catch (err) {
      throw new APIError(
        err.name ? err.name : "Data Not found",
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }

  async addUnit(userInputs) {
    const 
    { 
      unitId,
      userId,
      category,
      unitName,
      description,
      address,
      city,
      state,
      zipCode,
    } = userInputs;

    try {
      const existingUnit = await this.repository.addUnit({
        email,
      });

      
    } catch (err) {
      throw new APIError(
        err.name ? err.name : "Data Not found",
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }

 

  async findUnit({ query }) {
    try {
      const Query = await this.repository.findUnit({
        query,
      });

    } catch (err) {
      throw new APIError(
        err.name ? err.name : "Data Not found",
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }

 
  
}

export default unitService;
