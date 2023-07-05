import PropertyServiceRepository from "../dba/repository/PropertyRepository.js";

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
class PropertyService {
  constructor() {
    this.repository = new PropertyServiceRepository();
  }
  
  async CreateProperty({
    typebuilding,
    address,
    sizebuilding,
    occupants,
    ownerName,

    manageName,
    managePhone,
    manageAddress,
    }) {
    try {
      const property = await this.repository.CreateProperty({
        typebuilding,
        address,
        sizebuilding,
        occupants,
        ownerName,
    
        manageName,
        managePhone,
        manageAddress,
        });

      return FormatData({
        property,
      });
    } catch (err) {
      throw new APIError(
        err.name ? err.name : "Data Not found",
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }

  async UpdateProperty(
    typebuilding,
    address,
    sizebuilding,
    occupants,
    ownerName,

    manageName,
    managePhone,
    manageAddress,
    id
    ) {
    try {
      const property = await this.repository.UpdateProperty(
        typebuilding,
    address,
    sizebuilding,
    occupants,
    ownerName,

    manageName,
    managePhone,
    manageAddress,
        id
      );

      return FormatData({
        property,
      });
    } catch (err) {
      throw new APIError(
        err.name ? err.name : "Data Not found",
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }

  async GetProperty(id) {
    try {
      const property = await this.repository.FetchProperty(id);
      return FormatData({
        property,
      });
    } catch (err) {
      throw new APIError(
        err.name ? err.name : "Data Not found",
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }

  
  async GetallProperty() {
    try {
      const property = await this.repository.FetchallProperty();
      return FormatData({
        property,
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
        case "NEW_PROPERTY":
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

  async PropertyEvents(payload) {
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

export default PropertyService;
