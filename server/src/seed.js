import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import Admin from './models/Admin.js'
import Service from './models/Service.js'
import Testimonial from './models/Testimonial.js'
import GalleryItem from './models/GalleryItem.js'

if (!process.env.MONGODB_URI) throw new Error('Set MONGODB_URI in server/.env first.')
if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD in server/.env first.')
if (process.env.ADMIN_PASSWORD.length < 12) throw new Error('ADMIN_PASSWORD must be at least 12 characters.')

await mongoose.connect(process.env.MONGODB_URI)
const email = process.env.ADMIN_EMAIL.toLowerCase().trim()
const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12)
await Admin.findOneAndUpdate({ email }, { name: process.env.ADMIN_NAME || 'Home Hancer Admin', email, passwordHash }, { upsert: true, new: true, setDefaultsOnInsert: true })

if (await Service.countDocuments() === 0) {
  await Service.insertMany([
    ['Plumbing','Leaks, fittings and everyday water-flow problems handled with care.','Wrench','01','Quick fixes'],
    ['Electrical','Thoughtful electrical repairs, installations and maintenance.','Zap','02','Safe & sound'],
    ['Painting','Give your walls a fresh start with a clean, considered finish.','Paintbrush','03','Fresh spaces'],
    ['Carpentry','Furniture repairs, fittings and practical woodwork solutions.','Hammer','04','Made to fit'],
    ['AC repair','Air-conditioning servicing, repair and installation support.','Snowflake','05','Cool comfort'],
    ['Bathroom upgrades','Refresh your bathroom with better fittings and finishes.','Bath','06','Daily rituals'],
  ].map(([title,description,icon,number,tag], sortOrder) => ({ title,description,icon,number,tag,sortOrder,active:true })))
}
if (await Testimonial.countDocuments() === 0) {
  await Testimonial.insertMany([
    { name:'Akib Mansuri', text:'Quick and satisfying service. Recommended to others in Ahmedabad.', rating:5, sortOrder:0 },
    { name:'Arman Ali', text:'Recently had civil and tile work done. The result was very nice.', rating:5, sortOrder:1 },
    { name:'Ram Brish Kumar', text:'Very nice painting work.', rating:5, sortOrder:2 },
  ])
}
if (await GalleryItem.countDocuments() === 0) {
  await GalleryItem.insertMany([
    { title:'Spaces that feel like you', imageUrl:'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900&q=85', sortOrder:0 },
    { title:'Details make a difference', imageUrl:'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=900&q=85', sortOrder:1 },
    { title:'A fresh point of view', imageUrl:'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=85', sortOrder:2 },
  ])
}
console.log(`Seed complete. Admin: ${email}`)
await mongoose.disconnect()
