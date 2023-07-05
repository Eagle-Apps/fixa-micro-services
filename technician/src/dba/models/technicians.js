import mongoose from "mongoose";

const techniciansSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
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
    organisationName: { type: String },
    numberOfStaffs: { type: String },

    techniciantype: { type: String },
    credentialtype: { type: String },
    credentialfile: { type: String },

    services: {
      type: String,
      jobtype: { type: String },
      jobcategory: { type: String },
      pricerange: { type: String },
    },

    rating: {
      currectRating: Number,
      quality: Number,
      promptness: Number,
      ratingCount: { type: Number, default: 0 },
    },

    location: {
      coordinates: [],
      type: { type: String },
      name: { type: String },
    },

    technicianCategory: {
      type: String,
      enum: ["Single", "Corporate"],
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

techniciansSchema.index({ location: "2dsphere" });
export default mongoose.model("technicians", techniciansSchema);
