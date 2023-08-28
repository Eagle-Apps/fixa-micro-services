import LocationService from '../service/LocationService.js'

export const appEvents = (app) => {
  const service = new LocationService()

  app.use('/app-events', async (req, res, next) => {
    const { payload } = req.body

    service.SubscribeEvents(payload)

    console.log('===============  location Service Received Event ====== ')
    return res.status(200).json(payload)
  })
}
