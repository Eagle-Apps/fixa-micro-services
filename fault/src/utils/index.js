import { configs } from "../config/index.js";
const {
  EXCHANGE_NAME,
  MSG_QUEUE_URL,
  FAULT_SERVICE,
  NOTIFICATION_SERVICE,
  CLIENT_SERVICE,
} = configs;
import amqplib from "amqplib";

//Utility functions

export const generateRequestId = async (lastid) => {
  let num = parseInt(lastid) + 1;
  let sequence = num + "";
  while (sequence.length < 6) sequence = "0" + sequence;

  let id = sequence;

  return id;
};

export const FormatData = (data) => {
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not found!");
  }
};

//Message Broker
export const CreateChannel = async () => {
  try {
    const connection = await amqplib.connect(MSG_QUEUE_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(EXCHANGE_NAME, "direct", { durable: true });
    return channel;
  } catch (err) {
    throw err;
  }
};

export const PublishMessage = (channel, service, msg) => {
  channel.publish(EXCHANGE_NAME, service, Buffer.from(msg));
  console.log("Sent: ", msg);
};

//subscribe
export const SubscribeMessage = async (channel, service) => {
  await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });
  const q = await channel.assertQueue("", { exclusive: true });
  console.log(` Waiting for messages in queue: ${q.queue}`);

  channel.bindQueue(q.queue, EXCHANGE_NAME, FAULT_SERVICE);

  channel.consume(
    q.queue,
    (msg) => {
      if (msg.content) {
        console.log("the message is:", msg.content.toString());
        service.SubscribeEvents(msg.content.toString());
      }
      console.log("[X] received");
    },
    {
      noAck: true,
    }
  );
};

// // -----connect to technician micro-secrvice----//

// export const PublishTechnicianEvent = async (payload) => {
//   axios.post("http://localhost:8002/technician/app-events", {
//     payload,
//   });
// };

// // -----connect to client micro-secrvice----//

// export const PublishClientEvent = async (payload) => {
//   axios.post("http://localhost:8001/client/app-events", {
//     payload,
//   });
// };
// export const PublishBillingEvent = async (payload) => {
//   axios.post("http://localhost:8001/client/app-events", {
//     payload,
//   });
// };

// // -----connect to notification micro-secrvice----//

// export const PublishNotificationEvent = async (payload) => {
//   axios.post("http://localhost:8004/notification/app-events", {
//     payload,
//   });
// };
