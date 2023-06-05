import {inAppMessagingModel } from "../models/inAppMessaging.js";

import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from "../../utils/app-errors.js";

//Dealing with database operations
class InAppMessagingRepository {
  async FindAllRequests() {
    try {
      const requests = await inAppMessagingModel.find();
      return requests;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
    }
  }

  async FindRequest(id) {
    try {
      const request = await inAppMessagingModel.findOne({_id: id });
      return request;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
    }
  }



  
  async Create(  id,
    images,
    title,
    description,
    from,
    to,
    type,
    schedule,
    status,) {
    try {
      const service = {
        id,
        images,
        title,
        description,
        from,
        to,
        type,
        schedule,
        status
      };

      const newRequest = new inAppMessagingModel(service);
      return newRequest;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
    }
  }

  async UpdateRequest( id,
    images,
    title,
    description,
    from,
    to,
    type,
    schedule,
    status) {
    const query = { _id: id };
    const update = {
        images,
        title,
        description,
        from,
        to,
        type,
        schedule,
        status
    
    };
    try {
      const request = await inAppMessagingModel.findOneAndUpdate(query, update, {
        new: true,
      });

      return request;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
    }
  }
 
  async FindUserRequest(id) {
    
    try {
      const request = await inAppMessagingModel.findOne({clientId:id });
      console.log(request,id);
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

export default InAppMessagingRepository;
