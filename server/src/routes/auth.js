import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import rateLimit from 'express-rate-limit'
import Admin from '../models/Admin.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { requireAdmin } from '../middleware/auth.js'

export const authRouter = Router()
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: 'draft-7', legacyHeaders: false, message: { message: 'Too many login attempts. Try again in 15 minutes.' } })

authRouter.post('/login', loginLimiter, asyncHandler(async (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase()
  const password = String(req.body.password || '')
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required.' })
  const admin = await Admin.findOne({ email }).select('+passwordHash')
  if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) return res.status(401).json({ message: 'Invalid email or password.' })
  const token = jwt.sign({ email: admin.email }, process.env.JWT_SECRET, { subject: admin._id.toString(), expiresIn: process.env.JWT_EXPIRES_IN || '1d' })
  res.json({ token, admin: { id: admin._id, name: admin.name, email: admin.email } })
}))
authRouter.get('/me', requireAdmin, asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin.id).select('name email')
  if (!admin) return res.status(401).json({ message: 'Admin account not found.' })
  res.json({ admin })
}))
