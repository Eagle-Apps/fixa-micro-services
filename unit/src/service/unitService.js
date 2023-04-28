import UnitServiceRepository from "../dba/repository/unitServiceRepository.js";

import {
  APIError,
  BadRequestError,
  STATUS_CODES,
  ValidationError,
} from "../utils/app-errors.js";
import {
  FormatData
} from "../utils/index.js";
// All Business logic will be here
class UnitService {
  constructor() {
    this.repository = new UnitServiceRepository();
  }

  async CreateUnit({ unitName, category, model, modelNum }) {
    try {
      const unit = await this.repository.CreateUnit({
        unitName,
        category,
        model,
        modelNum,
      });

      return FormatData({
        unit,
      });
    } catch (err) {
      throw new APIError(
        err.name ? err.name : "Data Not found",
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }

  async UpdateUnit({ _id, unitName, category, model, modelNum }) {
    try {
      const unit = await this.repository.UpdateUnit({
        _id,
        unitName,
        category,
        model,
        modelNum,
      });

      return FormatData({
        unit,
      });
    } catch (err) {
      throw new APIError(
        err.name ? err.name : "Data Not found",
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }

  async GetUnit(id) {
    try {
      const unit = await this.repository.FetchUnit(id);
      return FormatData({
        unit,
      });
    } catch (err) {
      throw new APIError(
        err.name ? err.name : "Data Not found",
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }

  
  async GetallUnit() {
    try {
      const unit = await this.repository.FetchallUnit();
      return FormatData({
        unit,
      });
    } catch (err) {
      throw new APIError(
        err.name ? err.name : "Data Not found",
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }

  async CreatePayload(event, data, clientId) {
    try {
      let payload;

      switch (event) {
        case "NEW_UNIT":
          payload = {
            event,
            data: { unitId: data._id, clientId },
          };

        default:
          break;
      }
      return payload;
    } catch (err) {
      throw new APIError(
        err.name ? err.name : "Data Not found",
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }

  async SubscribeEvents(payload) {
    const { event, data } = payload;

    switch (event) {
      case "SIGN_UP":
        this.SignupSuccessMessage(data);
        break;

      default:
        break;
    }
  }
}

export default UnitService;
