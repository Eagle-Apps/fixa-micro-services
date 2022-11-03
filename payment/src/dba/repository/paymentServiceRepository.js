import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from "../../utils/app-errors.js";

//Dealing with database operations
class PaymentServiceRepository {
  //   async CreateServiceRequest({ userId, description, schedule, requestId }) {
  //     try {
  //       const service = {
  //         clientId: userId,
  //         description,
  //         schedule,
  //         requestId,
  //       };
  //       const newRequest = new requestModel(service);
  //       return newRequest;
  //     } catch (err) {
  //       throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, err.message);
  //     }
  //   }
}

export default PaymentServiceRepository;
