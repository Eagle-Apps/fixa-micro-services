// import NotificationServiceRepository from "../dba/repository/notificationServiceRepository.js";
import {
  APIError,
  BadRequestError,
  STATUS_CODES,
  ValidationError,
} from "../utils/app-errors.js";

// All Business logic will be here
class NotificationService {
  constructor() {
    // this.repository = new NotificationServiceRepository();
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

export default NotificationService;
