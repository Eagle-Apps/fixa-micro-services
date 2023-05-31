import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from '../../utils/app-errors.js'
import { unitModels } from '../models/unit.js'

//Dealing with database operations
class UnitServiceRepository {
  async CreateUnit({ unitName, category, model, modelNum, clientId }) {
    try {
      const unit = {
        unitName,
        category,
        model,
        modelNum,
        clientId,
      }
      const newUnit = new unitModels(unit)
      newUnit.save()
      return newUnit
    } catch (err) {
      throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, err.message)
    }
  }

  async UpdateUnit(unitName, category, model, modelNum, id, clientId) {
    try {
      const filter = { _id: id }
      const update = {
        unitName,
        category,
        model,
        modelNum,
        clientId,
      }
      const updatedUnit = await unitModels.findByIdAndUpdate(filter, update, {
        new: true,
      })
      return updatedUnit
    } catch (err) {
      throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, err.message)
    }
  }

  async FetchUnit(id) {
    const unitid = { _id: id }
    try {
      const unit = unitModels.findOne(unitid)
      return unit
    } catch (err) {
      throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, err.message)
    }
  }

  async FetchallUnit() {
    try {
      const unit = await unitModels.find()
      return unit
    } catch (err) {
      throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, err.message)
    }
  }
}

export default UnitServiceRepository
