import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from '../../utils/app-errors.js'
import { staffModel } from '../models/staff.js'

//Dealing with database operations
class StaffServiceRepository {
  async VerifyEmail({ token }) {
    try {
      const user = this.FindExistingStaff(token, 'verification_code')

      user.emailStatus = 'Verified'
      user.verificationString = undefined
      await user.save()
    } catch (err) {
      throw new APIError(
        'API Error',
        STATUS_CODES.INTERNAL_ERROR,
        `something went wrong  ${err.message}`
      )
    }
  }

  async FindExistingStaff(query, queryType) {
    try {
      let existingStaff
      if (queryType === 'id')
        existingStaff = await staffModel.findOne({ _id: query })

      if (queryType === 'email')
        existingStaff = await staffModel.findOne({ email: query })

      if (queryType === 'verification_code')
        existingStaff = await staffModel.findOne({
          verificationString: query,
        })

      return existingStaff
    } catch (err) {
      throw new APIError(
        'API Error',
        STATUS_CODES.INTERNAL_ERROR,
        `something went wrong  ${err.message}`
      )
    }
  }

  async UpdatePassword({ id, password }) {
    try {
      let staff = await this.FindExistingStaff(id, 'id')
      staff.password = password
      await staff.save()
      return
    } catch (err) {
      throw new APIError(
        'API Error',
        STATUS_CODES.INTERNAL_ERROR,
        `something went wrong  ${err.message}`
      )
    }
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
    salt,
    verificationString,
  }) {
    try {
      const createdStaff = {
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
        salt,
        verificationString,
      }
      const newStaff = new staffModel(createdStaff)
      newStaff.save()
      return newStaff
    } catch (err) {
      throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, err.message)
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
      const filter = { _id: id }
      const update = {
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
      }
      const updatedUnit = await staffModel.findByIdAndUpdate(filter, update, {
        new: true,
      })
      return updatedUnit
    } catch (err) {
      throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, err.message)
    }
  }

  async FetchStaff(id) {
    try {
      const staff = staffModel.findById(id)
      return staff
    } catch (err) {
      throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, err.message)
    }
  }

  async FetchallStaff() {
    try {
      const staffs = await staffModel.find()
      return staffs
    } catch (err) {
      throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, err.message)
    }
  }
}

export default StaffServiceRepository
