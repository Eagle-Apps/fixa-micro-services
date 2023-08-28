import mongoose from 'mongoose'
import validator from 'validator'

const clientSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      // select: false,
    },
    // confirmPassword: {
    //   type: String,
    //   required: [true, 'Please confirm your password'],
    //   validate: {
    //     // This only works on CREATE OR SAVE!!!
    //     validator: function (el) {
    //       return el === this.password
    //     },
    //     message: 'Password are not the same',
    //   },
    // },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    salt: String,
    confirmationCode: {
      type: String,
    },
    otp: {
      type: String,
    },
    bvn: { type: String },
    emailStatus: {
      type: String,
      enum: ['Pending', 'Verified'],
      default: 'Pending',
    },
    phoneStatus: {
      type: String,
      enum: ['Pending', 'Verified'],
      default: 'Pending',
    },
    bvnVerification: {
      type: String,
      enum: ['Pending', 'Verified'],
      default: 'Pending',
    },

    serviceRequests: [{ type: String }],

    emailStatus: {
      type: String,
      enum: ['Pending', 'Verified'],
      default: 'Pending',
    },
    // phoneStatus: {
    //   type: String,
    //   enum: ['Pending', 'Verified'],
    //   default: 'Pending',
    // },
    // bvnVerification: {
    //   type: String,
    //   enum: ['Pending', 'Verified'],
    //   default: 'Pending',
    // },
    location: {
      coordinates: [],
      type: { type: String },
      name: { type: String },
    },
    clientCategory: {
      type: String,
      enum: [
        'Single Home',
        'Single Office',
        'Estate Manager',
        'Corporate',
        'Government',
      ],
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
    verificationString: String,
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password
        delete ret.salt
        delete ret.__v
      },
    },
    timestamps: true,
  }
)

clientSchema.index({ location: '2dsphere' })

export const clientModel = mongoose.model('Client', clientSchema)
