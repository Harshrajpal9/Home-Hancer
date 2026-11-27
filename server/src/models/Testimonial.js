import mongoose from 'mongoose'
const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  text: { type: String, required: true, trim: true, maxlength: 1000 },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  active: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true })
export default mongoose.model('Testimonial', testimonialSchema)
