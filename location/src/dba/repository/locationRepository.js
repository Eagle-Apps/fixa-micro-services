import { Location } from '../models/location.js'

import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from '../../utils/app-errors.js'

class LocationRepository {
  // get all location
  async GetAllLocation() {
    try {
      const allLocations = await Location.find({})
      // console.log(categories)
      return allLocations
    } catch (err) {
      throw new APIError(
        'API Error',
        STATUS_CODES.INTERNAL_ERROR,
        `Unable to get Location ${err.message}`
      )
    }
  }

  // get a location
  async GetALocation({ locationId }) {
    try {
      const location = await Location.findById({ _id: locationId }).select(
        'state'
      )
      console.log(location, 'from location model')
      return location
    } catch (err) {
      throw new APIError(
        'API Error',
        STATUS_CODES.INTERNAL_ERROR,
        `Unable to get location ${err.message}`
      )
    }
  }

  //create location
  async CreateLocation({ country, state, city, currency }) {
    try {
      const newLocation = new Location({
        country,
        state,
        city,
        currency,
      })
      console.log(newLocation, 'new Location created')
      let saveCategory = await newLocation.save()
      console.log(saveCategory, 'showing saved location')
      return saveCategory
    } catch (err) {
      throw new APIError(
        'API ERROR',
        STATUS_CODES.INTERNAL_ERROR,
        `Unable to create Location ${err.message}`
      )
    }
  }

  async FindExistingLocation(query, queryType) {
    try {
      let existingLocation
      if (queryType === 'id')
        existingLocation = await Location.findOne({ _id: query })
      else if (queryType === 'country')
        existingLocation = await Location.findOne({
          country: { $regex: new RegExp(query, 'i') },
        })
      else if (queryType === 'state')
        existingLocation = await Location.findOne({
          state: { $regex: new RegExp(query, 'i') },
        })
      return existingLocation
    } catch (error) {
      throw new APIError(
        'API Error',
        STATUS_CODES.INTERNAL_ERROR,
        `something went wrong ${error.message}`
      )
    }
  }

  // get all active location
  async GetActiveLocation() {
    try {
      const allLocation = await Location.find({ isActive: true })
      return allLocation
    } catch (err) {
      throw new APIError(
        'API Error',
        STATUS_CODES.INTERNAL_ERROR,
        `Unable to get all location ${err.message}`
      )
    }
  }
  // edit location
  async editLocation({ isActive, country, state, city, currency, locationId }) {
    try {
      const filterLocation = { _id: locationId }
      const updateLocation = {
        country,
        state,
        city,
        currency,
        isActive,
      }
      const updatedLocation = Location.findByIdAndUpdate(
        filterLocation,
        updateLocation,
        { new: true }
      )
      return updatedLocation
    } catch (err) {
      throw new APIError(
        'API Error',
        STATUS_CODES.INTERNAL_ERROR,
        `can't update location ${err.message}`
      )
    }
  }

  // make category active/ inactive
  async updateLocationActiveState({ isActive, locationId }) {
    try {
      const filterLocation = { _id: locationId }
      const updateLocation = {
        isActive,
      }
      const updatedLocation = Location.findByIdAndUpdate(
        filterLocation,
        updateLocation,
        { new: true }
      )
      return updatedLocation
    } catch (err) {
      throw new APIError(
        'API Error',
        STATUS_CODES.INTERNAL_ERROR,
        `can't update location ${err.message}`
      )
    }
  }

  // delete location
  async DeleteLocation({ locationId }) {
    try {
      const location = await Location.findOneAndDelete({
        _id: locationId,
      })
      console.log(location, 'from location model')
      return location
    } catch (err) {
      throw new APIError(
        'API Error',
        STATUS_CODES.INTERNAL_ERROR,
        `Unable to get location ${err.message}`
      )
    }
  }
}

export default LocationRepository
