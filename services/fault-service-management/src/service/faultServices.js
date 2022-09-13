import FaultServiceRepository from "../dba/repository/faultServiceRepository.js";
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

  async SubscribeEvents(payload) {
    const { event, data } = payload;

    const { order } = data;

    switch (event) {
      case "CREATE_ORDER":
        this.ManageOrder(userId, order);
        break;

      default:
        break;
    }
  }
}

export default FaultService;
