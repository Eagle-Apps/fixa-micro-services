import mongoose from "mongoose";

const clientSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    salt: String,
    bvn: { type: String, require: true },
    emailStatus: {
      type: String,
      enum: ["Pending", "Verified"],
      default: "Pending",
    },
    phoneStatus: {
      type: String,
      enum: ["Pending", "Verified"],
      default: "Pending",
    },
    bvnVerification: {
      type: String,
      enum: ["Pending", "Verified"],
      default: "Pending",
    },

    serviceRequests: [{ type: String }],

    bvn: { type: String, require: true },
    emailStatus: {
      type: String,
      enum: ["Pending", "Verified"],
      default: "Pending",
    },
    phoneStatus: {
      type: String,
      enum: ["Pending", "Verified"],
      default: "Pending",
    },
    bvnVerification: {
      type: String,
      enum: ["Pending", "Verified"],
      default: "Pending",
    },
    location: {
      coordinates: [],
      type: { type: String },
      name: { type: String },
    },
    clientCategory: {
      type: String,
      enum: [
        "Single Home",
        "Single Office",
        "Estate Manager",
        "Corporate",
        "Government",
      ],
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    salt: String,
    verificationString: String,
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

clientSchema.index({ location: "2dsphere" });

export const clientModel = mongoose.model("Client", clientSchema);