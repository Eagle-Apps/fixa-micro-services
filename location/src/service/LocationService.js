import LocationRepository from '../dba/repository/locationRepository.js'

class LocationService {
  constructor() {
    this.locationRepository = new LocationRepository()
  }

  // create location
  async CreateLocation({ country, state, city, currency }) {
    console.log('creating Location')
    try {
      // check if location exists already
      const locationExist = await this.locationRepository.FindExistingLocation(
        state,
        'state'
      )
      if (locationExist) {
        const message = 'location already exists'
        throw new Error(message)
        // return message;
      }
      const createLocation = await this.locationRepository.CreateLocation({
        country,
        state,
        city,
        currency,
      })
      console.log('createLocation', createLocation)
      return createLocation
    } catch (err) {
      // throw new APIError(
      //   err.name ? err.name : 'Location Not Created',
      //   err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
      //   err.message
      // )
      return err
    }
  }

  async GetAllLocation() {
    try {
      const location = await this.locationRepository.GetAllLocation()
      return location
    } catch (err) {
      throw new APIError(
        err.name ? err.name : 'Location Not Found',
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      )
    }
  }

  // get single Location
  async GetALocation({ locationId }) {
    try {
      const location = await this.locationRepository.GetALocation({
        locationId,
      })
      return location
    } catch (err) {
      throw new APIError(
        err.name ? err.name : 'Location Not found',
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      )
    }
  }

  // update location
  async updateLocation({
    isActive,
    country,
    currency,
    state,
    city,
    locationId,
  }) {
    try {
      console.log('updating location')
      const existingLocation = await this.locationRepository.GetALocation({
        locationId,
      })
      console.log(existingLocation, 'existing location')
      if (existingLocation) {
        isActive
          ? (existingLocation.isActive = isActive)
          : (existingLocation.isActive = existingLocation.isActive)
        state
          ? (existingLocation.state = state)
          : (existingLocation.state = existingLocation.state)
        city
          ? (existingLocation.city = city)
          : (existingLocation.city = existingLocation.city)
        const updateLocation = await existingLocation.save()
        console.log(updateLocation, 'update location from service')
        return updateLocation
      } else {
        throw new BadRequestError('Location not found')
      }
    } catch (err) {
      throw new APIError(
        err.name ? err.name : 'Updating a Location failed',
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      )
    }
  }

  // update location active state
  async UpdateLocationActiveState({ isActive, locationId }) {
    try {
      const location = await this.locationRepository.updateLocationActiveState({
        locationId,
        isActive,
      })
      console.log(location, 'existing location')
      return location
    } catch (err) {
      throw new APIError(
        err.name ? err.name : 'Updating a location active failed',
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      )
    }
  }

  // delete category
  async DeleteLocation(locationId) {
    try {
      const location = await this.locationRepository.DeleteLocation({
        locationId,
      })
      console.log(location, 'existing location')
      return location
    } catch (err) {
      throw new APIError(
        err.name ? err.name : 'Deleting a location failed',
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      )
    }
  }
}
export default LocationService
