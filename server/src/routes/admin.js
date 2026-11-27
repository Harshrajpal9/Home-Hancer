import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import { requireAdmin } from '../middleware/auth.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import Service from '../models/Service.js'
import Testimonial from '../models/Testimonial.js'
import GalleryItem from '../models/GalleryItem.js'
import Enquiry from '../models/Enquiry.js'

export const adminRouter = Router()
adminRouter.use(requireAdmin)

const models = { services: Service, testimonials: Testimonial, gallery: GalleryItem }
for (const [key, Model] of Object.entries(models)) {
  adminRouter.get(`/${key}`, asyncHandler(async (_req, res) => {
    const items = await Model.find().sort({ sortOrder: 1, createdAt: -1 })
    res.json({ items })
  }))
  adminRouter.post(`/${key}`, asyncHandler(async (req, res) => {
    const item = await Model.create(req.body)
    res.status(201).json({ item })
  }))
  adminRouter.put(`/${key}/:id`, asyncHandler(async (req, res) => {
    const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!item) return res.status(404).json({ message: 'Content item not found.' })
    res.json({ item })
  }))
  adminRouter.delete(`/${key}/:id`, asyncHandler(async (req, res) => {
    const item = await Model.findByIdAndDelete(req.params.id)
    if (!item) return res.status(404).json({ message: 'Content item not found.' })
    res.json({ message: 'Content item deleted.' })
  }))
}
adminRouter.get('/dashboard', asyncHandler(async (_req, res) => {
  const [services, testimonials, gallery, totalEnquiries, newEnquiries, recent] = await Promise.all([
    Service.countDocuments(), Testimonial.countDocuments(), GalleryItem.countDocuments(),
    Enquiry.countDocuments(), Enquiry.countDocuments({ status: 'new' }),
    Enquiry.find().sort({ createdAt: -1 }).limit(5).select('name service status createdAt'),
  ])
  res.json({ stats: { services, testimonials, gallery, totalEnquiries, newEnquiries }, recent })
}))
