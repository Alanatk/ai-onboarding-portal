import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  college: String,
  degree: String,
  graduationYear: String,
  skills: String,
  experience: String,
  currentRole: String,
  linkedin: String,
  github: String,
  portfolio: String,
  city: String,
  country: String,
  languages: String,
  interests: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
