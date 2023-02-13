import { requestModel } from "../models/serviceRequest.js";
import { transactionIdModel } from "../models/transactionId.js";

import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from "../../utils/app-errors.js";

//Dealing with database operations
class FaultServiceRepository {
  async CreateServiceRequest( userId,
    location,
    description,
    schedule,
    requestId) {
    try {
      const service = {
        clientId: userId,
        description: description,
        schedule: schedule,
        location: location,
        requestId: requestId
      };

      const newRequest = new requestModel(service);
      return newRequest;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
    }
  }

  async UpdateRequest(requestInfo, statusType) {
    const query = { _id: requestInfo._id };
    const update = {
      ...requestInfo,
      status: statusType,
    };
    try {
      const request = await requestModel.findOneAndUpdate(query, update, {
        new: true,
      });

      return request;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
    }
  }
  async FindAllRequests() {
    try {
      const requests = await requestModel.find();
      return requests;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
    }
  }
  async FindRequest(id) {
    try {
      const request = await requestModel.findOne({ requestId: id });
      return request;
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
