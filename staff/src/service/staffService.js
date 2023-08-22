import { configs } from '../config/index.js'
import StaffServiceRepository from '../dba/repository/staffRepository.js'
// import { HashPassword } from '../utils/index.js'

import {
  APIError,
  BadRequestError,
  STATUS_CODES,
  ValidationError,
} from '../utils/app-errors.js'
import {
  FormatData,
  HashPassword,
  GenerateSalt,
  ValidatePassword,
  GenerateSignature,
  CreateVerificationString,
} from '../utils/index.js'
// All Business logic will be here

const { SITE_DOMAIN } = configs
class StaffService {
  constructor() {
    this.repository = new StaffServiceRepository()
  }

  async CreateStaff({
    firstname,
    lastname,
    email,
    password,
    address,
    state,
    dob,
    gender,
    position,
    employmentdate,
    profilepic,
    phonenumber,
    dpartment,
    roles,
  }) {
    try {
      let salt = await GenerateSalt()

      let hashedPassword = await HashPassword(password, salt)
      let verificationString = await CreateVerificationString()

      const createdStaff = await this.repository.CreateStaff({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        address,
        state,
        dob,
        gender,
        position,
        employmentdate,
        profilepic,
        phonenumber,
        dpartment,
        roles,
        salt,
        verificationString,
      })

      const token = await GenerateSignature({
        email: email,
        _id: createdStaff._id,
      })

      console.log(token, 'from email before token')

      const link = `${SITE_DOMAIN}/verifyemail/?token=${createdStaff.verificationString}`

      return FormatData({
        id: createdStaff._id,
        email: createdStaff.email,
        token,
        link,
      })
    } catch (err) {
      throw new APIError(
        err.name ? err.name : 'Data Not found',
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      )
    }
  }

  async SignIn(userInputs) {
    const { email, password } = userInputs

    try {
      const existingStaff = await this.repository.FindExistingStaff(
        email,
        'email'
      )

      if (existingStaff) {
        const validPassword = await ValidatePassword(
          password,
          existingStaff.password,
          existingStaff.salt
        )

        if (validPassword) {
          const token = await GenerateSignature({
            email: existingStaff.email,
            _id: existingStaff._id,
            role: existingStaff.roles,
          })
          return FormatData({ id: existingStaff._id, token })
        } else {
          throw new ValidationError('invalid credentials', true)
        }
      } else {
        throw new BadRequestError('user with the email does not exist', true)
      }
    } catch (err) {
      throw new APIError(
        err.name ? err.name : 'Data Not found',
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      )
    }
  }

  async UpdateStaff(
    firstname,
    lastname,
    email,
    password,
    address,
    state,
    dob,
    gender,
    position,
    employmentdate,
    profilepic,
    phonenumber,
    dpartment,
    roles,
    id
  ) {
    try {
      const staff = await this.repository.UpdateStaff(
        firstname,
        lastname,
        email,
        password,
        address,
        state,
        dob,
        gender,
        position,
        employmentdate,
        profilepic,
        phonenumber,
        dpartment,
        roles,
        id
      )

      return FormatData({
        staff,
      })
    } catch (err) {
      throw new APIError(
        err.name ? err.name : 'Data Not found',
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      )
    }
  }

  async GetStaff(id) {
    try {
      const staff = await this.repository.FetchStaff(id)
      return FormatData({
        staff,
      })
    } catch (err) {
      throw new APIError(
        err.name ? err.name : 'Data Not found',
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      )
    }
  }

  async GetallStaff() {
    try {
      const staffs = await this.repository.FetchallStaff()
      return FormatData({
        staffs,
      })
    } catch (err) {
      throw new APIError(
        err.name ? err.name : 'Data Not found',
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      )
    }
  }

  async CreatePayload(event, data, clientId) {
    try {
      let payload

      switch (event) {
        case 'NEW_UNIT':
          payload = {
            event,
            data: { unitId: data._id, clientId },
          }

        default:
          break
      }
      return payload
    } catch (err) {
      throw new APIError(
        err.name ? err.name : 'Data Not found',
        err.statusCode ? err.statusCode : STATUS_CODES.INTERNAL_ERROR,
        err.message
      )
    }
  }

  async SubscribeEvents(payload) {
    const { event, data } = payload

    switch (event) {
      case 'SIGN_UP':
        this.SignupSuccessMessage(data)
        break

      default:
        break
    }
  }
}

export default StaffService
