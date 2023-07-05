import got from "got";
import PaymentServiceRepository from "../dba/repository/paymentServiceRepository.js";
import Payment from "../dba/repository/paymentServiceRepository.js";
import {
  APIError,
  BadRequestError,
  STATUS_CODES,
  ValidationError,
} from "../utils/app-errors.js";
import { FormatData } from "../utils/index.js";
import flutterwave from "flutterwave-node";
// All Business logic will be here
const flw = new flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY
);
class PaymentService {
  constructor() {
    this.repository = new PaymentServiceRepository();
  }
  // const payRepo = new PaymentServiceRepository()
  async paymentService(data) {
    const { name, email, amount, currency, payInterval } = data;
    try {
      const paymentDetails = await this.repository.Payment({
        name,
        email,
        amount,
        currency,
        payInterval,
      });
      const Id = String(paymentDetails._id);
      if (paymentDetails.payInterval === "two weeks") {
        let amountPercent = paymentDetails.amount / 10;
        let fivePercent = amountPercent / 2;
        let currentAmount = Number(paymentDetails.amount) + Number(fivePercent);
        paymentDetails.amount = String(currentAmount);
        const response = await got
          .post("https://api.flutterwave.com/v3/payments", {
            headers: {
              Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
            },
            json: {
              tx_ref: Id,
              amount: amount,
              currency: "NGN",
              redirect_url: "#",
              customer: {
                email: email,
                name: name,
              },
              customizations: {
                title: "Fixa",
                logo: "http://www.piedpiper.com/app/themes/joystick-v27/images/logo.png",
              },
            },
          })
          .json();
        console.log(response);
        const paymentData = { response: response, payDetails: paymentDetails };
        console.log({ response, paymentDetails });
        return paymentData;
      } else if (paymentDetails.payInterval === "month") {
        let amountPercent = paymentDetails.amount / 10;
        let currentAmount =
          Number(paymentDetails.amount) + Number(amountPercent);
        paymentDetails.amount = String(currentAmount);
        const response = await got
          .post("https://api.flutterwave.com/v3/payments", {
            headers: {
              Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
            },
            json: {
              tx_ref: Id,
              amount: amount,
              currency: "NGN",
              redirect_url: "#",
              customer: {
                email: email,
                name: name,
              },
              customizations: {
                title: "Fixa",
                logo: "http://www.piedpiper.com/app/themes/joystick-v27/images/logo.png",
              },
            },
          })
          .json();
        console.log(response);
        const paymentData = { response: response, payDetails: paymentDetails };
        console.log({ response, paymentDetails });
        return paymentData;
      } else {
        const response = await got
          .post("https://api.flutterwave.com/v3/payments", {
            headers: {
              Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
            },
            json: {
              tx_ref: Id,
              amount: amount,
              currency: "NGN",
              redirect_url: "#",
              customer: {
                email: email,
                name: name,
              },
              customizations: {
                title: "Fixa",
                logo: "http://www.piedpiper.com/app/themes/joystick-v27/images/logo.png",
              },
            },
          })
          .json();
        console.log(response);
        const paymentData = { response: response, payDetails: paymentDetails };
        console.log({ response, paymentDetails });
        return paymentData;
      }
    } catch (err) {
      console.log(err.code);
      console.log(err.response.body);
    }
    console.log(data);
  }
  async getPayment({ id }) {
    try {
      const userPayment = await this.repository.getPayment({ id });
      return FormatData({ userPayment });
    } catch (err) {
      console.log(err.message);
    }
  }

  async getPaymentCallback({ transaction_id, status, tx_ref }) {
    try {
      if (status === "successful") {
        const transactionDetails = await Transaction.find({ ref: tx_ref });
        const response = await flw.Transaction.verify({ id: transaction_id });
        if (
          response.data.status === "successful" &&
          response.data.amount === transactionDetails.amount &&
          response.data.currency === "NGN"
        ) {
          // Success! Confirm the customer's payment
          console.log("successful");
        } else {
          // Inform the customer their payment was unsuccessful
          console.log("unknown transaction");
        }
      }
      // const paymentCallBack = await this.repository.getPaymentCallback();

      // paymentCallBack.Transaction.verify({ id: transactionId }).then(
      //   (response) => {
      //     if (
      //       response.data.status === "successful" &&
      //       response.data.amount === expectedAmount &&
      //       response.data.currency === expectedCurrency
      //     ) {
      //       console.log("payment verified");
      //       console.log(response);
      //     } else {
      //       console.log("unsuccessful payment");
      //     }
      //   }
      // );
    } catch (err) {
      console.log(err);
    }
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
