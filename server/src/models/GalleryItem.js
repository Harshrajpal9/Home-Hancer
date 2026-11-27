import mongoose from 'mongoose'
const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 100 },
  imageUrl: { type: String, required: true, trim: true, maxlength: 1000 },
  active: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true })
export default mongoose.model('GalleryItem', gallerySchema)
