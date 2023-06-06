import SpecialsServiceRepository from "../dba/repository/specialsRepository.js";

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
class SpecialsService {
  constructor() {
    this.repository = new SpecialsServiceRepository();
  }

  async CreateSpecials({ title,
      description,
      discount,
      type,
      image}) {
    try {
      const specials = await this.repository.CreateSpecials({
        title,
        description,
        discount,
        type,
        image
      });

      return FormatData({
        specials,
      });
    } catch (err) {
      throw new APIError(
        err.name ? err.name : "Data Not found",
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }

  async UpdateSpecials(title,
    description,
    discount,
    type,
    image,
    id) {
    try {
      const specials = await this.repository.UpdateSpecials(
        title,
        description,
        discount,
        type,
        image,
        id,
      );

      return FormatData({
        specials,
      });
    } catch (err) {
      throw new APIError(
        err.name ? err.name : "Data Not found",
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }

  async GetSpecials(id) {
    try {
      const specials = await this.repository.FetchSpecials(id);
      return FormatData({
        specials,
      });
    } catch (err) {
      throw new APIError(
        err.name ? err.name : "Data Not found",
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }

  
  async GetallSpecials() {
    try {
      const specials = await this.repository.FetchallSpecials();
      return FormatData({
        specials,
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
        case "NEW_specials":
          payload = {
            event,
            data: { specialsId: data._id, clientId },
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

export default SpecialsService;