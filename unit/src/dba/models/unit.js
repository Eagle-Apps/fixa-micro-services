import mongoose from 'mongoose'

const unitSchemas = mongoose.Schema(
  {
    unitName: {
      type: String,
    },
    category: {
      type: String,
    },
    model: {
      type: String,
    },
    modelNum: {
      type: String,
    },
    timesWorkedOn: {
      type: Number,
    },
    clientId: {
      type: String,
    },
    preventiveMaintenance: {
      type: String,
      enum: ['true', 'false'],
      default: 'false',
    },
    performanceReport: {},
  },

  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v
      },
    },
    timestamps: true,
  }
)

unitSchemas.index({ location: '2dsphere' })

export const unitModels = mongoose.model('UnitModels', unitSchemas)
