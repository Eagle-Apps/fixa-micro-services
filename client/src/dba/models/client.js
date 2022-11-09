import mongoose from "mongoose";

const clientSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    salt: String,
    bvn: { type: String },
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
