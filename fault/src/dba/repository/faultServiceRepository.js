import { requestModel } from "../models/serviceRequest.js";
import { transactionIdModel } from "../models/transactionId.js";

import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from "../../utils/app-errors.js";

//Dealing with database operations
class FaultServiceRepository {
  async CreateServiceRequest(
    userId,
    location,
    description,
    schedule,
    requestId,
    billingId
  ) {
    try {
      const service = {
        clientId: userId,
        faultDescription: description,
        schedule: schedule,
        location: location,
        requestId: requestId,
        billing: billingId,
      };

      const newRequest = new requestModel(service);
      return newRequest;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
    }
  }

  async UpdateRequest(requestId, technicianId, billingId) {
    const query = { _id: requestId };
    const update = {
      technician: technicianId,
      billing: billingId,
      status: "Active",
    };
    try {
      const request = await requestModel.findOneAndUpdate(query, update, {
        rawResult:true,
        new: true,
        upsert: true
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
      const request = await requestModel.find({_id:id});
      return request;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
    }
  }

  async FindUserRequest(id) {
    try {
      const request = await requestModel.findOne({ clientId: id });
      console.log(request, id);
      return request;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
    }
  }

  async FindTechnicianRequest(id) {
    try {
      const request = await requestModel.find({ technician: id });
      console.log(request, id);
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
