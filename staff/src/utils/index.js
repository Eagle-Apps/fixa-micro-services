import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { configs } from '../config/index.js'
const { APP_SECRET } = configs

//Utility functions

export const CreateVerificationString = async () => {
  return crypto.randomBytes(20).toString('hex')
}

export const GenerateSalt = async () => {
  return await bcrypt.genSalt()
}

export const HashPassword = async (password, salt) => {
  return await bcrypt.hash(password, salt)
}

export const CheckPassword = async (password, confirmPassword) => {
  if (password === confirmPassword) {
    return password === confirmPassword
  }
}
export const ValidatePassword = async (
  enteredPassword,
  savedPassword,
  salt
) => {
  return await bcrypt.compare(enteredPassword, savedPassword)
}

export const GenerateSignature = async (payload) => {
  return jwt.sign(payload, APP_SECRET, { expiresIn: '1d' })
}

export const ValidateSignature = async (req) => {
  const signature = req.get('Authorization')

  if (signature) {
    const payload = await jwt.verify(signature.split(' ')[1], APP_SECRET)
    req.user = payload
    return true
  }

  return false
}

export const IsAuthenticated = async (req, res, next) => {
  // const token = req.Headers["Authorization"]?.split(" ")[1];
  const token = req.get('Authorization')
  await jwt.verify(token.split(' ')[1], process.env.APP_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: err })
    } else {
      req.user = user
      next()
    }
  })
}

export const FormatData = (data) => {
  if (data) {
    return { data }
  } else {
    throw new Error('Data Not found!')
  }
}

// -----connect to technician micro-secrvice----//

export const PublishTechnicianEvent = async (payload) => {
  axios.post('http://localhost:8002/technician/app-events', {
    payload,
  })
}

// -----connect to client micro-secrvice----//

export const PublishClientEvent = async (payload) => {
  axios.post('http://localhost:8001/client/app-events', {
    payload,
  })
}

// -----connect to notification micro-secrvice----//

export const PublishNotificationEvent = async (payload) => {
  axios.post('http://localhost:8004/notification/app-events', {
    payload,
  })
}
