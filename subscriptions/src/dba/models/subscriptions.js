import mongoose from "mongoose";

const specialsSchema = mongoose.Schema(
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


export const specialsModel = mongoose.model("SpecialsModel", specialsSchema);
