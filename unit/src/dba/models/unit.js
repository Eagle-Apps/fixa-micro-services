import mongoose from 'mongoose'

const unitSchema = mongoose.Schema(
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
      type: Number,
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

unitSchema.index({ location: '2dsphere' })

export const unitModels = mongoose.model('UnitModels', unitSchema)
