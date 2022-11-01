import PaymentServiceRepository from "../dba/repository/paymentServiceRepository.js";
import {
  APIError,
  BadRequestError,
  STATUS_CODES,
  ValidationError,
} from "../utils/app-errors.js";

// All Business logic will be here
class PaymentService {
  constructor() {
    this.repository = new PaymentServiceRepository();
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

export default PaymentService;
