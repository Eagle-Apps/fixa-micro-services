import LocationService from '../service/LocationService.js'

import {
  ValidateSignature,
  upload,
  UploadImage,
  uploadTwo,
} from '../utils/file-handler.js'
import { consumeMessage } from '../utils/rabbitmq.js'

export const service = (app) => {
  const location = new LocationService()
  // const service = new CategoryService()

  app.get('/', async (req, res, next) => {
    try {
      res.send({ serviceSays: 'everything soft here' })
    } catch (err) {
      next(err)
    }
  })
  //displaying all the Locations
  app.get('/getAllLocation', async (req, res, next) => {
    try {
      const data = await location.GetAllLocation()

      return res.send(data)
    } catch (err) {
      next(err)
    }
  })

  app.post('/addLocation', async (req, res, next) => {
    try {
      const { country, state, city, currency } = req.body
      const createLocation = await location.CreateLocation({
        country,
        state,
        city,
        currency,
      })
      res.status(200).json({ msg: 'created location', createLocation })
    } catch (err) {
      next(err)
    }
  })

  // update location
  app.patch('/update-location/:id', async (req, res, next) => {
    try {
      const locationId = req.params.id
      const { country, state, city, currency, isActive } = req.body
      const updateLocation = await location.updateLocation({
        country,
        state,
        city,
        currency,
        isActive,
        locationId,
      })
      res.status(200).json({ msg: 'updated location', updateLocation })
    } catch (err) {
      next(err)
    }
  })

  // get location by id
  app.get('/get-location/:id', async (req, res, next) => {
    try {
      const locationId = req.params.id
      // const { name, subCategory, isActive } = req.body;
      const updateLocation = await location.GetALocation({
        locationId,
      })
      res.status(200).json({ msg: 'location', updateLocation })
    } catch (err) {
      next(err)
    }
  })

  // update location active state
  app.patch('/location-active/:id', async (req, res, next) => {
    try {
      const locationId = req.params.id
      const { isActive } = req.body
      const updateLocation = await location.UpdateLocationActiveState({
        locationId,
        isActive,
      })
      res.status(200).json({ msg: 'updated location', updateLocation })
    } catch (err) {
      next(err)
    }
  })

  // delete location
  app.delete('/delete-location/:id', async (req, res, next) => {
    try {
      const locationId = req.params.id
      const updateLocation = await location.DeleteLocation(locationId)
      res
        .status(200)
        .json({ msg: 'location deleted successfully', updateLocation })
    } catch (err) {
      next(err)
    }
  })
}
