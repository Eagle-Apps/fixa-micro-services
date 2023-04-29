import mongoose from "mongoose";

const subscriptionsSchema = mongoose.Schema(
  {
    serviceid: {
      type: String,
    },
    clientid: {
      type: String,
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
    schedule: {
      type: String,
    },
    status: {
      type: String,
    },
    },

  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);


export const subscriptionsModel = mongoose.model("SubscriptionsModel", subscriptionsSchema);
