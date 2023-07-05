import RecyclingServiceRepository from "../dba/repository/recyclingServiceRepository.js";

import {
  APIError,
  BadRequestError,
  STATUS_CODES,
  ValidationError,
} from "../utils/app-errors.js";

// All Business logic will be here
class RecylingService {
  constructor() {
    this.repository = new RecyclingServiceRepository();
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

export default NotificationService;
