import mongoose from "mongoose";

const inAppMessaging = mongoose.Schema(
  {
    id: { type: String },
    images: { type: String },
    title: { type: String },
    description: { type: String },
    from: { type: String },
    to: { type: String },
    type:{
      type: String,
      enum: ["technician", "client"],
    },
    schedule: { type: String },
    status: { type: String },
  }  
);

export const inAppMessagingModel = mongoose.model("inAppMessaging", inAppMessagingSchema);
