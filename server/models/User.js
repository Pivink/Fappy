import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true,select: false  },

  storageUsed: { type: Number, default: 0 },  
  storageLimit: { type: Number, default: 2 * 1024 * 1024 * 1024 },  

  plan: {
    type: String,
    enum: ["FREE", "PREMIUM", "ENTERPRISE"],
    default: "FREE"
  },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);