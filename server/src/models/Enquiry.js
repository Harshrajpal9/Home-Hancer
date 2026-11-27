import mongoose from 'mongoose'
const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  phone: { type: String, required: true, trim: true, maxlength: 25 },
  service: { type: String, required: true, trim: true, maxlength: 100 },
  message: { type: String, required: true, trim: true, maxlength: 2000 },
  status: { type: String, enum: ['new', 'contacted', 'in-progress', 'completed', 'archived'], default: 'new' },
  adminNote: { type: String, default: '', maxlength: 1000 },
}, { timestamps: true })
export default mongoose.model('Enquiry', enquirySchema)
