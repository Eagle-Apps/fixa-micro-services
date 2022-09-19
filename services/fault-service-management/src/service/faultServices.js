import FaultServiceRepository from "../dba/repository/faultServiceRepository.js";
import {
  generateRequestId,
  PublishNotificationEvent,
  PublishTechnicianEvent,
} from "../utils/index.js";
import {
  APIError,
  BadRequestError,
  STATUS_CODES,
  ValidationError,
} from "../utils/app-errors.js";

// All Business logic will be here
class FaultService {
  constructor() {
    this.repository = new FaultServiceRepository();
  }

  async AddServiceRequest({ userInfo, requestInfo }) {
    try {
      const id = this.repository.GetTransactionId;

      const requestId = await generateRequestId(id);

      const newRequest = await this.repository.CreateServiceRequest({
        userInfo,
        requestInfo,
        requestId,
      });

      if (requestInfo.serviceType === "fixed") AssignTechnician(newRequest);

      const payload = {
        event: "NEW_REQUEST",
        data: newRequest,
      };
      PublishNotificationEvent(payload);

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

  async AddServiceRequest(newRequest) {
    try {
      const payload = {
        event: "ASSIGN_TECHNICIAN",
        data: newRequest,
      };
      PublishTechnicianEvent(payload);

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

  async SubscribeEvents(payload) {
    const { event, data } = payload;

    const { requestInfo, ClientInfo } = data;

    switch (event) {
      case "REQUEST_SERVICE":
        this.AddServiceRequest(requestInfo, ClientInfo);
        break;

      default:
        break;
    }
  }
}

export default FaultService;
