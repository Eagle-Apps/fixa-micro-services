import mongoose from "mongoose";

const specialsSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    discount: {
      type: String,
    },
    type: {
      type: String,
    },
    image: {
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
