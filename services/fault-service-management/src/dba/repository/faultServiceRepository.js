import { requestModel } from "../models/serviceRequest.js";
import { transactionIdModel } from "../models/transactionId.js";

import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from "../../utils/app-errors.js";

//Dealing with database operations
class FaultServiceRepository {
  async CreateServiceRequest({ userId, description, schedule, requestId }) {
    try {
      const service = {
        clientId: userId,
        description,
        schedule,
        requestId,
      };

      const newRequest = new requestModel(service);
      return newRequest;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
    }
  }

  async GetTransactionId() {
    try {
      let id;
      id = transactionIdModel.find();
      if (!id) {
        id = await new transactionIdModel({}).save();
      }
      return id;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
    }
  }
}

export default FaultServiceRepository;
