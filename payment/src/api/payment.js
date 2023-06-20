import PaymentService from "../service/paymentService.js";
// import paymentS from "../service/paymentService.js";
// import paymentService from "../service/paymentService.js";
// import { SubscribeMessage } from "../utils/index.js";

import flutterwave from "flutterwave-node";
import got from "got";
import axios from "axios";
import { walletModel } from "../dba/models/wallet.js";
import { transactionModel } from "../dba/models/transaction.js";
import { walletTransactionModel } from "../dba/models/walletTransactions.js";
import { paymentModel } from "../dba/models/payment.js";
export const payment = (app, channel) => {
  const service = new PaymentService(channel);
 
  //rabit mq demo
  //create message
    // listen to events from other services


  //write functions under here
  app.get("/payment", async (req, res) => {
    // const { id } = req.body;
    try {
      const data  = await service.getAllPayment();
      // return res.json(data);
      return res.json(data);
      // res.send(response.data.link)
    } catch (err) {
      console.log(err);
    }
  });
  app.get("/payment/:id", async (req, res) => {
    const { id } = req.params.id;
    try {
      const { data } = await service.getPayment({ id });
      // return res.json(data);
      return res.json(data);
      // res.send(response.data.link)
    } catch (err) {
      console.log(err);
    }
  });

  app.post("/payment", async (req, res) => {
    const { name, email, amount, currency, payInterval } = req.body;
    try {
      const data = await service.paymentService({
        name,
        email,
        amount,
        currency,
        payInterval,
      });
      return res.json(data);
    } catch (err) {
      console.log(err);
    }
  });
  app.get("/payment-callback", async (req, res) => {
    const { transaction_id, status, tx_ref } = req.query;
    try {
      const transaction = await service.getPaymentCallback({
        transaction_id,
        status,
        tx_ref,
      });
      console.log(transaction, "from response transaction");
      return res.json(transaction);
    } catch (err) {
      console.log(err);
    }
  });
  //...
};
