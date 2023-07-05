import SubscriptionsServiceRepository from "../dba/repository/subscriptionsRepository.js";

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
class SubscriptionsService {
  constructor() {
    this.repository = new SubscriptionsServiceRepository();
  }
  
  async CreateSubscriptions({
    serviceid,
    clientid,
    date,
    time,
    schedule,
    status
    }) {
    try {
      const unit = await this.repository.CreateSubscriptions({
        serviceid,
        clientid,
        date,
        time,
        schedule,
        status
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

  async UpdateSubscriptions(
    serviceid,
    clientid,
    date,
    time,
    schedule,
    status,
    id
    ) {
    try {
      const unit = await this.repository.UpdateSubscriptions(
        serviceid,
        clientid,
        date,
        time,
        schedule,
        status,
        id
      );

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

  async GetSubscriptions(id) {
    try {
      const unit = await this.repository.FetchSubscriptions(id);
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

  
  async GetallSubscriptions() {
    try {
      const unit = await this.repository.FetchallSubscriptions();
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

export default SubscriptionsService;
