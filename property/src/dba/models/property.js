import mongoose from "mongoose";

const propertySchema = mongoose.Schema(
  {
    typebuilding: {
      type: String,
    },
    address: {
      type: String,
    },
    sizebuilding: {
      type: String,
    },
    occupants: {
      type: String,
    },
    ownerName: {
      type: String,
    },
    manageName: {
      type: String,
    },
    managePhone: {
      type: String,
    },
    manageAddres: {
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


export const propertyModel = mongoose.model("PropertyModel", propertySchema);
