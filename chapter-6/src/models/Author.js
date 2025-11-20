import mongoose from 'mongoose'

const AuthorSchema = new mongoose.Schema({
  name: String,
  bio: String
},  { timestamps: true })

export const Author = mongoose.model("Author", AuthorSchema);