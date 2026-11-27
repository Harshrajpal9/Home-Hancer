import mongoose from 'mongoose'
const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 80 },
  description: { type: String, required: true, trim: true, maxlength: 500 },
  icon: { type: String, default: 'House' },
  number: { type: String, default: '01' },
  tag: { type: String, default: 'Home care', maxlength: 50 },
  active: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true })
export default mongoose.model('Service', serviceSchema)
