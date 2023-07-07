import mongoose from "mongoose";

const staffSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    state: {
      type: String,
    },
    dob: {
      type: String,
    },
    gender: {
      type: String,
    },
    position: {
      type: String,
    },
    employmentDate: {
      type: String,
    },
    profilepicture: {
      type: String,
    },
    phonenumber: {
      type: Number,
    },
    department: {
      type: String,
    },
    roles: {
      type: String,
      required: true, 
      enum: ["001", "002", "003", "004", "005"] 
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

export const staffModel = mongoose.model("StaffModel", staffSchema);
