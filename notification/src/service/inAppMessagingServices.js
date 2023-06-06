import InAppMessagingRepository from "../dba/repository/inAppMessagingRepository.js";
import {PublishMessage } from "../utils/index.js";
import {
  APIError,
  BadRequestError,
  STATUS_CODES,
  ValidationError,
} from "../utils/app-errors.js";
import {FormatData} from "../utils/index.js";
import { configs } from "../config/index.js";
const { NOTIFICATION_SERVICE, TECHNICIAN_SERVICE } = configs;

// All Business logic will be here
class InAppMessagingService {
  constructor(channel) {
    this.repository = new InAppMessagingRepository();
    this.channel = channel;
  }


  async GetMessage() {
    try {
      const messages = await this.repository.FindAllRequests();

      return FormatData({
        messages,
      });
    } catch (err) {
      throw new APIError(
        err.name ? err.name : "Data Not found",
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }

  async GetMessageById(id) {
    try {
      const request = await this.repository.FindRequest(id);

      return FormatData({
        request,
      });
    } catch (err) {
      throw new APIError(
        err.name ? err.name : "Data Not found",
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }


  async SendMessage( 
    images,
    title,
    description,
    from,
    to,
    type,
    schedule,
    status) {
    try {
      
      const newRequest = await this.repository.CreateMessage({
        
        images,
        title,
        description,
        from,
        to,
        type,
        schedule,
        status});
        newRequest.save();

      // if (requestInfo.serviceType === "fixed") {
      //   this.FetchTechnician(newRequest);
      // }
      const payload = {
        event: "NEW_REQUEST",
        data: newRequest,
      };
      // PublishNotificationEvent(payload);

      // PublishMessage(
      //   this.channel,
      //   NOTIFICATION_SERVICE,
      //   JSON.stringify(payload)
      // );
      return FormatData({
        newRequest,
      });
    } catch (err) {
      throw new APIError(
        err.name ? err.name : "Data Not found",
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }

  async UpdateMessage(requestId, technicianId, billingId) {
    try {
      const request = await this.repository.UpdateRequest(
        requestId, technicianId, billingId
        );

        return request;
    } catch (err) {
      throw new APIError(
        err.name ? err.name : "Data Not found",
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }



  // async SubscribeEvents(payload) {
  //   const { event, data } = payload;

  //   const { requestInfo, ClientInfo } = data;

  //   switch (event) {
  //     case "REQUEST_SERVICE":
  //       this.AddServiceRequest(requestInfo, ClientInfo);
  //       break;
  //     case "AVAILABLE_TECHNICIAN":
  //       this.AssignTechnician(data);
  //     case "TECHNICIAN_ASSIGNED":
  //       this.UpdateRequest(requestInfo, "Active");
  //       break;

  //     case "REQUEST_CANCELLED":
  //       this.UpdateRequest(requestInfo, "Cancelled");
  //       break;
  //     case "REQUEST_COMPLETED":
  //       this.UpdateRequest(requestInfo, "Completed");
  //       break;

  //     default:
  //       break;
  //   }
  // }
}

export default InAppMessagingService;
