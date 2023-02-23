import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from "../../utils/app-errors.js";
import { paymentModel } from "../models/payment.js";
import flutterwave from "flutterwave-node";
//Dealing with database operations
// const Flutterwave = require('flutterwave-node-v3');
// const Flutterwave = new flutterwave()
class PaymentServiceRepository {
  async Payment(data) {
    const { name, email, amount, currency, payInterval } = data;

    try {
      const payment = await paymentModel.create({
        name,
        email,
        amount,
        currency,
        payInterval,
      });
      return payment;
    } catch (err) {
      console.log(err.message);
    }
  }
  async getPayment({ paymentId }) {
    try {
      const payment = await paymentModel.findOne(paymentId);
      return payment;
    } catch (err) {
      console.log(err.message);
    }
  }

  async updatePayment({ payStatus, id }) {
    try {
      const statusDetails = await paymentModel.findByIdAndUpdate(
        { _id: id },
        { status: payStatus }
      );
      return statusDetails;
    } catch (err) {}
  }
  // async getPaymentCallback(payment) {
  //   try {
  //     const Transaction = await paymentModel.findOne(payment);
  //     return Transaction;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
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
