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
  async FetchAllRequests() {
    try {
      const requests = await this.repository.FindAllRequests();

      return FormatData({
        requests,
      });
    } catch (err) {
      throw new APIError(
        err.name ? err.name : "Data Not found",
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }

  async FetchSingleRequest(id) {
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

  async AddServiceRequest(userInfo, requestInfo) {
    try {
      const id = this.repository.GetTransactionId;

      const requestId = await generateRequestId(id);

      const newRequest = await this.repository.CreateServiceRequest({
        userInfo,
        requestInfo,
        requestId,
      });

      if (requestInfo.serviceType === "fixed") {
        this.FetchTechnician(newRequest);
      }
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

  async AssignTechnician({ technician, id }) {
    try {
      const currentRequest = await this.repository.FindRequest(id);
      const tech = technician[0];

      const payload = {
        event: "NOTIFY_TECHNICIAN",
        data: {
          email: tech.email,
          phone: tech.phone,
          description: currentRequest.faultDescription,
          service: currentRequest.service,
          schedule: currentRequest.schedule,
        },
      };

      PublishNotificationEvent(payload);
    } catch (err) {
      throw new APIError(
        err.name ? err.name : "Data Not found",
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }

  async FetchTechnician(request) {
    try {
      const payload = {
        event: "FETCH_TECNICIANS",
        payload: {
          id: request._id,
          service: request.service,
          serviceClass: request.serviceClass,
          location: request.location,
        },
      };
      PublishTechnicianEvent(payload);
    } catch (err) {
      throw new APIError(
        err.name ? err.name : "Data Not found",
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }
  async DeclineTask({ id, TechnicianId }) {
    try {
      const currentRequest = await this.repository.FindRequest(id);
      this.FetchTechnician(currentRequest);
    } catch (err) {
      throw new APIError(
        err.name ? err.name : "Data Not found",
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }

  async AcceptTask({ id, technicianId }) {
    try {
      let currentRequest = await this.repository.FindRequest(id);

      currentRequest.technicianId = technicianId;

      this.UpdateRequest(currentRequest, "Active");
    } catch (err) {
      throw new APIError(
        err.name ? err.name : "Data Not found",
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }
  async AssignTaskByAdmin({ requestId, TechnicianId, billingId }) {
    try {
    } catch (err) {
      throw new APIError(
        err.name ? err.name : "Data Not found",
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }

  async UpdateRequest(requestInfo, statusType) {
    try {
      const request = await this.repository.UpdateRequest(
        requestInfo,
        statusType
      );
      switch (statusType) {
        case "Active":
          () => {
            const payload = {
              event: "REQUEST_ACTIVE",
              data: { ...request, statusType },
            };
            PublishNotificationEvent(payload);
          };
          break;
        case "Cancelled":
          () => {
            const payload = {
              event: "REQUEST_CANCELLED",
              data: { ...request, statusType },
            };
            PublishNotificationEvent(payload);
          };
          break;
        case "Completed":
          () => {
            const payload = {
              event: "REQUEST_COMPLETED",
              data: { ...request, statusType },
            };
            PublishNotificationEvent(payload);
          };
          break;

        default:
          break;
      }
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
      case "AVAILABLE_TECHNICIAN":
        this.AssignTechnician(data);
      case "TECHNICIAN_ASSIGNED":
        this.UpdateRequest(requestInfo, "Active");
        break;

      case "REQUEST_CANCELLED":
        this.UpdateRequest(requestInfo, "Cancelled");
        break;
      case "REQUEST_COMPLETED":
        this.UpdateRequest(requestInfo, "Completed");
        break;

      default:
        break;
    }
  }
}

export default FaultService;