import mongoose from "mongoose";

const staffSchema = mongoose.Schema(
  {
    Firstname: {
      type: String,
    },
    Lastname: {
      type: String,
    },
    Email: {
      type: String,
    },
    Address: {
      type: String,
    },
    State: {
      type: String,
    },
    DOB: {
      type: String,
    },
    Gender: {
      type: String,
    },
    Position: {
      type: String,
    },
    EmploymentDate: {
      type: String,
    },
    ProfilePicture: {
      type: String,
    },
    PhoneNumber: {
      type: Number,
    },
    Department: {
      type: String,
    },
    Roles: {
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
