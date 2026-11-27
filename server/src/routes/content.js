import { Router } from 'express'
import Service from '../models/Service.js'
import Testimonial from '../models/Testimonial.js'
import GalleryItem from '../models/GalleryItem.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const contentRouter = Router()
contentRouter.get('/', asyncHandler(async (_req, res) => {
  const [services, testimonials, gallery] = await Promise.all([
    Service.find({ active: true }).sort({ sortOrder: 1, createdAt: 1 }),
    Testimonial.find({ active: true }).sort({ sortOrder: 1, createdAt: -1 }),
    GalleryItem.find({ active: true }).sort({ sortOrder: 1, createdAt: 1 }),
  ])
  res.json({ services, testimonials, gallery })
}))
