import PaymentService from "../service/paymentService.js";
import { SubscribeMessage } from "../utils/index.js";

export const payment = (app, channel) => {
  const service = new PaymentService();

  // listen to events from other services
  SubscribeMessage(channel, service);

  //write functions under here
};
