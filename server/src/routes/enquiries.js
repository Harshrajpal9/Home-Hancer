import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import rateLimit from 'express-rate-limit'
import Enquiry from '../models/Enquiry.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { requireAdmin } from '../middleware/auth.js'

export const enquiryRouter = Router()
const enquiryLimiter = rateLimit({ windowMs: 60 * 60 * 1000, limit: 8, standardHeaders: 'draft-7', legacyHeaders: false, message: { message: 'Too many enquiries from this connection. Please call us instead.' } })
const validateEnquiry = [
  body('name').trim().isLength({ min: 2, max: 80 }).withMessage('Enter your name.'),
  body('phone').trim().isLength({ min: 8, max: 25 }).matches(/^[0-9+() .-]+$/).withMessage('Enter a valid phone number.'),
  body('service').trim().isLength({ min: 1, max: 100 }),
  body('message').trim().isLength({ min: 5, max: 2000 }),
]

enquiryRouter.post('/', enquiryLimiter, validateEnquiry, asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() })
  const enquiry = await Enquiry.create({ name: req.body.name, phone: req.body.phone, service: req.body.service, message: req.body.message })
  res.status(201).json({ message: 'Enquiry received successfully.', enquiryId: enquiry._id })
}))
enquiryRouter.get('/', requireAdmin, asyncHandler(async (req, res) => {
  const { status, q } = req.query
  const filter = {}
  if (status && ['new', 'contacted', 'in-progress', 'completed', 'archived'].includes(status)) filter.status = status
  if (q) filter.$or = [{ name: new RegExp(String(q).slice(0, 60), 'i') }, { phone: new RegExp(String(q).slice(0, 60), 'i') }, { service: new RegExp(String(q).slice(0, 60), 'i') }]
  const enquiries = await Enquiry.find(filter).sort({ createdAt: -1 }).limit(250)
  res.json({ enquiries })
}))
enquiryRouter.patch('/:id', requireAdmin, asyncHandler(async (req, res) => {
  const allowed = ['new', 'contacted', 'in-progress', 'completed', 'archived']
  const update = {}
  if (allowed.includes(req.body.status)) update.status = req.body.status
  if (typeof req.body.adminNote === 'string') update.adminNote = req.body.adminNote.slice(0, 1000)
  const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true })
  if (!enquiry) return res.status(404).json({ message: 'Enquiry not found.' })
  res.json({ enquiry })
}))
